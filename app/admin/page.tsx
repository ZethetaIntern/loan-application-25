'use client';

import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const loadData = () => {
    fetch('/api/loan')
      .then((res) => res.json())
      .then((data) => setApplications(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch('/api/loan', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
    loadData();
  };

  const exportCSV = () => {
    if (applications.length === 0) return alert('No applications to export');
    const headers = ['ID,Name,Email,Phone,Amount,Tenure,Purpose,Status,Date\n'];
    const rows = applications.map((a) =>
      `"${a.id}","${a.fullName}","${a.email}","${a.phone}","${a.loanAmount}","${a.tenureMonths}","${a.loanPurpose}","${a.status}","${new Date(a.createdAt).toLocaleDateString()}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `loan-applications-${Date.now()}.csv`;
    link.click();
  };

  const filtered = applications.filter(
    (app) =>
      app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      app.phone?.includes(search) ||
      app.id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Manage and track borrower applications</p>
          </div>
          <button
            onClick={exportCSV}
            className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Export to CSV
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by ID, applicant name, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
        />

        {filtered.length === 0 ? (
          <p className="text-slate-500 text-center py-6">No matching applications found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-600">
                  <th className="p-3">App ID</th>
                  <th className="p-3">Applicant</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-mono text-xs text-slate-500">{app.id}</td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{app.fullName}</div>
                      <div className="text-xs text-slate-400">{app.phone}</div>
                    </td>
                    <td className="p-3 font-bold text-blue-600">₹{Number(app.loanAmount).toLocaleString()}</td>
                    <td className="p-3">{app.loanPurpose}</td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          app.status === 'APPROVED'
                            ? 'bg-green-100 text-green-700'
                            : app.status === 'REJECTED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {app.status || 'PENDING'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(app.id, 'APPROVED')}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded hover:bg-emerald-100 border border-emerald-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(app.id, 'REJECTED')}
                          className="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-700 rounded hover:bg-rose-100 border border-rose-200"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}