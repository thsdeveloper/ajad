export interface Participant {
    id?: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    church: string;
    emergencyContact: string;
    emergencyPhone: string;
    foodRestrictions?: string;
    shirtSize: 'P' | 'M' | 'G' | 'GG' | 'XG';
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
    paymentId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}