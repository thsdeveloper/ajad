// Using mock data instead of real database connection
// This allows the app to run without MongoDB
import { mockDB } from './mock-data';

export const prisma = mockDB;