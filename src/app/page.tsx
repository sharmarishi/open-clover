import Link from "next/link";
import ClientStatCards from "@/components/ClientStatCards";
import {
  ClipboardList,
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
  AlertTriangle,
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
    badge: "4 devices",
    badgeClass: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Payments",
    description: "Cards, NFC, Apple Pay, QR",
    href: "/payments",
    icon: CreditCard,
    badge: "All methods",
    badgeClass: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Orders",
    description: "Table map, KDS, bill split",
    href: "/orders",
    icon: ClipboardList,
    badge: `${activeOrders.length} active`,
    badgeClass: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Menu",
    description: "Real-time editor, modifiers",
    href: "/menu",
    icon: UtensilsCrossed,
    badge: "12 items",
    badgeClass: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Delivery",
    description: "DoorDash, Uber Eats, Stream",
    href: "/delivery",
    icon: Truck,
    badge: "3 active",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "ERP & Accounting",
    description: "QuickBooks, Xero, Payroll",
    href: "/erp",
    icon: Calculator,
    badge: "Synced",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Inventory",
    description: "Stock tracking, auto-deduct",
    href: "/inventory",
    icon: Package,
    badge: `${lowStockItems} alerts`,
    badgeClass: "bg-amber-50 text-amber-700",
  },
  {
    title: "Analytics",
    description: "Sales trends, peak hours",
    href: "/analytics",
    icon: BarChart2,
    badge: "Live",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
];

const recentActivity = [
  { icon: CheckCircle2, color: "text-emerald-500", text: "Order ORD-1004 paid — $67.25 via Apple Pay", time: "2 min ago" },
  { icon: Clock, color: "text-amber-500", text: "Table 4 needs attention — Server: Maria", time: "8 min ago" },
  { icon: AlertTriangle, color: "text-red-500", text: "Avocados out of stock — Avocado Toast affected", time: "12 min ago" },
  { icon: CheckCircle2, color: "text-emerald-500", text: "DoorDash order #DD-8821 received — $38.50", time: "15 min ago" },
  { icon: TrendingUp, color: "text-indigo-500", text: "Daily revenue milestone: $3,200 hit at 7:00 PM", time: "18 min ago" },
  { icon: CheckCircle2, color: "text-emerald-500", text: "QuickBooks sync completed — 847 records", time: "25 min ago" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Clover POS — All systems operational</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live — Tuesday, March 24</span>
        </div>
      </div>

      {/* Stats Cards — Blend StatCard (client-only, falls back to native cards during SSR) */}
      <ClientStatCards
        todayRevenue={todayRevenue}
        activeOrdersCount={activeOrders.length}
        tablesOccupied={tablesOccupied}
        tablesTotal={tables.length}
        lowStockItems={lowStockItems}
      />

      {/* Feature Grid */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Capability Overview</h2>
        <div className="grid grid-cols-4 gap-3">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${card.badgeClass}`}>
                    {card.badge}
                  </span>
                </div>
                <div className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {card.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{card.description}</div>
                <div className="mt-3 flex items-center text-xs text-gray-400 group-hover:text-indigo-500 transition-colors">
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
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 leading-snug">{item.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "View Active Orders", href: "/orders" },
              { label: "Open Table Map", href: "/orders" },
              { label: "Edit Menu", href: "/menu" },
              { label: "Check Inventory", href: "/inventory" },
              { label: "View Analytics", href: "/analytics" },
              { label: "Delivery Status", href: "/delivery" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
              >
                <span>{label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Recent Transactions</h2>
          <Link href="/payments" className="text-xs text-indigo-600 hover:text-indigo-500">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Transaction ID</th>
                <th className="text-left pb-2 font-medium">Method</th>
                <th className="text-left pb-2 font-medium">Time</th>
                <th className="text-right pb-2 font-medium">Amount</th>
                <th className="text-right pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTransactions.slice(0, 5).map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 font-mono text-xs text-gray-500">{txn.id}</td>
                  <td className="py-2.5 text-gray-700">{txn.cardBrand ?? txn.method}</td>
                  <td className="py-2.5 text-gray-500">{txn.time}</td>
                  <td className="py-2.5 text-right font-medium text-gray-900">${txn.amount.toFixed(2)}</td>
                  <td className="py-2.5 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      txn.status === "approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : txn.status === "declined"
                        ? "bg-red-50 text-red-600"
                        : "bg-amber-50 text-amber-700"
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
