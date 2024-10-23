import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assumindo que você está usando Prisma

export async function GET() {
    try {
        const participants = await prisma.participant.findMany()

        return NextResponse.json(participants)
    } catch (error) {
        console.error('Erro ao buscar participantes:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar participantes' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const participant = await prisma.participant.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                age: parseInt(data.age),
                church: data.church,
                emergencyContact: data.emergencyContact,
                emergencyPhone: data.emergencyPhone,
                foodRestrictions: data.foodRestrictions,
                shirtSize: data.shirtSize,
            }
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