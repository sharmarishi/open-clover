"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  Users,
  Clock,
  DollarSign,
  SplitSquareHorizontal,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Flame,
  ChevronRight,
} from "lucide-react";
import { tables, activeOrders, type TableStatus } from "@/lib/mock-data";

type ViewMode = "table-map" | "order-list" | "kds";

function TableCard({ table, onClick, selected }: { table: (typeof tables)[0]; onClick: () => void; selected: boolean }) {
  const statusConfig: Record<TableStatus, { bg: string; border: string; badge: string; dot: string }> = {
    available: { bg: "bg-gray-900", border: "border-gray-700", badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
    occupied: { bg: "bg-gray-900", border: "border-violet-500/40", badge: "bg-violet-500/15 text-violet-400", dot: "bg-violet-400" },
    "needs-attention": { bg: "bg-gray-900", border: "border-amber-500/50", badge: "bg-amber-500/15 text-amber-400", dot: "bg-amber-400 animate-pulse" },
    reserved: { bg: "bg-gray-900", border: "border-blue-500/30", badge: "bg-blue-500/15 text-blue-400", dot: "bg-blue-400" },
  };
  const cfg = statusConfig[table.status];

  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-xl p-4 border-2 transition-all text-left w-full",
        cfg.bg,
        selected ? "border-violet-500 ring-2 ring-violet-500/30" : cfg.border,
        "hover:border-violet-400 hover:shadow-lg"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-bold text-white text-sm">{table.name}</div>
          <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <Users className="w-3 h-3" /> {table.seats} seats
          </div>
        </div>
        <span className={clsx("text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full flex items-center gap-1", cfg.badge)}>
          <span className={clsx("w-1.5 h-1.5 rounded-full", cfg.dot)} />
          {table.status.replace("-", " ")}
        </span>
      </div>

      {table.status === "occupied" || table.status === "needs-attention" ? (
        <div className="space-y-1">
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {table.timeSeated}
          </div>
          {table.server && <div className="text-xs text-gray-400">Server: {table.server}</div>}
          {table.currentOrderTotal && (
            <div className="text-xs text-white font-medium flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> ${table.currentOrderTotal.toFixed(2)}
            </div>
          )}
        </div>
      ) : (
        <div className="text-xs text-gray-600 italic">
          {table.status === "reserved" ? "Reservation at 8:30 PM" : "Ready to seat"}
        </div>
      )}
    </button>
  );
}

