import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    try {
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const participantId = session.metadata?.participantId;

            if (participantId) {
                await prisma.participant.update({
                    where: { id: participantId },
                    data: {
                        status: 'CONFIRMED',
                        paymentStatus: 'PAID',
                        updatedAt: new Date(),
                    },
                });

                // Enviar email de confirmação
                await sendConfirmationEmail(participantId);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
        );
    }
}
