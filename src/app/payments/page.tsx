import {
  CreditCard,
  Smartphone,
  QrCode,
  Wifi,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { recentTransactions } from "@/lib/mock-data";

const paymentMethods = [
  {
    id: "card",
    name: "Credit & Debit Cards",
    description: "Visa, Mastercard, Amex, Discover — chip, swipe & PIN",
    icon: CreditCard,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    enabled: true,
    todayCount: 42,
    todayVolume: 3841.50,
    barColor: "from-indigo-500 to-indigo-400",
  },
  {
    id: "nfc",
    name: "NFC / Contactless",
    description: "Tap-to-pay for EMV contactless cards",
    icon: Wifi,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    enabled: true,
    todayCount: 18,
    todayVolume: 1204.75,
    barColor: "from-blue-500 to-blue-400",
  },
  {
    id: "apple_pay",
    name: "Apple Pay",
    description: "Secure Touch/Face ID payments via NFC",
    icon: Smartphone,
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-200",
    enabled: true,
    todayCount: 24,
    todayVolume: 2187.00,
    barColor: "from-gray-500 to-gray-400",
  },
  {
    id: "google_pay",
    name: "Google Pay",
    description: "Android NFC and browser-based payments",
    icon: Smartphone,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    enabled: true,
    todayCount: 11,
    todayVolume: 879.25,
    barColor: "from-emerald-500 to-emerald-400",
  },
  {
    id: "qr",
    name: "QR Code Payments",
    description: "Customer-scan QR codes for contactless pay",
    icon: QrCode,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    enabled: true,
    todayCount: 7,
    todayVolume: 412.00,
    barColor: "from-amber-500 to-amber-400",
  },
  {
    id: "cash",
    name: "Cash",
    description: "Physical cash with drawer integration",
    icon: DollarSign,
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    enabled: true,
    todayCount: 6,
    todayVolume: 298.50,
    barColor: "from-gray-400 to-gray-300",
  },
];

const methodIcons: Record<string, string> = {
  card: "💳",
  nfc: "📡",
  apple_pay: "🍎",
  google_pay: "G",
  qr: "⬛",
  cash: "$",
};

const totalToday = paymentMethods.reduce((s, m) => s + m.todayVolume, 0);

export default function PaymentsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 text-sm mt-0.5">Payment methods, processing & transactions</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
          <CheckCircle2 className="w-4 h-4" />
          All processors operational
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Today&apos;s Volume</div>
          <div className="text-2xl font-bold text-gray-900">${totalToday.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +8.4% vs yesterday</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Transactions</div>
          <div className="text-2xl font-bold text-gray-900">{paymentMethods.reduce((s, m) => s + m.todayCount, 0)}</div>
          <div className="text-xs text-gray-400 mt-1">Across all methods</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Avg Transaction</div>
          <div className="text-2xl font-bold text-gray-900">$46.28</div>
          <div className="text-xs text-gray-400 mt-1">Per order</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Declined</div>
          <div className="text-2xl font-bold text-red-600">2</div>
          <div className="text-xs text-gray-400 mt-1">0.4% decline rate</div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Payment Methods</h2>
        <div className="grid grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const pct = totalToday > 0 ? (method.todayVolume / totalToday) * 100 : 0;
            return (
              <div key={method.id} className={`bg-white border ${method.borderColor} rounded-xl p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${method.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${method.color}`} />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    {method.enabled ? (
                      <>
                        <ToggleRight className="w-5 h-5 text-emerald-500" />
                        <span className="text-emerald-600">Active</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400">Off</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="font-semibold text-gray-900 text-sm">{method.name}</div>
                <div className="text-xs text-gray-500 mt-0.5 mb-3 leading-relaxed">{method.description}</div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400">Today</span>
                  <span className="text-gray-900 font-medium">{method.todayCount} txns</span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400">Volume</span>
                  <span className="text-gray-900 font-medium">${method.todayVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {/* Progress bar */}
                <div className="mt-3">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${method.barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{pct.toFixed(1)}% of today&apos;s volume</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Recent Transactions</h2>
          <button className="text-xs text-indigo-600 hover:text-indigo-500">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-3 font-medium">ID</th>
                <th className="text-left pb-3 font-medium">Method</th>
                <th className="text-left pb-3 font-medium">Card / Token</th>
                <th className="text-left pb-3 font-medium">Table</th>
                <th className="text-left pb-3 font-medium">Time</th>
                <th className="text-right pb-3 font-medium">Amount</th>
                <th className="text-right pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-mono text-xs text-gray-500">{txn.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">{methodIcons[txn.method] ?? "?"}</span>
                      <span className="text-sm text-gray-700">{txn.cardBrand}</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-xs text-gray-500">
                    {txn.last4 ? `•••• ${txn.last4}` : "—"}
                  </td>
                  <td className="py-3 text-sm text-gray-500">
                    {txn.tableId ? `Table ${txn.tableId}` : "—"}
                  </td>
                  <td className="py-3 text-sm text-gray-500">{txn.time}</td>
                  <td className="py-3 text-right font-semibold text-gray-900">${txn.amount.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      txn.status === "approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : txn.status === "declined"
                        ? "bg-red-50 text-red-600"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {txn.status === "approved" ? <CheckCircle2 className="w-3 h-3" /> : txn.status === "declined" ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
