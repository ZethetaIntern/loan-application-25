'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, Step1FormData } from '@/schemas/loanFormSchema';
import { useFormStore } from '@/store/useFormStore';

export default function Step1Personal() {
  const { formData, updateFormData, nextStep } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      panNumber: formData.panNumber,
    },
  });

  const onSubmit = (data: Step1FormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <input
          {...register('fullName')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          placeholder="John Doe"
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <input
          {...register('email')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
        <input
          {...register('phone')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          placeholder="9876543210"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">PAN Card Number</label>
        <input
          {...register('panNumber')}
          className="w-full px-3 py-2 border rounded-lg uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          placeholder="ABCDE1234F"
        />
        {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber.message}</p>}
      </div>

      <div className="flex justify-end pt-4">
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