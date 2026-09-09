'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, Step2FormData } from '../schemas/loanFormSchema';
import { useFormStore } from '../store/useFormStore';

export default function Step2Loan() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      loanAmount: formData.loanAmount,
      tenureMonths: formData.tenureMonths,
      loanPurpose: formData.loanPurpose,
    },
  });

  const currentAmount = watch('loanAmount', formData.loanAmount);
  const currentTenure = watch('tenureMonths', formData.tenureMonths);

  const onSubmit = (data: Step2FormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-slate-700">Loan Amount</label>
          <span className="text-sm font-semibold text-blue-600">₹{Number(currentAmount).toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="50000"
          max="5000000"
          step="10000"
          {...register('loanAmount', { valueAsNumber: true })}
          className="w-full accent-blue-600"
        />
        {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount.message}</p>}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-slate-700">Tenure (Months)</label>
          <span className="text-sm font-semibold text-blue-600">{currentTenure} Months</span>
        </div>
        <input
          type="range"
          min="6"
          max="84"
          step="6"
          {...register('tenureMonths', { valueAsNumber: true })}
          className="w-full accent-blue-600"
        />
        {errors.tenureMonths && <p className="text-red-500 text-xs mt-1">{errors.tenureMonths.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Loan Purpose</label>
        <select
          {...register('loanPurpose')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
        >
          <option value="Personal">Personal Needs</option>
          <option value="Home Renovation">Home Renovation</option>
          <option value="Medical">Medical Expenses</option>
          <option value="Education">Education</option>
          <option value="Business">Business Expansion</option>
        </select>
        {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose.message}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Next
        </button>
      </div>
    </form>
  );
}