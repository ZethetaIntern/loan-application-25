'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, Step3FormData } from '../schemas/loanFormSchema';
import { useFormStore } from '../store/useFormStore';

export default function Step3Employment() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      employmentType: formData.employmentType,
      monthlyIncome: formData.monthlyIncome,
      companyName: formData.companyName,
    },
  });

  const onSubmit = (data: Step3FormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
        <select
          {...register('employmentType')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
        >
          <option value="Salaried">Salaried</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Business">Business Owner</option>
        </select>
        {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Company / Business Name</label>
        <input
          {...register('companyName')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          placeholder="Acme Corp"
        />
        {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Income (₹)</label>
        <input
          type="number"
          {...register('monthlyIncome', { valueAsNumber: true })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          placeholder="50000"
        />
        {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome.message}</p>}
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