"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  Search,
  Plus,
  Edit2,
  ToggleRight,
  ToggleLeft,
  Tag,
  Globe,
  Sun,
  Moon,
  Coffee,
  AlertCircle,
} from "lucide-react";
import { menuItems, type MenuItem } from "@/lib/mock-data";

const categories = ["All", "Breakfast", "Starters", "Mains", "Sides", "Desserts", "Beverages"];
const dayParts = ["breakfast", "lunch", "dinner"];
const channels = [
  { key: "inStore", label: "In-Store" },
  { key: "doordash", label: "DoorDash" },
  { key: "uberEats", label: "Uber Eats" },
];

function DayPartIcon({ part }: { part: string }) {
  if (part === "breakfast") return <Coffee className="w-3 h-3" />;
  if (part === "lunch") return <Sun className="w-3 h-3" />;
  return <Moon className="w-3 h-3" />;
}

function MenuItemCard({ item, onToggle }: { item: MenuItem; onToggle: (id: string) => void }) {
  const channelCount = Object.values(item.channels).filter(Boolean).length;
  return (
    <div className={clsx(
      "bg-gray-900 border rounded-xl p-4 transition-colors",
      item.available ? "border-gray-800 hover:border-gray-600" : "border-red-500/20 opacity-70"
    )}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm leading-tight">{item.name}</span>
            {!item.available && (
              <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full">
                <AlertCircle className="w-2.5 h-2.5" /> 86&apos;d
              </span>
            )}
          </div>
          <div className="text-xs text-violet-400 mt-0.5">{item.category}</div>
        </div>
        <div className="text-right flex-shrink-0 ml-3">
          <div className="text-sm font-bold text-white">${item.price.toFixed(2)}</div>
          {item.variants && <div className="text-xs text-gray-500">{item.variants.length} sizes</div>}
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">{item.description}</p>

      {/* Day Parts */}
      <div className="flex items-center gap-1.5 mb-2.5">
        {dayParts.map((part) => (
          <span
            key={part}
            className={clsx("flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full", {
              "bg-amber-500/15 text-amber-400": item.dayParts.includes(part) && part === "breakfast",
              "bg-blue-500/15 text-blue-400": item.dayParts.includes(part) && part === "lunch",
              "bg-violet-500/15 text-violet-400": item.dayParts.includes(part) && part === "dinner",
              "bg-gray-800 text-gray-600": !item.dayParts.includes(part),
            })}
          >
            <DayPartIcon part={part} />
            {part}
          </span>
        ))}
      </div>

      {/* Channels */}
      <div className="flex items-center gap-1.5 mb-3">
        <Globe className="w-3 h-3 text-gray-500" />
        {channels.map(({ key, label }) => (
          <span
            key={key}
            className={clsx("text-[10px] px-1.5 py-0.5 rounded-full", {
              "bg-emerald-500/15 text-emerald-400": item.channels[key as keyof MenuItem["channels"]],
              "bg-gray-800 text-gray-600 line-through": !item.channels[key as keyof MenuItem["channels"]],
            })}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Modifiers Preview */}
      {item.modifiers.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          <Tag className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
          {item.modifiers.slice(0, 3).map((mod) => (
            <span key={mod} className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">{mod}</span>
          ))}
          {item.modifiers.length > 3 && (
            <span className="text-[10px] text-gray-600">+{item.modifiers.length - 3} more</span>
          )}
        </div>
      )}

      {/* Popularity */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Popularity</span>
          <span className="text-gray-300">{item.popularity}%</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={clsx("h-full rounded-full", {
              "bg-emerald-500": item.popularity >= 80,
              "bg-amber-500": item.popularity >= 60 && item.popularity < 80,
              "bg-red-500": item.popularity < 60,
            })}
            style={{ width: `${item.popularity}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <button
          onClick={() => onToggle(item.id)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {item.available ? (
            <><ToggleRight className="w-4 h-4 text-emerald-400" /> Available</>
          ) : (
            <><ToggleLeft className="w-4 h-4 text-red-400" /> Unavailable</>
          )}
        </button>
        <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
          <Edit2 className="w-3 h-3" /> Edit
        </button>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState(menuItems);

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || item.category === category;
    return matchSearch && matchCategory;
  });

  const toggleAvailability = (id: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, available: !item.available } : item));
  };

  const unavailableCount = items.filter((i) => !i.available).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Menu Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} items · {unavailableCount} unavailable</p>
        </div>
        <button className="flex items-center gap-2 text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Alerts */}
      {unavailableCount > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <div className="text-sm text-red-300">
            <span className="font-semibold">{unavailableCount} menu item{unavailableCount > 1 ? "s" : ""} currently unavailable (86&apos;d).</span>
            {" "}Update availability or notify delivery platforms.
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
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
                  ? "bg-violet-600 border-violet-600 text-white"
                  : "bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-3">
        {categories.slice(1).map((cat) => {
          const count = items.filter((i) => i.category === cat).length;
          const available = items.filter((i) => i.category === cat && i.available).length;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={clsx(
                "bg-gray-900 border rounded-xl p-3 text-left transition-colors",
                category === cat ? "border-violet-500/40" : "border-gray-800 hover:border-gray-700"
              )}
            >
              <div className="text-lg font-bold text-white">{count}</div>
              <div className="text-xs text-gray-400">{cat}</div>
              <div className="text-xs text-emerald-400 mt-0.5">{available} active</div>
            </button>
          );
        })}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((item) => (
          <MenuItemCard key={item.id} item={item} onToggle={toggleAvailability} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500">
            No menu items match your search.
          </div>
        )}
      </div>
    </div>
  );
}
