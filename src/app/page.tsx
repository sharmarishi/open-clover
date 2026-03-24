import Link from "next/link";
import {
  DollarSign,
  ClipboardList,
  Table2,
  AlertTriangle,
  Monitor,
  CreditCard,
  UtensilsCrossed,
  Truck,
  Calculator,
  Package,
  BarChart2,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { tables, activeOrders, inventoryItems, recentTransactions, salesData } from "@/lib/mock-data";

const todayRevenue = salesData[salesData.length - 1]?.revenue ?? 0;
const tablesOccupied = tables.filter((t) => t.status === "occupied").length;
const lowStockItems = inventoryItems.filter((i) => i.currentStock <= i.minStock).length;

const featureCards = [
  {
    title: "Hardware",
    description: "Station Duo, Mini, Flex & KDS",
    href: "/hardware",
    icon: Monitor,
    color: "from-violet-600 to-violet-700",
    badge: "4 devices",
    badgeColor: "bg-violet-500/20 text-violet-300",
  },
  {
    title: "Payments",
    description: "Cards, NFC, Apple Pay, QR",
    href: "/payments",
    icon: CreditCard,
    color: "from-violet-600 to-violet-700",
    badge: "All methods",
    badgeColor: "bg-violet-500/20 text-violet-300",
  },
  {
    title: "Orders",
    description: "Table map, KDS, bill split",
    href: "/orders",
    icon: ClipboardList,
    color: "from-violet-600 to-violet-700",
    badge: `${activeOrders.length} active`,
    badgeColor: "bg-violet-500/20 text-violet-300",
  },
  {
    title: "Menu",
    description: "Real-time editor, modifiers",
    href: "/menu",
    icon: UtensilsCrossed,
    color: "from-violet-600 to-violet-700",
    badge: "12 items",
    badgeColor: "bg-violet-500/20 text-violet-300",
  },
  {
    title: "Delivery",
    description: "DoorDash, Uber Eats, Stream",
    href: "/delivery",
    icon: Truck,
    color: "from-emerald-600 to-emerald-700",
    badge: "3 active",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
  },
  {
    title: "ERP & Accounting",
    description: "QuickBooks, Xero, Payroll",
    href: "/erp",
    icon: Calculator,
    color: "from-emerald-600 to-emerald-700",
    badge: "Synced",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
  },
  {
    title: "Inventory",
    description: "Stock tracking, auto-deduct",
    href: "/inventory",
    icon: Package,
    color: "from-amber-600 to-amber-700",
    badge: `${lowStockItems} alerts`,
    badgeColor: "bg-amber-500/20 text-amber-300",
  },
  {
    title: "Analytics",
    description: "Sales trends, peak hours",
    href: "/analytics",
    icon: BarChart2,
    color: "from-emerald-600 to-emerald-700",
    badge: "Live",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
  },
];

const recentActivity = [
  { icon: CheckCircle2, color: "text-emerald-400", text: "Order ORD-1004 paid — $67.25 via Apple Pay", time: "2 min ago" },
  { icon: Clock, color: "text-amber-400", text: "Table 4 needs attention — Server: Maria", time: "8 min ago" },
  { icon: AlertTriangle, color: "text-red-400", text: "Avocados out of stock — Avocado Toast affected", time: "12 min ago" },
  { icon: CheckCircle2, color: "text-emerald-400", text: "DoorDash order #DD-8821 received — $38.50", time: "15 min ago" },
  { icon: TrendingUp, color: "text-violet-400", text: "Daily revenue milestone: $3,200 hit at 7:00 PM", time: "18 min ago" },
  { icon: CheckCircle2, color: "text-emerald-400", text: "QuickBooks sync completed — 847 records", time: "25 min ago" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Restaurant Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">Clover POS — All systems operational</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live — Tuesday, March 24</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Today&apos;s Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">${todayRevenue.toLocaleString()}</div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% vs yesterday
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Active Orders</span>
            <ClipboardList className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white">{activeOrders.length}</div>
          <div className="text-xs text-gray-400 mt-1">Across dine-in + delivery</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Tables Occupied</span>
            <Table2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{tablesOccupied} / {tables.length}</div>
          <div className="text-xs text-amber-400 mt-1">2 tables need attention</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">{lowStockItems}</div>
          <div className="text-xs text-red-400 mt-1">1 item out of stock</div>
        </div>
      </div>

      {/* Feature Grid */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Capability Overview</h2>
        <div className="grid grid-cols-4 gap-3">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-all hover:bg-gray-900/80"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <Icon className="w-4.5 h-4.5 text-white w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <div className="font-semibold text-white text-sm group-hover:text-violet-300 transition-colors">
                  {card.title}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{card.description}</div>
                <div className="mt-3 flex items-center text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                  Open <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Two Columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 leading-snug">{item.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0 mt-0.5">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "View Active Orders", href: "/orders", color: "border-violet-500/30 hover:bg-violet-500/10 hover:border-violet-500/60" },
              { label: "Open Table Map", href: "/orders", color: "border-violet-500/30 hover:bg-violet-500/10 hover:border-violet-500/60" },
              { label: "Edit Menu", href: "/menu", color: "border-violet-500/30 hover:bg-violet-500/10 hover:border-violet-500/60" },
              { label: "Check Inventory", href: "/inventory", color: "border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/60" },
              { label: "View Analytics", href: "/analytics", color: "border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/60" },
              { label: "Delivery Status", href: "/delivery", color: "border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/60" },
            ].map(({ label, href, color }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm text-gray-300 transition-all ${color}`}
              >
                <span>{label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Recent Transactions</h2>
          <Link href="/payments" className="text-xs text-violet-400 hover:text-violet-300">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-800">
                <th className="text-left pb-2 font-medium">Transaction ID</th>
                <th className="text-left pb-2 font-medium">Method</th>
                <th className="text-left pb-2 font-medium">Time</th>
                <th className="text-right pb-2 font-medium">Amount</th>
                <th className="text-right pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentTransactions.slice(0, 5).map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-2.5 font-mono text-xs text-gray-300">{txn.id}</td>
                  <td className="py-2.5 text-gray-300">{txn.cardBrand ?? txn.method}</td>
                  <td className="py-2.5 text-gray-400">{txn.time}</td>
                  <td className="py-2.5 text-right font-medium text-white">${txn.amount.toFixed(2)}</td>
                  <td className="py-2.5 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      txn.status === "approved"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : txn.status === "declined"
                        ? "bg-red-500/15 text-red-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}>
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
