import { z } from 'zod';

export const step1Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  panNumber: z.string().optional(),
});

export const step2Schema = z.object({
  loanAmount: z.number().min(10000, 'Minimum loan amount is ₹10,000'),
  tenureMonths: z.number().min(6, 'Minimum tenure is 6 months'),
  loanPurpose: z.string().min(1, 'Please select a purpose'),
});

export const step3Schema = z.object({
  employmentType: z.enum(['Salaried', 'Self-Employed', 'Business']),
  monthlyIncome: z.number().min(10000, 'Minimum income must be ₹10,000'),
  companyName: z.string().min(2, 'Company name is required'),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;