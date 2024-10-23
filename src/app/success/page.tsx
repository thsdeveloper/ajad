import { redirect } from 'next/navigation';
import Stripe from 'stripe';

async function getSessionStatus(sessionId: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2023-10-16',
    });

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return session;
    } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        return null;
    }
}

export default async function SuccessPage({
                                              searchParams,
                                          }: {
    searchParams: { session_id: string };
}) {
    const sessionId = searchParams.session_id;

    if (!sessionId) {
        redirect('/');
    }

    const session = await getSessionStatus(sessionId);

    if (!session || session.payment_status !== 'paid') {
        redirect('/');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="mb-4 text-green-500">
                    <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Pagamento Confirmado!
                </h1>
                <p className="text-gray-600 mb-6">
                    Sua inscrição para o AJAD 2024 foi realizada com sucesso.
                    O comprovante foi enviado para seu email.
                </p>
                <div className="border-t pt-4">
                    <p className="text-sm text-gray-500">
                        ID da Transação: {sessionId}
                    </p>
                </div>
            </div>
        </div>
    );
}