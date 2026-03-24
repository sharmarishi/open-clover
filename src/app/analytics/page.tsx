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

// Heatmap color scale — light theme
function cellColor(value: number): string {
  if (value >= 90) return "bg-indigo-600 text-white";
  if (value >= 70) return "bg-indigo-500 text-white";
  if (value >= 50) return "bg-indigo-400 text-white";
  if (value >= 30) return "bg-indigo-200 text-indigo-700";
  if (value >= 15) return "bg-indigo-100 text-indigo-400";
  return "bg-gray-100 text-gray-400";
}

const kpiCards = [
  {
    label: "30-Day Revenue",
    value: "$94,820",
    change: "+14.2%",
    up: true,
    icon: DollarSign,
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Avg Daily Orders",
    value: "87",
    change: "+9.8%",
    up: true,
    icon: ShoppingCart,
    iconColor: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Avg Order Value",
    value: "$44.12",
    change: "+3.4%",
    up: true,
    icon: TrendingUp,
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Covers (30 days)",
    value: "4,180",
    change: "+11.5%",
    up: true,
    icon: Users,
    iconColor: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Avg Table Turn",
    value: "58 min",
    change: "-3 min",
    up: true,
    icon: Clock,
    iconColor: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    label: "Peak Revenue Day",
    value: "Saturday",
    change: "$5,840 avg",
    up: null,
    icon: BarChart2,
    iconColor: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const CustomTooltip = ({ active, payload, label }: {active?: boolean; payload?: {value: number; name: string; color: string}[]; label?: string}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-sm">
        <div className="text-gray-500 mb-1 font-medium">{label}</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 text-sm mt-0.5">Sales trends, menu performance & peak insights</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This month</option>
            <option>Last quarter</option>
          </select>
          <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-3">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <Icon className={`w-3.5 h-3.5 ${kpi.iconColor}`} />
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900 leading-tight">{kpi.value}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight">{kpi.label}</div>
              <div className={`text-xs mt-1 font-medium ${kpi.up === true ? "text-emerald-600" : kpi.up === false ? "text-red-500" : "text-gray-400"}`}>
                {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-gray-900">Revenue Trend — Last 30 Days</h2>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-indigo-500 inline-block" /> Revenue</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={salesData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#4F46E5" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Two-column charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Menu Performance */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Top Menu Items — Orders (30 days)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={menuPerformanceData}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip
                cursor={{ fill: "rgba(79,70,229,0.05)" }}
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "#111827" }}
              />
              <Bar dataKey="orders" fill="#4F46E5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Time Heatmap */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Peak Time Heatmap — Occupancy %</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 font-normal pb-2 w-12">Hour</th>
                  {days.map((d) => (
                    <th key={d} className="text-center text-gray-500 font-medium pb-2 px-1">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {peakHoursData.map((row) => (
                  <tr key={row.hour}>
                    <td className="text-gray-400 pr-2 py-0.5 font-mono">{row.hour}</td>
                    {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => {
                      const val = row[day as keyof typeof row] as number;
                      return (
                        <td key={day} className="px-1 py-0.5">
                          <div
                            className={`w-full h-7 rounded flex items-center justify-center text-[10px] font-semibold transition-colors ${cellColor(val)}`}
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
            <span className="text-xs text-gray-400">Low</span>
            {["bg-gray-100", "bg-indigo-100", "bg-indigo-200", "bg-indigo-400", "bg-indigo-500", "bg-indigo-600"].map((c) => (
              <div key={c} className={`w-5 h-4 rounded ${c}`} />
            ))}
            <span className="text-xs text-gray-400">High</span>
          </div>
        </div>
      </div>

      {/* Orders per day breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-5">Daily Orders & Avg Order Value</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={salesData.slice(-14)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="orders"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="avg"
              orientation="right"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#6B7280" }} />
            <Bar yAxisId="orders" dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} name="Orders" />
            <Bar yAxisId="avg" dataKey="avgOrderValue" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Avg $ Value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
