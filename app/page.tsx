'use client';

import React from 'react';
import { useFormStore } from '@/store/useFormStore';
import StepIndicator from '@/components/StepIndicator';
import Step1Personal from '@/components/Step1Personal';
import Step2Loan from '@/components/Step2Loan';
import Step3Employment from '@/components/Step3Employment';
import Step4Review from '@/components/Step4Review';

export default function Home() {
  const { step } = useFormStore();

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">Loan Application</h1>
        <p className="text-sm text-slate-500 text-center mb-8">Complete the steps below to submit your application</p>
        
        {/* currentStep prop இங்கே சேர்க்கப்பட்டுள்ளது */}
        <StepIndicator currentStep={step} />

        <div className="mt-8">
          {step === 1 && <Step1Personal />}
          {step === 2 && <Step2Loan />}
          {step === 3 && <Step3Employment />}
          {step === 4 && <Step4Review />}
        </div>
      </div>
    </main>
  );
}