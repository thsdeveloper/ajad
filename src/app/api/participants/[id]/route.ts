import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const participant = await prisma.participant.findUnique({
            where: { id: params.id }
        })

        if (!participant) {
            return NextResponse.json(
                { error: 'Participante não encontrado' },
            )
        }

        return NextResponse.json(participant)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
            );
        }
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json()

        const participant = await prisma.participant.update({
            where: { id: params.id },
            data
        })

        return NextResponse.json(participant)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
            );
        }
    }
}
