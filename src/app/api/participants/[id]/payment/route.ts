import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(request: Request, { params }) {
    try {
        const { id } = params; // Extrair o ID diretamente dos params

        // Buscar participante - Corrigido para MongoDB
        const participant = await prisma.participant.findUnique({
            where: {
                id: id, // Assumindo que o 'id' está correto
            },
            select: {
                email: true, // Adiciona explicitamente o campo 'email'
            },
        });


        if (!participant) {
            return NextResponse.json(
                { error: 'Participante não encontrado' },
            );
        }

        // Criar sessão Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'boleto'],
            customer_email: participant.email, // Usando o email real do participante
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
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?participantId=${participant.id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?participantId=${participant.id}`,
            metadata: {
                participantId: participant.id,
            },
            payment_method_options: {
                boleto: {
                    expires_after_days: 1,
                },
            },
            locale: 'pt-BR',
        });

        // Atualizar participante com ID da sessão
        await prisma.participant.update({
            where: {
                id, // Usar o id extraído diretamente
            },
            data: {
                paymentId: session.id,
            },
        });

        return NextResponse.json({ url: session.url }); // Usar NextResponse.json para retornar um JSON válido
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Erro interno do servidor',
            },
        );
    }
}