export default function OrdersPage() {
  const [view, setView] = useState<ViewMode>("table-map");
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [splitCount, setSplitCount] = useState(2);

  const selectedTable = tables.find((t) => t.id === selectedTableId);
  const selectedOrder = activeOrders.find((o) => o.tableId === selectedTableId);

  const tablesOccupied = tables.filter((t) => t.status === "occupied" || t.status === "needs-attention").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-gray-400 text-sm mt-0.5">{tablesOccupied} tables active — {activeOrders.length} open orders</p>
        </div>
        <div className="flex gap-2">
          {(["table-map", "order-list", "kds"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={clsx(
                "px-3 py-2 text-sm rounded-lg border transition-colors",
                view === v
                  ? "bg-violet-600 border-violet-600 text-white"
                  : "bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
              )}
            >
              {v === "table-map" ? "Table Map" : v === "order-list" ? "Order List" : "KDS View"}
            </button>
          ))}
        </div>
      </div>

      {/* Table Map View */}
      {view === "table-map" && (
        <div className="grid grid-cols-3 gap-4">
          {/* Table Grid */}
          <div className="col-span-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Dining Room</h2>
            <div className="grid grid-cols-4 gap-3">
              {tables.map((table) => (
                <TableCard
                  key={table.id}
                  table={table}
                  onClick={() => setSelectedTableId(table.id === selectedTableId ? null : table.id)}
                  selected={table.id === selectedTableId}
                />
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="space-y-4">
            {selectedTable ? (
              <>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <h3 className="font-bold text-white text-sm mb-1">{selectedTable.name}</h3>
                  <div className="text-xs text-gray-400">{selectedTable.seats} seats · {selectedTable.status}</div>
                  {selectedTable.server && (
                    <div className="text-xs text-gray-400 mt-1">Server: <span className="text-white">{selectedTable.server}</span></div>
                  )}
                  {selectedTable.timeSeated && (
                    <div className="text-xs text-gray-400 mt-1">Seated: <span className="text-white">{selectedTable.timeSeated}</span></div>
                  )}
                </div>

                {selectedOrder && (
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white text-sm">Order {selectedOrder.id}</h3>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Open</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white text-xs font-medium">{item.qty}× {item.name}</div>
                            {(item.modifiers?.length ?? 0) > 0 && (
                              <div className="text-xs text-gray-500 mt-0.5">{item.modifiers?.join(", ")}</div>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xs text-white">${(item.qty * item.price).toFixed(2)}</div>
                            <span className={clsx("text-[10px] px-1.5 py-0.5 rounded-full", {
                              "bg-gray-700 text-gray-400": item.status === "pending",
                              "bg-amber-500/15 text-amber-400": item.status === "preparing",
                              "bg-emerald-500/15 text-emerald-400": item.status === "ready",
                              "bg-blue-500/15 text-blue-400": item.status === "delivered",
                            })}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-800 pt-3 flex justify-between text-sm font-semibold">
                      <span className="text-gray-400">Total</span>
                      <span className="text-white">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Bill Split */}
                {selectedOrder && (
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <SplitSquareHorizontal className="w-4 h-4 text-violet-400" />
                      <h3 className="font-semibold text-white text-sm">Bill Split</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <button onClick={() => setSplitCount(Math.max(2, splitCount - 1))} className="w-7 h-7 rounded-lg bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700">−</button>
                      <span className="text-white font-bold w-6 text-center">{splitCount}</span>
                      <button onClick={() => setSplitCount(Math.min(8, splitCount + 1))} className="w-7 h-7 rounded-lg bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700">+</button>
                      <span className="text-gray-400 text-xs">ways</span>
                    </div>
                    <div className="text-sm text-emerald-400 font-semibold">
                      ${(selectedOrder.total / splitCount).toFixed(2)} per person
                    </div>
                    <button className="mt-3 w-full bg-violet-600 hover:bg-violet-700 text-white text-sm py-2 rounded-lg transition-colors">
                      Process Split Payment
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gray-900 border border-dashed border-gray-700 rounded-xl p-8 text-center">
                <ChevronRight className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Select a table to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order List View */}
      {view === "order-list" && (
        <div className="space-y-4">
          {activeOrders.map((order) => (
            <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="font-bold text-white">{order.tableName}</div>
                  <span className="text-xs font-mono text-gray-400">{order.id}</span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Open</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {order.createdAt}</span>
                  <span>Server: <span className="text-white">{order.server}</span></span>
                  <span className="text-white font-bold text-base">${order.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-800/50 rounded-lg px-3 py-2">
                    <div>
                      <div className="text-sm text-white">{item.qty}× {item.name}</div>
                      {(item.modifiers?.length ?? 0) > 0 && <div className="text-xs text-gray-500">{item.modifiers?.join(", ")}</div>}
                    </div>
                    <span className={clsx("text-xs px-2 py-0.5 rounded-full", {
                      "bg-gray-700 text-gray-400": item.status === "pending",
                      "bg-amber-500/15 text-amber-400": item.status === "preparing",
                      "bg-emerald-500/15 text-emerald-400": item.status === "ready",
                      "bg-blue-500/15 text-blue-400": item.status === "delivered",
                    })}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* KDS View */}
      {view === "kds" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-violet-400" />
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Kitchen Display System — Hot Line</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-gray-950 border-2 border-amber-500/40 rounded-xl overflow-hidden">
                <div className="bg-amber-500/15 px-4 py-2.5 flex items-center justify-between border-b border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-amber-400 text-sm">{order.tableName}</span>
                  </div>
                  <span className="text-xs text-amber-300 font-mono">{order.createdAt}</span>
                </div>
                <div className="p-4 space-y-3">
                  {order.items.filter((i) => i.status === "preparing" || i.status === "pending").map((item, i) => (
                    <div key={i} className={clsx("flex items-start justify-between gap-2 p-3 rounded-lg", {
                      "bg-amber-500/10 border border-amber-500/20": item.status === "preparing",
                      "bg-gray-800/60": item.status === "pending",
                    })}>
                      <div>
                        <div className="font-bold text-white text-sm">{item.qty}× {item.name}</div>
                        {(item.modifiers?.length ?? 0) > 0 && (
                          <div className="text-xs text-amber-300 mt-0.5">{item.modifiers?.join(" · ")}</div>
                        )}
                      </div>
                      <button className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-lg hover:bg-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </button>
                    </div>
                  ))}
                  {order.items.filter((i) => i.status === "preparing" || i.status === "pending").length === 0 && (
                    <div className="text-center text-emerald-400 text-sm py-4 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> All items complete
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      {view === "table-map" && (
        <div className="flex items-center gap-6 text-xs text-gray-400">
          {[
            { color: "bg-emerald-400", label: "Available" },
            { color: "bg-violet-400", label: "Occupied" },
            { color: "bg-amber-400", label: "Needs Attention" },
            { color: "bg-blue-400", label: "Reserved" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
              {label}
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-4">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            {tables.filter((t) => t.status === "needs-attention").length} tables need server attention
          </div>
        </div>
      )}
    </div>
  );
}
