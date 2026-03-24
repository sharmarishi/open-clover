'use client'
import {
  StatCard,
  StatCardVariant,
  ChangeType,
  Tag,
  TagColor,
  TagVariant,
  TagSize,
} from "@juspay/blend-design-system";

type StatCardsProps = {
  todayRevenue: number;
  activeOrdersCount: number;
  tablesOccupied: number;
  tablesTotal: number;
  lowStockItems: number;
};

export function DashboardStatCards({
  todayRevenue,
  activeOrdersCount,
  tablesOccupied,
  tablesTotal,
  lowStockItems,
}: StatCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="Today's Revenue"
        value={`$${todayRevenue.toLocaleString()}`}
        variant={StatCardVariant.NUMBER}
        change={{ value: 12, valueType: ChangeType.INCREASE }}
        subtitle="+12% vs yesterday"
      />
      <StatCard
        title="Active Orders"
        value={activeOrdersCount}
        variant={StatCardVariant.NUMBER}
        subtitle="Across dine-in + delivery"
      />
      <StatCard
        title="Tables Occupied"
        value={`${tablesOccupied} / ${tablesTotal}`}
        variant={StatCardVariant.NUMBER}
        subtitle="2 tables need attention"
      />
      <StatCard
        title="Low Stock Alerts"
        value={lowStockItems}
        variant={StatCardVariant.NUMBER}
        subtitle="1 item out of stock"
        change={{ value: lowStockItems, valueType: ChangeType.INCREASE }}
      />
    </div>
  );
}

type BlendTagProps = {
  text: string;
  color: TagColor;
};

export function BlendTag({ text, color }: BlendTagProps) {
  return (
    <Tag
      text={text}
      variant={TagVariant.SUBTLE}
      color={color}
      size={TagSize.XS}
    />
  );
}

export { TagColor, TagVariant, TagSize };

type TransactionTagProps = {
  status: string;
};

export function TransactionStatusTag({ status }: TransactionTagProps) {
  const color =
    status === "approved"
      ? TagColor.SUCCESS
      : status === "declined"
      ? TagColor.ERROR
      : TagColor.WARNING;

  return (
    <Tag
      text={status}
      variant={TagVariant.SUBTLE}
      color={color}
      size={TagSize.XS}
    />
  );
}
