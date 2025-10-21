import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Buscar participante
        const participant = await prisma.participant.findUnique({
            where: {
                id: id,
            },
        });

        if (!participant) {
            return NextResponse.json(
                { error: 'Participante não encontrado' },
                { status: 404 }
            );
        }

        // Mock payment - simulate successful payment
        const mockSessionId = `mock_session_${Date.now()}`;

        // Atualizar participante com ID da sessão mockada
        await prisma.participant.update({
            where: {
                id,
            },
            data: {
                paymentId: mockSessionId,
                status: 'CONFIRMED',
                paymentStatus: 'PAID',
            },
        });

        // Simulate Stripe success URL
        const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?participantId=${id}&session_id=${mockSessionId}`;

        return NextResponse.json({ url: successUrl });
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Erro interno do servidor',
            },
            { status: 500 }
        );
    }
}
