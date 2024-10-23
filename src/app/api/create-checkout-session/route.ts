import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
    try {
        const { participant } = await request.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'boleto'],
            customer_email: participant.email,
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: 'Inscrição AJAD 2024',
                            description: 'Acampamento de Jovens AJAD 2024',
                        },
                        unit_amount: 20000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
            metadata: {
                participantName: participant.name,
                participantEmail: participant.email,
                participantPhone: participant.phone,
                participantAge: participant.age.toString(),
                church: participant.church,
            },
            payment_method_options: {
                boleto: {
                    expires_after_days: 1,
                },
            },
            locale: 'pt-BR',
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
            );
        }
    }
}