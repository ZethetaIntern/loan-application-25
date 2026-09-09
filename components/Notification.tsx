'use client';

import React from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
}

export default function Notification({ message, type = 'success' }: NotificationProps) {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2 transition-all ${
        type === 'success'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-rose-50 border-rose-200 text-rose-800'
      }`}
    >
      <span>{type === 'success' ? '✓' : '✕'}</span>
      <span>{message}</span>
    </div>
  );
}