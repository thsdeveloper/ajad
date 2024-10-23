'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Participant } from '@/types/participant';
import {toast} from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react';
import {ToastAction} from "@/components/ui/toast";

interface RegistrationFormProps {
    onComplete: (participant: Participant) => void;
}

export function RegistrationForm({ onComplete }: RegistrationFormProps) {
    const [formData, setFormData] = useState<Participant>({
        name: '',
        email: '',
        phone: '',
        age: 0,
        church: '',
        emergencyContact: '',
        emergencyPhone: '',
        foodRestrictions: '',
        shirtSize: 'M',
        status: 'PENDING',
        paymentStatus: 'PENDING'
    });

    const [errors, setErrors] = useState<Partial<Record<keyof Participant, string>>>({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Função para formatar telefone
    const formatPhone = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
        if (match) {
            return [
                match[1] && '(',
                match[1], // DDD
                match[1] && ')',
                match[1] && ' ',
                match[2], // Primeiro bloco
                match[2] && '-',
                match[3] // Segundo bloco
            ].join('');
        }
        return phone;
    };

    // Validação de email
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors: Partial<Record<keyof Participant, string>> = {};

        // Validações obrigatórias
        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
        }

        if (!formData.email) {
            newErrors.email = 'Email é obrigatório';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.phone) {
            newErrors.phone = 'Telefone é obrigatório';
        } else if (formData.phone.replace(/\D/g, '').length !== 11) {
            newErrors.phone = 'Telefone deve ter 11 números (DDD + número)';
        }

        if (!formData.age) {
            newErrors.age = 'Idade é obrigatória';
        } else if (formData.age < 14 || formData.age > 25) {
            newErrors.age = 'Idade deve ser entre 14 e 25 anos';
        }

        if (!formData.church.trim()) {
            newErrors.church = 'Igreja é obrigatória';
        }

        if (!formData.emergencyContact.trim()) {
            newErrors.emergencyContact = 'Contato de emergência é obrigatório';
        }

        if (!formData.emergencyPhone) {
            newErrors.emergencyPhone = 'Telefone de emergência é obrigatório';
        } else if (formData.emergencyPhone.replace(/\D/g, '').length !== 11) {
            newErrors.emergencyPhone = 'Telefone de emergência deve ter 11 números (DDD + número)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'phone' | 'emergencyPhone') => {
        const formatted = formatPhone(e.target.value);
        setFormData(prev => ({ ...prev, [field]: formatted }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) {
            toast({
                title: "Erro no formulário",
                description: "Por favor, corrija os campos destacados.",
                variant: "destructive",
            });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('/api/participants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao salvar participante');
            }

            const savedParticipant = await response.json();

            toast({
                title: "Registro realizado!",
                description: "Seus dados foram salvos com sucesso.",
                action: <ToastAction altText="Try again">Obrigado</ToastAction>,
            });

            onComplete(savedParticipant);

        } catch (error) {
            console.error('Erro ao salvar participante:', error);
            setSubmitError(error.message || 'Ocorreu um erro ao salvar seus dados. Tente novamente.');

            toast({
                title: "Erro ao salvar",
                description: error.message || 'Ocorreu um erro ao salvar seus dados. Tente novamente.',
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Dados do Participante</CardTitle>
                <CardDescription>
                    Preencha seus dados para a inscrição no AJAD 2024
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome Completo *</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className={errors.name ? 'border-red-500' : ''}
                            placeholder="Digite seu nome completo"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email *</label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={errors.email ? 'border-red-500' : ''}
                            placeholder="seu@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Telefone *</label>
                            <Input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handlePhoneChange(e, 'phone')}
                                className={errors.phone ? 'border-red-500' : ''}
                                placeholder="(11) 99999-9999"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Idade *</label>
                            <Input
                                type="number"
                                value={formData.age || ''}
                                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                                className={errors.age ? 'border-red-500' : ''}
                                min="14"
                                max="25"
                            />
                            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Igreja *</label>
                        <Input
                            value={formData.church}
                            onChange={(e) => setFormData({...formData, church: e.target.value})}
                            className={errors.church ? 'border-red-500' : ''}
                            placeholder="Nome da sua igreja"
                        />
                        {errors.church && <p className="text-red-500 text-sm mt-1">{errors.church}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Contato de Emergência *</label>
                        <Input
                            value={formData.emergencyContact}
                            onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                            className={errors.emergencyContact ? 'border-red-500' : ''}
                            placeholder="Nome do contato de emergência"
                        />
                        {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Telefone de Emergência *</label>
                        <Input
                            type="tel"
                            value={formData.emergencyPhone}
                            onChange={(e) => handlePhoneChange(e, 'emergencyPhone')}
                            className={errors.emergencyPhone ? 'border-red-500' : ''}
                            placeholder="(11) 99999-9999"
                        />
                        {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Restrições Alimentares</label>
                        <Input
                            value={formData.foodRestrictions}
                            onChange={(e) => setFormData({...formData, foodRestrictions: e.target.value})}
                            placeholder="Se houver, liste suas restrições alimentares"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tamanho da Camiseta *</label>
                        <Select
                            value={formData.shirtSize}
                            onValueChange={(value) => setFormData({...formData, shirtSize: value as Participant['shirtSize']})}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o tamanho" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="P">P</SelectItem>
                                <SelectItem value="M">M</SelectItem>
                                <SelectItem value="G">G</SelectItem>
                                <SelectItem value="GG">GG</SelectItem>
                                <SelectItem value="XG">XG</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {submitError && (
                        <div className="bg-red-50 p-4 rounded-md">
                            <p className="text-red-500 text-sm text-center">{submitError}</p>
                        </div>
                    )}

                    <div className="text-sm text-gray-500">
                        * Campos obrigatórios
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            'Prosseguir para Pagamento'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}