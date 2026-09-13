"use client";
import React, { useState } from 'react';

export default function PortfolioAnalytics() {
  const [timeRange, setTimeRange] = useState('1M');

  const holdings = [
    { name: 'Apple Inc.', ticker: 'AAPL', allocation: '32%', value: '$9,552.12', pnl: '+18.4%', positive: true },
    { name: 'Microsoft Corp.', ticker: 'MSFT', allocation: '24%', value: '$7,164.09', pnl: '+12.1%', positive: true },
    { name: 'Nvidia Corp.', ticker: 'NVDA', allocation: '20%', value: '$5,970.08', pnl: '+45.8%', positive: true },
    { name: 'S&P 500 ETF', ticker: 'VOO', allocation: '15%', value: '$4,477.56', pnl: '+8.6%', positive: true },
    { name: 'Cash Reserve', ticker: 'USD', allocation: '9%', value: '$2,686.55', pnl: '0.0%', positive: true },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Portfolio Analytics Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time performance metrics, asset allocation & risk analysis</p>
          </div>
          <div className="flex gap-2 bg-slate-200/70 p-1 rounded-lg">
            {['1W', '1M', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                  timeRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </header>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Net Worth</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">$29,850.40</h3>
            <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+$5,350.40 (21.8%)</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Invested Capital</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">$24,500.00</h3>
            <span className="inline-block mt-2 text-xs text-slate-500">Initial Deposit</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sharpe Ratio</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">1.84</h3>
            <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Optimal Risk Adjusted</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Assets</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">5 Holdings</h3>
            <span className="inline-block mt-2 text-xs text-slate-500">Across 3 Sectors</span>
          </div>
        </div>

        {/* Performance & Allocation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Summary Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-slate-900">Portfolio Performance Trend</h2>
              <span className="text-xs font-medium text-slate-400">Benchmark: S&P 500 (+14.2%)</span>
            </div>
            <div className="h-60 bg-gradient-to-t from-emerald-50/50 to-white rounded-lg border border-slate-100 flex flex-col items-center justify-center text-slate-400 gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-700">+21.8%</span>
                <span className="text-sm font-semibold text-emerald-600">▲ Outperforming</span>
              </div>
              <p className="text-xs text-slate-400">Growth trajectory stable across {timeRange} timeframe</p>
            </div>
          </div>

          {/* Allocation Breakdown */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-6">Asset Allocation</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">Equities & Tech Stocks</span>
                  <span className="text-slate-900 font-bold">76%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[76%] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">Index ETFs</span>
                  <span className="text-slate-900 font-bold">15%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[15%] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">Cash & Equivalents</span>
                  <span className="text-slate-900 font-bold">9%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[9%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Current Portfolio Holdings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Asset</th>
                  <th className="p-4">Allocation</th>
                  <th className="p-4">Market Value</th>
                  <th className="p-4 pr-6 text-right">Return (P&L)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {holdings.map((asset) => (
                  <tr key={asset.ticker} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 pl-6 font-medium text-slate-900">
                      {asset.name} <span className="text-xs text-slate-400 ml-1">({asset.ticker})</span>
                    </td>
                    <td className="p-4 text-slate-600">{asset.allocation}</td>
                    <td className="p-4 font-semibold text-slate-800">{asset.value}</td>
                    <td className="p-4 pr-6 text-right font-semibold text-emerald-600">
                      {asset.pnl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}