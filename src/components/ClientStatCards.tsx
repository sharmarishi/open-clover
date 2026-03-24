'use client'
import { useState, useEffect } from "react";
import {
  DollarSign,
  ClipboardList,
  Table2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

type Props = {
  todayRevenue: number;
  activeOrdersCount: number;
  tablesOccupied: number;
  tablesTotal: number;
  lowStockItems: number;
};

// Fallback native stat cards (used while Blend loads or if Blend fails)
function FallbackStatCards(props: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Today&apos;s Revenue</span>
          <DollarSign className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-bold text-gray-900">${props.todayRevenue.toLocaleString()}</div>
        <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> +12% vs yesterday
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Active Orders</span>
          <ClipboardList className="w-4 h-4 text-indigo-500" />
        </div>
        <div className="text-2xl font-bold text-gray-900">{props.activeOrdersCount}</div>
        <div className="text-xs text-gray-400 mt-1">Across dine-in + delivery</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Tables Occupied</span>
          <Table2 className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-2xl font-bold text-gray-900">{props.tablesOccupied} / {props.tablesTotal}</div>
        <div className="text-xs text-amber-600 mt-1">2 tables need attention</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Low Stock Alerts</span>
          <AlertTriangle className="w-4 h-4 text-red-500" />
        </div>
        <div className="text-2xl font-bold text-gray-900">{props.lowStockItems}</div>
        <div className="text-xs text-red-500 mt-1">1 item out of stock</div>
      </div>
    </div>
  );
}

// Lazily loaded Blend StatCards — only imported after mount (avoids Highcharts SSR crash)
let BlendStatCardsModule: React.ComponentType<Props> | null = null;

export default function ClientStatCards(props: Props) {
  const [BlendCards, setBlendCards] = useState<React.ComponentType<Props> | null>(null);

  useEffect(() => {
    if (BlendStatCardsModule) {
      setBlendCards(() => BlendStatCardsModule);
      return;
    }
    import("@/components/DashboardBlendComponents")
      .then((m) => {
        BlendStatCardsModule = m.DashboardStatCards as React.ComponentType<Props>;
        setBlendCards(() => BlendStatCardsModule);
      })
      .catch(() => {
        // Blend failed to load — stay on fallback
      });
  }, []);

  if (!BlendCards) {
    return <FallbackStatCards {...props} />;
  }

  return <BlendCards {...props} />;
}
