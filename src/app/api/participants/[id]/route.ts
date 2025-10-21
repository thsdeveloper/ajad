import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';

// Mock POST endpoint - redirects to payment route
export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        // Buscar participante
        const participant = await prisma.participant.findUnique({
            where: { id }
        });

        if (!participant) {
            return NextResponse.json(
                { error: 'Participante não encontrado' },
                { status: 404 }
            );
        }

        // This endpoint is not used in the mock implementation
        // Payment is handled by the /payment sub-route
        return NextResponse.json({
            message: 'Use /api/participants/[id]/payment for payment processing'
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Erro interno' },
            { status: 500 }
        );
    }
}

// Para as outras rotas também
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

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
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
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