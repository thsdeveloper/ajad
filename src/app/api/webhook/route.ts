import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mock webhook endpoint - no longer requires Stripe
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Mock webhook payload handling
        if (body.type === 'checkout.session.completed') {
            const participantId = body.participantId;

            if (participantId) {
                await prisma.participant.update({
                    where: { id: participantId },
                    data: {
                        status: 'CONFIRMED',
                        paymentStatus: 'PAID',
                        updatedAt: new Date(),
                    },
                });

                // Mock: email confirmation would be sent here
                console.log(`Mock: Confirmation email would be sent for participant ${participantId}`);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Erro interno' },
            { status: 500 }
        );
    }
}
