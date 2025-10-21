// Mock data storage for participants
export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  church: string;
  emergencyContact: string;
  emergencyPhone: string;
  foodRestrictions: string | null;
  shirtSize: string;
  status: string;
  paymentStatus: string;
  paymentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory data store
const participants: Participant[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '(11) 98765-4321',
    age: 18,
    church: 'Igreja Batista Central',
    emergencyContact: 'Maria Silva',
    emergencyPhone: '(11) 91234-5678',
    foodRestrictions: 'Nenhuma',
    shirtSize: 'M',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentId: 'mock_payment_1',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '(11) 97654-3210',
    age: 19,
    church: 'Igreja Presbiteriana',
    emergencyContact: 'José Santos',
    emergencyPhone: '(11) 96543-2109',
    foodRestrictions: 'Vegetariana',
    shirtSize: 'P',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentId: 'mock_payment_2',
    createdAt: new Date('2024-01-16T14:30:00Z'),
    updatedAt: new Date('2024-01-16T14:30:00Z'),
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@example.com',
    phone: '(21) 98888-7777',
    age: 20,
    church: 'Igreja Metodista',
    emergencyContact: 'Ana Oliveira',
    emergencyPhone: '(21) 97777-6666',
    foodRestrictions: null,
    shirtSize: 'G',
    status: 'PENDING',
    paymentStatus: 'PENDING',
    paymentId: null,
    createdAt: new Date('2024-01-17T09:15:00Z'),
    updatedAt: new Date('2024-01-17T09:15:00Z'),
  },
];

// Helper function to generate unique IDs
let nextId = 4;
export function generateId(): string {
  return String(nextId++);
}

// CRUD operations
export const mockDB = {
  participant: {
    findMany: async () => {
      return [...participants];
    },

    findUnique: async ({ where }: { where: { id: string } }) => {
      const participant = participants.find((p) => p.id === where.id);
      return participant || null;
    },

    create: async ({ data }: { data: Omit<Participant, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'paymentStatus' | 'paymentId'> }) => {
      const newParticipant: Participant = {
        id: generateId(),
        ...data,
        foodRestrictions: data.foodRestrictions || null,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      participants.push(newParticipant);
      return newParticipant;
    },

    update: async ({ where, data }: { where: { id: string }; data: Partial<Participant> }) => {
      const index = participants.findIndex((p) => p.id === where.id);
      if (index === -1) {
        throw new Error('Participant not found');
      }
      participants[index] = {
        ...participants[index],
        ...data,
        updatedAt: new Date(),
      };
      return participants[index];
    },

    delete: async ({ where }: { where: { id: string } }) => {
      const index = participants.findIndex((p) => p.id === where.id);
      if (index === -1) {
        throw new Error('Participant not found');
      }
      const deleted = participants[index];
      participants.splice(index, 1);
      return deleted;
    },
  },
};
