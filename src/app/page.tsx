'use client';
import { useState } from 'react';
import { RegistrationForm } from '@/components/RegistrationForm';
import PaymentForm from '@/components/PaymentForm';
import { Participant } from '@/types/participant';
import { Toaster } from "@/components/ui/toaster"
import AJADCarousel from "@/components/AJADCarousel";
import Header from '@/components/Header';

export default function Home() {
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [step, setStep] = useState<'registration' | 'payment'>('registration');

    const handleRegistrationComplete = (participantData: Participant) => {
        setParticipant(participantData);
        setStep('payment');
    };

    return (
        <div>
            <Header />
            <AJADCarousel
                slides={[
                    {
                        title: "AJAD 2024",
                        subtitle: "Uma experiência que vai transformar sua vida",
                        image: "https://i.ytimg.com/vi/y7jqBUsxYZQ/maxresdefault.jpg",
                        action: {
                            label: "Inscreva-se Agora",
                            onClick: () => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })
                        }
                    },
                    {
                        title: "Momentos Únicos",
                        subtitle: "4 dias de louvor, palavra e comunhão",
                        image: "https://storage.googleapis.com/media_files_prod/uploads/event/534012/event-15b276cdc578c085ae2c2235838dbc2e.jpg",
                        action: {
                            label: "Saiba Mais",
                            onClick: () => window.scrollTo({
                                top: window.innerHeight,
                                behavior: 'smooth'
                            })
                        }
                    },
                    {
                        title: "Junte-se a Nós",
                        subtitle: "15 a 18 de Fevereiro na Chácara Recanto Feliz",
                        image: "https://storage.googleapis.com/media_files_prod/uploads/event/534012/event-15b276cdc578c085ae2c2235838dbc2e.jpg",
                        action: {
                            label: "Ver Programação",
                            onClick: () => console.log("Mostrar programação")
                        }
                    }
                ]}
                showBadges={true}
                textAlign="left"
                autoPlay={true}
                autoPlayInterval={5000}
            />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <Toaster />


                <section id="inscricao" className="py-20 bg-blue-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-4">Faça sua Inscrição</h2>
                        <p className="text-center text-gray-600 mb-12">
                            Vagas Limitadas! Garanta já seu lugar nessa experiência única.
                        </p>

                        <div className="max-w-md mx-auto">
                            {step === 'registration' ? (
                                <RegistrationForm onComplete={handleRegistrationComplete} />
                            ) : (
                                <PaymentForm participant={participant} />
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
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Local</h3>
                                <p>Chácara Recanto Feliz<br />São Paulo - SP</p>
                            </div>

                            <div className="bg-blue-50 p-8 rounded-xl text-center">
                                <div
                                    className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Data</h3>
                                <p>15 a 18 de Fevereiro<br />2024</p>
                            </div>

                            <div className="bg-blue-50 p-8 rounded-xl text-center">
                                <div
                                    className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Público</h3>
                                <p>Jovens e Adolescentes<br />14 a 25 anos</p>
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
                                    <p className="mb-4 italic">{item.text}</p>
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
                            <PaymentForm />
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
        </div>
    );
}