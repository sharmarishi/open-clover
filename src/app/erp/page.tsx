import {
  Calculator,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowUpDown,
  Users,
  DollarSign,
  Clock,
  Activity,
  Loader2,
} from "lucide-react";
import { erpConnections, apiLogs } from "@/lib/mock-data";

const payrollData = [
  { name: "Maria Sanchez", role: "Server", hours: 32.5, wage: 15.50, total: 503.75, status: "scheduled" },
  { name: "James Okafor", role: "Server", hours: 28.0, wage: 15.50, total: 434.00, status: "scheduled" },
  { name: "Chen Wei", role: "Server", hours: 36.0, wage: 15.50, total: 558.00, status: "scheduled" },
  { name: "Alex Torres", role: "Bartender", hours: 40.0, wage: 17.00, total: 680.00, status: "scheduled" },
  { name: "Pat Kim", role: "Kitchen", hours: 44.0, wage: 16.00, total: 704.00, status: "overtime" },
  { name: "Sam Rivera", role: "Kitchen", hours: 38.5, wage: 16.00, total: 616.00, status: "scheduled" },
  { name: "Jordan Lee", role: "Host", hours: 24.0, wage: 14.00, total: 336.00, status: "scheduled" },
];

const accountingSummary = [
  { label: "This Week Revenue", value: "$18,420.50", change: "+12.4%", up: true },
  { label: "COGS", value: "$6,447.18", change: "+8.1%", up: false },
  { label: "Labor Cost", value: "$3,831.75", change: "+2.3%", up: false },
  { label: "Gross Profit", value: "$11,973.32", change: "+15.8%", up: true },
  { label: "Operating Expenses", value: "$2,105.00", change: "0%", up: null },
  { label: "Net Profit", value: "$9,868.32", change: "+18.2%", up: true },
];

const syncHistory = [
  { platform: "QuickBooks", event: "Sales records synced", records: 127, time: "Today 4:00 PM", status: "success" },
  { platform: "Xero", event: "Invoice export", records: 34, time: "Today 3:15 PM", status: "success" },
  { platform: "QuickBooks", event: "Payroll journal entry", records: 7, time: "Today 12:00 PM", status: "success" },
  { platform: "Xero", event: "Chart of accounts sync", records: 48, time: "Yesterday 9:00 AM", status: "success" },
  { platform: "QuickBooks", event: "Bank reconciliation", records: 203, time: "Yesterday 8:30 AM", status: "success" },
];

