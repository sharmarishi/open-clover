"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  Package,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  ToggleRight,
  ToggleLeft,
  Search,
  TrendingDown,
  Plus,
} from "lucide-react";
import { inventoryItems, type InventoryItem } from "@/lib/mock-data";

const categories = ["All", "Proteins", "Seafood", "Produce", "Dairy", "Pantry", "Bakery", "Beverages"];

function StockBar({ item }: { item: InventoryItem }) {
  const pct = Math.min((item.currentStock / item.maxStock) * 100, 100);
  const isOut = item.currentStock === 0;
  const isLow = item.currentStock > 0 && item.currentStock <= item.minStock;

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className={isOut ? "text-red-400 font-medium" : isLow ? "text-amber-400" : "text-gray-300"}>
          {item.currentStock} {item.unit}
        </span>
        <span className="text-gray-500">max {item.maxStock}</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isOut ? "bg-red-500" : isLow ? "bg-amber-500" : "bg-emerald-500"
          }`}
          style={{ width: `${isOut ? 100 : pct}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ item }: { item: InventoryItem }) {
  if (item.currentStock === 0) {
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">
        <AlertCircle className="w-2.5 h-2.5" /> Out of Stock
      </span>
    );
  }
  if (item.currentStock <= item.minStock) {
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
        <AlertTriangle className="w-2.5 h-2.5" /> Low Stock
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
      <CheckCircle2 className="w-2.5 h-2.5" /> In Stock
    </span>
  );
}

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState(inventoryItems);

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || item.category === category;
    return matchSearch && matchCat;
  });

  const outOfStock = items.filter((i) => i.currentStock === 0);
  const lowStock = items.filter((i) => i.currentStock > 0 && i.currentStock <= i.minStock);

  const toggleAutoDeduct = (id: string) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, autoDeduct: !i.autoDeduct } : i));
  };

  const totalValue = items.reduce((s, i) => s + i.currentStock * i.costPerUnit, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="text-gray-400 text-sm mt-0.5">Ingredient tracking with auto-deduct from orders</p>
        </div>
        <button className="flex items-center gap-2 text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Alert Banners */}
      {outOfStock.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-300">{outOfStock.length} item{outOfStock.length > 1 ? "s" : ""} out of stock</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {outOfStock.map((i) => (
              <span key={i.id} className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                {i.name} — affects: {i.linkedMenuItems.join(", ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {lowStock.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">{lowStock.length} item{lowStock.length > 1 ? "s" : ""} running low — reorder needed</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map((i) => (
              <span key={i.id} className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                {i.name}: {i.currentStock}/{i.minStock} min
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Items</div>
          <div className="text-2xl font-bold text-white">{items.length}</div>
          <div className="text-xs text-gray-400 mt-1">Tracked ingredients</div>
        </div>
        <div className="bg-gray-900 border border-red-500/20 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Out of Stock</div>
          <div className="text-2xl font-bold text-red-400">{outOfStock.length}</div>
          <div className="text-xs text-gray-400 mt-1">Menu items affected</div>
        </div>
        <div className="bg-gray-900 border border-amber-500/20 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Low Stock</div>
          <div className="text-2xl font-bold text-amber-400">{lowStock.length}</div>
          <div className="text-xs text-gray-400 mt-1">Below minimum level</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Inventory Value</div>
          <div className="text-2xl font-bold text-white">${totalValue.toFixed(2)}</div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> -4.2% from yesterday</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients..."
            className="bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 w-64"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={clsx(
                "px-3 py-1.5 text-xs rounded-lg border transition-colors",
                category === cat
                  ? "bg-emerald-700 border-emerald-600 text-white"
                  : "bg-gray-900 border-gray-700 text-gray-400 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-800">
            <tr className="text-xs text-gray-500">
              <th className="text-left px-5 py-3 font-medium">Item</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium w-48">Stock Level</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Auto-Deduct</th>
              <th className="text-left px-4 py-3 font-medium">Linked Items</th>
              <th className="text-right px-5 py-3 font-medium">Cost/Unit</th>
              <th className="text-right px-5 py-3 font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {filtered.map((item) => (
              <tr key={item.id} className={clsx(
                "hover:bg-gray-800/40 transition-colors",
                item.currentStock === 0 && "bg-red-500/5"
              )}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Package className={`w-4 h-4 flex-shrink-0 ${
                      item.currentStock === 0 ? "text-red-400" :
                      item.currentStock <= item.minStock ? "text-amber-400" :
                      "text-emerald-400"
                    }`} />
                    <span className="font-medium text-white">{item.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-400">{item.category}</td>
                <td className="px-4 py-3 w-48">
                  <StockBar item={item} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge item={item} />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleAutoDeduct(item.id)}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    {item.autoDeduct ? (
                      <><ToggleRight className="w-5 h-5 text-emerald-400" /><span className="text-emerald-400">On</span></>
                    ) : (
                      <><ToggleLeft className="w-5 h-5 text-gray-500" /><span className="text-gray-500">Off</span></>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {item.linkedMenuItems.map((mi) => (
                      <span key={mi} className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">{mi}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3 text-right text-gray-300">${item.costPerUnit.toFixed(2)}</td>
                <td className="px-5 py-3 text-right text-xs text-gray-500">{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
