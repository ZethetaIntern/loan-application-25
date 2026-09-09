import { create } from 'zustand';

export interface LoanFormData {
  fullName: string;
  email: string;
  phone: string;
  panNumber: string;
  loanAmount: number;
  tenureMonths: number;
  loanPurpose: string;
  employmentType: 'Salaried' | 'Self-Employed' | 'Business';
  monthlyIncome: number;
  companyName: string;
}

interface FormState {
  step: number;
  formData: LoanFormData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<LoanFormData>) => void;
  resetForm: () => void;
}

const initialData: LoanFormData = {
  fullName: '',
  email: '',
  phone: '',
  panNumber: '',
  loanAmount: 500000,
  tenureMonths: 24,
  loanPurpose: 'Personal',
  employmentType: 'Salaried',
  monthlyIncome: 45000,
  companyName: '',
};

export const useFormStore = create<FormState>((set) => ({
  step: 1,
  formData: initialData,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ step: 1, formData: initialData }),
}));
