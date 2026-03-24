import {
  Truck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Percent,
  Package,
} from "lucide-react";
import { deliveryPlatforms } from "@/lib/mock-data";

const recentDeliveryOrders = [
  { id: "DD-8821", platform: "DoorDash", item: "Wagyu Burger + Truffle Fries", total: 38.50, status: "delivering", time: "2 min ago" },
  { id: "UE-4412", platform: "Uber Eats", item: "2× Grilled Salmon, Caesar Salad", total: 68.50, status: "preparing", time: "5 min ago" },
  { id: "SM-0091", platform: "Stream", item: "Ribeye Steak + House Red", total: 46.00, status: "confirmed", time: "8 min ago" },
  { id: "DD-8820", platform: "DoorDash", item: "Tiramisu, Truffle Fries ×2", total: 29.50, status: "delivered", time: "14 min ago" },
  { id: "UE-4411", platform: "Uber Eats", item: "Avocado Toast + Coffee", total: 21.00, status: "delivered", time: "22 min ago" },
  { id: "DD-8819", platform: "DoorDash", item: "3× Wagyu Burger", total: 66.00, status: "delivered", time: "35 min ago" },
];

const platformColors: Record<string, { bg: string; text: string; border: string; logoBg: string }> = {
  doordash: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", logoBg: "bg-red-500" },
  ubereats: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", logoBg: "bg-emerald-600" },
  stream: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", logoBg: "bg-blue-600" },
  deliverect: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", logoBg: "bg-gray-500" },
};

function StatusIcon({ status }: { status: string }) {
  if (status === "connected" || status === "synced" || status === "delivered") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (status === "error" || status === "disconnected") return <XCircle className="w-4 h-4 text-red-500" />;
  if (status === "preparing" || status === "confirmed") return <Clock className="w-4 h-4 text-amber-500" />;
  if (status === "delivering") return <Truck className="w-4 h-4 text-blue-500" />;
  return <AlertCircle className="w-4 h-4 text-gray-400" />;
}

const deliveryStatusConfig: Record<string, string> = {
  confirmed: "bg-blue-50 text-blue-700",
  preparing: "bg-amber-50 text-amber-700",
  delivering: "bg-indigo-50 text-indigo-700",
  delivered: "bg-emerald-50 text-emerald-700",
};

export default function DeliveryPage() {
  const totalTodayOrders = deliveryPlatforms.reduce((s, p) => s + p.todayOrders, 0);
  const totalTodayRevenue = deliveryPlatforms.reduce((s, p) => s + p.todayRevenue, 0);
  const activeOrdersAll = deliveryPlatforms.reduce((s, p) => s + p.activeOrders, 0);
  const connectedCount = deliveryPlatforms.filter((p) => p.status === "connected").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Delivery</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage delivery platform integrations</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" /> Sync All
          </button>
        </div>
      </div>

      {/* Error Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
        <div className="text-sm text-red-700">
          <span className="font-semibold">Deliverect / Chowly connection error.</span>{" "}
          Last sync was 45 minutes ago. Check API credentials or contact support.
        </div>
        <button className="ml-auto text-xs text-red-600 hover:text-red-500 border border-red-200 px-3 py-1.5 rounded-lg whitespace-nowrap bg-white">
          Reconnect
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Today&apos;s Orders</div>
          <div className="text-2xl font-bold text-gray-900">{totalTodayOrders}</div>
          <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +18% vs yesterday</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Today&apos;s Revenue</div>
          <div className="text-2xl font-bold text-gray-900">${totalTodayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-gray-400 mt-1">After commissions</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Active Now</div>
          <div className="text-2xl font-bold text-amber-600">{activeOrdersAll}</div>
          <div className="text-xs text-gray-400 mt-1">In-transit orders</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Platforms</div>
          <div className="text-2xl font-bold text-gray-900">{connectedCount}<span className="text-gray-400 text-base">/{deliveryPlatforms.length}</span></div>
          <div className="text-xs text-gray-400 mt-1">Connected</div>
        </div>
      </div>

      {/* Platform Cards */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Delivery Platforms</h2>
        <div className="grid grid-cols-2 gap-4">
          {deliveryPlatforms.map((platform) => {
            const colors = platformColors[platform.id] ?? platformColors.stream;
            return (
              <div key={platform.id} className={`bg-white border rounded-xl p-5 ${platform.status === "error" ? "border-red-200" : "border-gray-200"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colors.logoBg} flex items-center justify-center text-white font-bold text-xs`}>
                      {platform.logo}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{platform.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <StatusIcon status={platform.status} />
                        <span className={platform.status === "connected" ? "text-emerald-600" : "text-red-600"}>
                          {platform.status === "connected" ? "Connected" : "Connection Error"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Sync: {platform.lastSync}</div>
                </div>

                {platform.status === "connected" ? (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1"><Package className="w-3 h-3" /> Today&apos;s Orders</div>
                        <div className="text-lg font-bold text-gray-900">{platform.todayOrders}</div>
                        {platform.activeOrders > 0 && (
                          <div className="text-xs text-amber-600">{platform.activeOrders} active</div>
                        )}
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Revenue</div>
                        <div className="text-lg font-bold text-gray-900">${platform.todayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" /> Avg prep: <span className="text-gray-900">{platform.avgPrepTime} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Percent className="w-3 h-3" /> Commission: <span className="text-amber-600">{platform.commission}%</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    Unable to reach Deliverect API. Last successful sync was 45 minutes ago. {platform.activeOrders} orders may be affected.
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                    platform.status === "connected"
                      ? "border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
                      : "border-red-200 text-red-600 hover:bg-red-50"
                  }`}>
                    {platform.status === "connected" ? "Settings" : "Reconnect"}
                  </button>
                  <button className="flex-1 text-xs py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors">
                    View Orders
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Delivery Orders */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Delivery Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-3 font-medium">Order ID</th>
                <th className="text-left pb-3 font-medium">Platform</th>
                <th className="text-left pb-3 font-medium">Items</th>
                <th className="text-right pb-3 font-medium">Total</th>
                <th className="text-left pb-3 font-medium pl-4">Status</th>
                <th className="text-right pb-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentDeliveryOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-mono text-xs text-gray-500">{order.id}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.platform === "DoorDash" ? "bg-red-50 text-red-600" :
                      order.platform === "Uber Eats" ? "bg-emerald-50 text-emerald-700" :
                      "bg-blue-50 text-blue-700"
                    }`}>{order.platform}</span>
                  </td>
                  <td className="py-3 text-gray-700 max-w-xs truncate">{order.item}</td>
                  <td className="py-3 text-right font-semibold text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="py-3 pl-4">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${deliveryStatusConfig[order.status] ?? ""}`}>
                      <StatusIcon status={order.status} />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gray-400 text-xs">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
