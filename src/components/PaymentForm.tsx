'use client';

import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PaymentForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Erro ao iniciar pagamento');
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Inscrição AJAD 2024</CardTitle>
                <CardDescription>
                    Acampamento de Jovens - Edição 2024
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold">Detalhes do Evento:</h3>
                        <ul className="mt-2 space-y-2">
                            <li>• Local: A definir</li>
                            <li>• Data: 2024</li>
                            <li>• Valor: R$ 200,00</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800">Formas de Pagamento:</h3>
                        <ul className="mt-2 space-y-2">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                PIX (aprovação instantânea)
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Cartão de Crédito
                            </li>
                        </ul>
                    </div>

                    <div className="text-sm text-gray-500">
                        * O pagamento será processado de forma segura pelo Stripe
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full space-y-4">
                    <Button
                        className="w-full"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? 'Processando...' : 'Pagar Inscrição'}
                    </Button>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}