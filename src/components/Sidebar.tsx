"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  Home,
  Monitor,
  CreditCard,
  ClipboardList,
  UtensilsCrossed,
  Truck,
  Calculator,
  Package,
  BarChart2,
  ChevronRight,
} from "lucide-react";

const coreNav = [
  { href: "/hardware", label: "Hardware", icon: Monitor },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
];

const intelNav = [
  { href: "/delivery", label: "Delivery", icon: Truck },
  { href: "/erp", label: "ERP & Accounting", icon: Calculator },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm leading-tight">Clover POS</div>
            <div className="text-xs text-gray-500">Restaurant Portal</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Home */}
        <div>
          <Link
            href="/"
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <span>Dashboard</span>
            {pathname === "/" && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
          </Link>
        </div>

        {/* Core Operations */}
        <div>
          <div className="px-3 mb-2 flex items-center gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500">
              Core Operations
            </span>
          </div>
          <div className="space-y-0.5">
            {coreNav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
                {pathname === href && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
              </Link>
            ))}
          </div>
        </div>

        {/* Integrations & Intelligence */}
        <div>
          <div className="px-3 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600">
              Integrations & Intelligence
            </span>
          </div>
          <div className="space-y-0.5">
            {intelNav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
                {pathname === href && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-gray-500">System Online</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">v2.4.1 — Open Clover</div>
      </div>
    </aside>
  );
}
