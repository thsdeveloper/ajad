import { NextResponse } from 'next/server';

// Mock checkout session creation - no Stripe required
export async function POST() {
    try {
        // Create a mock session
        const mockSessionId = `mock_session_${Date.now()}`;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const successUrl = `${baseUrl}/success?session_id=${mockSessionId}`;

        // Mock: In a real scenario, we would create a Stripe session
        // For now, we just return a success URL
        return NextResponse.json({ url: successUrl });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}