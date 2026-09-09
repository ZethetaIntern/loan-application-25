'use client';

import React, { useState } from 'react';
import { useFormStore } from '@/store/useFormStore';
import jsPDF from 'jspdf';
import Notification from './Notification';

export default function Step4Review() {
  const { formData, prevStep, resetForm } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setSubmittedData(result.data);
        showToast('Application submitted successfully!', 'success');
      } else {
        showToast('Failed to submit application', 'error');
      }
    } catch {
      showToast('Network error while submitting', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Loan Application Receipt', 20, 25);

    doc.setFontSize(11);
    doc.text(`Application ID: ${submittedData?.id || 'N/A'}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 48);
    doc.line(20, 55, 190, 55);

    doc.text(`Full Name: ${formData.fullName}`, 20, 68);
    doc.text(`Email: ${formData.email}`, 20, 76);
    doc.text(`Phone: ${formData.phone}`, 20, 84);
    doc.text(`Employment: ${formData.employmentType} at ${formData.companyName}`, 20, 92);
    doc.text(`Monthly Income: Rs. ${Number(formData.monthlyIncome).toLocaleString()}`, 20, 100);
    doc.text(`Requested Amount: Rs. ${Number(formData.loanAmount).toLocaleString()}`, 20, 108);
    doc.text(`Tenure: ${formData.tenureMonths} Months`, 20, 116);
    doc.text(`Loan Purpose: ${formData.loanPurpose}`, 20, 124);

    doc.line(20, 134, 190, 134);
    doc.text('Thank you for applying. Our verification team will contact you shortly.', 20, 145);

    doc.save(`loan-receipt-${submittedData?.id || 'doc'}.pdf`);
  };

  return (
    <div className="space-y-6 relative">
      {toast && <Notification message={toast.message} type={toast.type} />}

      {submittedData ? (
        <div className="text-center py-6 space-y-5">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Application Submitted!</h2>
            <p className="text-sm text-slate-500 mt-1">
              Application ID: <span className="font-semibold text-slate-700">{submittedData.id}</span>
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={downloadPDF}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm"
            >
              Download Receipt (PDF)
            </button>
            <button
              onClick={() => {
                resetForm();
                setSubmittedData(null);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm"
            >
              Apply Another Loan
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-3">
            <h3 className="font-semibold text-slate-800 border-b pb-2">Review Summary</h3>
            <p><span className="text-slate-500">Name:</span> {formData.fullName}</p>
            <p><span className="text-slate-500">Contact:</span> {formData.email} | {formData.phone}</p>
            <p><span className="text-slate-500">Loan:</span> ₹{Number(formData.loanAmount).toLocaleString()} for {formData.tenureMonths} months</p>
            <p><span className="text-slate-500">Employment:</span> {formData.employmentType} ({formData.companyName})</p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={isSubmitting}
              className="px-5 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}