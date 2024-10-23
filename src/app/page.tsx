'use client';
import { useState } from 'react';
import { RegistrationForm } from '@/components/RegistrationForm';
import PaymentForm from '@/components/PaymentForm';
import { Participant } from '@/types/participant';
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [step, setStep] = useState<'registration' | 'payment'>('registration');

    const handleRegistrationComplete = (participantData: Participant) => {
        setParticipant(participantData);
        setStep('payment');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Toaster />
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-blue-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/camp-bg.jpg')] bg-cover bg-center opacity-40"/>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">AJAD 2024</h1>
                        <p className="text-2xl mb-6">Acampamento de Jovens e Adolescentes</p>
                        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mb-8">
                            <p className="text-xl">
                                "Porque os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos os
                                meus caminhos, diz o Senhor." - Isaías 55:8
                            </p>
                        </div>
                        <a href="#inscricao"
                           className="inline-block bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors">
                            Garanta sua Vaga
                        </a>
                    </div>
                </div>
            </section>

            <section id="inscricao" className="py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Faça sua Inscrição</h2>
                    <p className="text-center text-gray-600 mb-12">
                        Vagas Limitadas! Garanta já seu lugar nessa experiência única.
                    </p>

                    <div className="max-w-md mx-auto">
                        {step === 'registration' ? (
                            <RegistrationForm onComplete={handleRegistrationComplete}/>
                        ) : (
                            <PaymentForm participant={participant}/>
                        )}
                    </div>
                </div>
            </section>

            {/* Informações do Evento */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 p-8 rounded-xl text-center">
                            <div
                                className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Local</h3>
                            <p>Chácara Recanto Feliz<br/>São Paulo - SP</p>
                        </div>

                        <div className="bg-blue-50 p-8 rounded-xl text-center">
                            <div
                                className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Data</h3>
                            <p>15 a 18 de Fevereiro<br/>2024</p>
                        </div>

                        <div className="bg-blue-50 p-8 rounded-xl text-center">
                            <div
                                className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Público</h3>
                            <p>Jovens e Adolescentes<br/>14 a 25 anos</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* O que esperar */}
            <section className="py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">O que você vai encontrar</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Louvor",
                                description: "Momentos especiais de adoração"
                            },
                            {
                                title: "Palavra",
                                description: "Mensagens impactantes"
                            },
                            {
                                title: "Comunhão",
                                description: "Novas amizades"
                            },
                            {
                                title: "Atividades",
                                description: "Diversão e aprendizado"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl text-center">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testemunhos */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Depoimentos</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                text: "Uma experiência que mudou minha vida! Fiz amigos que levarei para sempre.",
                                author: "João, 18 anos"
                            },
                            {
                                text: "Momentos únicos de conexão com Deus e com outros jovens.",
                                author: "Maria, 20 anos"
                            },
                            {
                                text: "As mensagens e dinâmicas me ajudaram muito no meu crescimento espiritual.",
                                author: "Pedro, 16 anos"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-xl">
                                <p className="mb-4 italic">"{item.text}"</p>
                                <p className="font-bold text-blue-900">{item.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção de Inscrição */}
            <section id="inscricao" className="py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Faça sua Inscrição</h2>
                    <p className="text-center text-gray-600 mb-12">Vagas Limitadas! Garanta já seu lugar nessa
                        experiência única.</p>
                    <div className="max-w-md mx-auto">
                        <PaymentForm/>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-4">Entre em contato: (11) 99999-9999</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="hover:text-blue-200">Instagram</a>
                        <a href="#" className="hover:text-blue-200">Facebook</a>
                        <a href="#" className="hover:text-blue-200">WhatsApp</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}