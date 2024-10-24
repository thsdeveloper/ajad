import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';

// Corrige a tipagem dos parâmetros da rota
export async function POST(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const { id } = context.params;

        // Buscar participante
        const participant = await prisma.participant.findUnique({
            where: { id }
        });

        if (!participant) {
            return NextResponse.json(
                { error: 'Participante não encontrado' },
            );
        }

        // ... resto do seu código do Stripe ...

        return NextResponse.json({ url: session.url });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Erro interno' },
        );
    }
}

// Para as outras rotas também
export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const { id } = context.params;

        const participant = await prisma.participant.findUnique({
            where: { id }
        });

        if (!participant) {
            return NextResponse.json(
                { error: 'Participante não encontrado' },
            );
        }

        return NextResponse.json(participant);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Erro interno' },
        );
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const { id } = context.params;
        const data = await request.json();

        const participant = await prisma.participant.update({
            where: { id },
            data
        });

        return NextResponse.json(participant);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Erro interno' },
        );
    }
}