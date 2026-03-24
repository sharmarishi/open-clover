"use client";

import {
  BarChart2,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { salesData, menuPerformanceData, peakHoursData } from "@/lib/mock-data";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Heatmap color scale
function cellColor(value: number): string {
  if (value >= 90) return "bg-violet-500";
  if (value >= 70) return "bg-violet-600";
  if (value >= 50) return "bg-violet-700";
  if (value >= 30) return "bg-violet-900";
  if (value >= 15) return "bg-gray-800";
  return "bg-gray-900";
}

const kpiCards = [
  {
    label: "30-Day Revenue",
    value: "$94,820",
    change: "+14.2%",
    up: true,
    icon: DollarSign,
    iconColor: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Avg Daily Orders",
    value: "87",
    change: "+9.8%",
    up: true,
    icon: ShoppingCart,
    iconColor: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    label: "Avg Order Value",
    value: "$44.12",
    change: "+3.4%",
    up: true,
    icon: TrendingUp,
    iconColor: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Covers (30 days)",
    value: "4,180",
    change: "+11.5%",
    up: true,
    icon: Users,
    iconColor: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Avg Table Turn",
    value: "58 min",
    change: "-3 min",
    up: true,
    icon: Clock,
    iconColor: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    label: "Peak Revenue Day",
    value: "Saturday",
    change: "$5,840 avg",
    up: null,
    icon: BarChart2,
    iconColor: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

const CustomTooltip = ({ active, payload, label }: {active?: boolean; payload?: {value: number; name: string; color: string}[]; label?: string}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs">
        <div className="text-gray-400 mb-1 font-medium">{label}</div>
        {payload.map((entry) => (
          <div key={entry.name} style={{ color: entry.color }} className="flex gap-2">
            <span>{entry.name}:</span>
            <span className="font-semibold">
              {entry.name === "revenue" ? `$${entry.value.toLocaleString()}` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 text-sm mt-0.5">Sales trends, menu performance & peak insights</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-violet-500">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This month</option>
            <option>Last quarter</option>
          </select>
          <button className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-lg transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-3">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <Icon className={`w-3.5 h-3.5 ${kpi.iconColor}`} />
                </div>
              </div>
              <div className="text-xl font-bold text-white leading-tight">{kpi.value}</div>
              <div className="text-xs text-gray-400 mt-0.5 leading-tight">{kpi.label}</div>
              <div className={`text-xs mt-1 font-medium ${kpi.up === true ? "text-emerald-400" : kpi.up === false ? "text-red-400" : "text-gray-500"}`}>
                {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-white">Revenue Trend — Last 30 Days</h2>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-violet-500 inline-block" /> Revenue</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={salesData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#7c3aed" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Two-column charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Menu Performance */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-5">Top Menu Items — Orders (30 days)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={menuPerformanceData}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={{ stroke: "#374151" }} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip
                cursor={{ fill: "rgba(124,58,237,0.1)" }}
                contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="orders" fill="#7c3aed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Time Heatmap */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Peak Time Heatmap — Occupancy %</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-gray-500 font-normal pb-2 w-12">Hour</th>
                  {days.map((d) => (
                    <th key={d} className="text-center text-gray-400 font-medium pb-2 px-1">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {peakHoursData.map((row) => (
                  <tr key={row.hour}>
                    <td className="text-gray-500 pr-2 py-0.5 font-mono">{row.hour}</td>
                    {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => {
                      const val = row[day as keyof typeof row] as number;
                      return (
                        <td key={day} className="px-1 py-0.5">
                          <div
                            className={`w-full h-7 rounded flex items-center justify-center text-[10px] font-semibold transition-colors ${cellColor(val)} ${val >= 70 ? "text-white" : "text-gray-500"}`}
                            title={`${row.hour} ${day}: ${val}%`}
                          >
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-3 mt-4 justify-end">
            <span className="text-xs text-gray-500">Low</span>
            {["bg-gray-900", "bg-gray-800", "bg-violet-900", "bg-violet-700", "bg-violet-600", "bg-violet-500"].map((c) => (
              <div key={c} className={`w-5 h-4 rounded ${c}`} />
            ))}
            <span className="text-xs text-gray-500">High</span>
          </div>
        </div>
      </div>

      {/* Orders per day breakdown */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-5">Daily Orders & Avg Order Value</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={salesData.slice(-14)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="orders"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="avg"
              orientation="right"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#9ca3af" }} />
            <Bar yAxisId="orders" dataKey="orders" fill="#059669" radius={[4, 4, 0, 0]} name="Orders" />
            <Bar yAxisId="avg" dataKey="avgOrderValue" fill="#d97706" radius={[4, 4, 0, 0]} name="Avg $ Value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