function ConnectionCard({ conn }: { conn: (typeof erpConnections)[0] }) {
  const isActive = conn.status === "synced" || conn.status === "syncing";
  return (
    <div className={`bg-gray-900 border rounded-xl p-5 ${
      conn.status === "error" ? "border-red-500/30" :
      conn.status === "syncing" ? "border-amber-500/30" :
      "border-gray-800"
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white ${
            conn.id === "qbo" ? "bg-green-600" :
            conn.id === "xero" ? "bg-blue-600" :
            conn.id === "gusto" ? "bg-pink-600" :
            "bg-gray-700"
          }`}>
            {conn.logo}
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{conn.name}</div>
            <div className="text-xs text-gray-400 capitalize mt-0.5">{conn.type}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {conn.status === "synced" && <><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span className="text-xs text-emerald-400">Synced</span></>}
          {conn.status === "syncing" && <><Loader2 className="w-4 h-4 text-amber-400 animate-spin" /><span className="text-xs text-amber-400">Syncing...</span></>}
          {conn.status === "error" && <><AlertCircle className="w-4 h-4 text-red-400" /><span className="text-xs text-red-400">Error</span></>}
          {conn.status === "disconnected" && <><AlertCircle className="w-4 h-4 text-gray-500" /><span className="text-xs text-gray-500">Disconnected</span></>}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Last Sync</span>
          <span className="text-gray-300">{conn.lastSync}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Records Synced</span>
          <span className="text-gray-300">{conn.recordsSync.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Type</span>
          <span className="text-gray-300 capitalize">{conn.type}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className={`flex-1 text-xs py-2 rounded-lg border flex items-center justify-center gap-1 transition-colors ${
          isActive ? "border-gray-700 text-gray-400 hover:text-white hover:border-gray-600" : "border-red-500/30 text-red-400"
        }`}>
          <RefreshCw className="w-3 h-3" /> {conn.status === "syncing" ? "Syncing..." : "Sync Now"}
        </button>
        <button className="flex-1 text-xs py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition-colors">
          Configure
        </button>
      </div>
    </div>
  );
}

export default function ErpPage() {
  const totalPayroll = payrollData.reduce((s, e) => s + e.total, 0);
  const totalHours = payrollData.reduce((s, e) => s + e.hours, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">ERP & Accounting</h1>
          <p className="text-gray-400 text-sm mt-0.5">Financial integrations, payroll & API middleware</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
          <CheckCircle2 className="w-4 h-4" /> 3/4 connections healthy
        </div>
      </div>

      {/* Accounting Summary */}
      <div className="grid grid-cols-6 gap-3">
        {accountingSummary.map((item) => (
          <div key={item.label} className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-xs text-gray-400 mb-1.5 leading-tight">{item.label}</div>
            <div className="text-base font-bold text-white">{item.value}</div>
            <div className={`text-xs mt-0.5 ${item.up === true ? "text-emerald-400" : item.up === false ? "text-red-400" : "text-gray-500"}`}>
              {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* Connections */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Accounting & ERP Connections</h2>
        <div className="grid grid-cols-4 gap-4">
          {erpConnections.map((conn) => (
            <ConnectionCard key={conn.id} conn={conn} />
          ))}
        </div>
      </div>

      {/* Two-column lower section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Payroll */}
        <div className="col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-semibold text-white">Payroll & Labor — This Week</h2>
            </div>
            <div className="flex gap-4 text-xs text-gray-400">
              <span>Total hours: <span className="text-white font-medium">{totalHours.toFixed(1)}</span></span>
              <span>Total cost: <span className="text-emerald-400 font-medium">${totalPayroll.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-800">
                  <th className="text-left pb-2 font-medium">Employee</th>
                  <th className="text-left pb-2 font-medium">Role</th>
                  <th className="text-right pb-2 font-medium">Hours</th>
                  <th className="text-right pb-2 font-medium">Rate</th>
                  <th className="text-right pb-2 font-medium">Total</th>
                  <th className="text-right pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {payrollData.map((emp) => (
                  <tr key={emp.name} className="hover:bg-gray-800/40">
                    <td className="py-2.5 text-white font-medium">{emp.name}</td>
                    <td className="py-2.5 text-gray-400">{emp.role}</td>
                    <td className={`py-2.5 text-right ${emp.hours > 40 ? "text-amber-400" : "text-gray-300"}`}>{emp.hours}</td>
                    <td className="py-2.5 text-right text-gray-300">${emp.wage.toFixed(2)}</td>
                    <td className="py-2.5 text-right font-semibold text-white">${emp.total.toFixed(2)}</td>
                    <td className="py-2.5 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        emp.status === "overtime" ? "bg-amber-500/15 text-amber-400" : "bg-gray-700 text-gray-400"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sync History */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpDown className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Sync History</h2>
          </div>
          <div className="space-y-3">
            {syncHistory.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white font-medium">{item.event}</div>
                  <div className="text-xs text-gray-500">{item.platform} · {item.records} records</div>
                  <div className="text-xs text-gray-600">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Middleware Logs */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">REST API Middleware — Live Logs</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>
        <div className="font-mono text-xs space-y-1.5 bg-gray-950 rounded-lg p-4 max-h-48 overflow-y-auto">
          {apiLogs.map((log, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-gray-500 w-24 flex-shrink-0">{log.time}</span>
              <span className={`w-12 font-bold ${
                log.method === "GET" ? "text-blue-400" :
                log.method === "POST" ? "text-emerald-400" :
                "text-amber-400"
              }`}>{log.method}</span>
              <span className="text-gray-300 flex-1">{log.endpoint}</span>
              <span className={`w-8 ${log.status >= 500 ? "text-red-400" : log.status >= 400 ? "text-amber-400" : "text-emerald-400"}`}>
                {log.status}
              </span>
              <span className="text-gray-500 w-16 text-right">{log.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
