// Mock data for Clover POS Restaurant Portal

export type TableStatus = "available" | "occupied" | "needs-attention" | "reserved";

export interface Table {
  id: number;
  name: string;
  seats: number;
  status: TableStatus;
  server?: string;
  timeSeated?: string;
  currentOrderId?: string;
  currentOrderTotal?: number;
}

export const tables: Table[] = [
  { id: 1, name: "Table 1", seats: 2, status: "occupied", server: "Maria", timeSeated: "6:15 PM", currentOrderId: "ORD-1001", currentOrderTotal: 48.5 },
  { id: 2, name: "Table 2", seats: 4, status: "available" },
  { id: 3, name: "Table 3", seats: 4, status: "occupied", server: "James", timeSeated: "6:40 PM", currentOrderId: "ORD-1002", currentOrderTotal: 92.0 },
  { id: 4, name: "Table 4", seats: 6, status: "needs-attention", server: "Maria", timeSeated: "5:55 PM", currentOrderId: "ORD-1003", currentOrderTotal: 134.75 },
  { id: 5, name: "Table 5", seats: 2, status: "reserved" },
  { id: 6, name: "Table 6", seats: 4, status: "occupied", server: "Chen", timeSeated: "7:00 PM", currentOrderId: "ORD-1004", currentOrderTotal: 67.25 },
  { id: 7, name: "Table 7", seats: 8, status: "available" },
  { id: 8, name: "Table 8", seats: 4, status: "occupied", server: "James", timeSeated: "6:50 PM", currentOrderId: "ORD-1005", currentOrderTotal: 55.0 },
  { id: 9, name: "Table 9", seats: 2, status: "available" },
  { id: 10, name: "Table 10", seats: 6, status: "needs-attention", server: "Chen", timeSeated: "6:20 PM", currentOrderId: "ORD-1006", currentOrderTotal: 198.5 },
  { id: 11, name: "Bar 1", seats: 1, status: "occupied", server: "Alex", timeSeated: "7:10 PM", currentOrderId: "ORD-1007", currentOrderTotal: 22.0 },
  { id: 12, name: "Bar 2", seats: 1, status: "occupied", server: "Alex", timeSeated: "7:05 PM", currentOrderId: "ORD-1008", currentOrderTotal: 18.5 },
  { id: 13, name: "Patio 1", seats: 4, status: "available" },
  { id: 14, name: "Patio 2", seats: 4, status: "reserved" },
];

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  modifiers: string[];
  status: "pending" | "preparing" | "ready" | "delivered";
}

export interface Order {
  id: string;
  tableId: number;
  tableName: string;
  server: string;
  items: OrderItem[];
  total: number;
  status: "open" | "closed" | "voided";
  createdAt: string;
  paymentMethod?: string;
}

export const activeOrders: Order[] = [
  {
    id: "ORD-1001",
    tableId: 1,
    tableName: "Table 1",
    server: "Maria",
    items: [
      { name: "Ribeye Steak", qty: 1, price: 32.0, modifiers: ["Medium-rare", "No onions"], status: "preparing" },
      { name: "Caesar Salad", qty: 1, price: 12.5, modifiers: [], status: "delivered" },
      { name: "House Red Wine", qty: 1, price: 14.0, modifiers: [], status: "delivered" },
    ],
    total: 48.5,
    status: "open",
    createdAt: "6:15 PM",
  },
  {
    id: "ORD-1002",
    tableId: 3,
    tableName: "Table 3",
    server: "James",
    items: [
      { name: "Grilled Salmon", qty: 2, price: 28.0, modifiers: ["Extra lemon"], status: "ready" },
      { name: "Truffle Fries", qty: 1, price: 9.0, modifiers: [], status: "ready" },
      { name: "Sparkling Water", qty: 2, price: 4.5, modifiers: [], status: "delivered" },
      { name: "Tiramisu", qty: 1, price: 11.5, modifiers: [], status: "pending" },
    ],
    total: 92.0,
    status: "open",
    createdAt: "6:40 PM",
  },
  {
    id: "ORD-1003",
    tableId: 4,
    tableName: "Table 4",
    server: "Maria",
    items: [
      { name: "Wagyu Burger", qty: 2, price: 22.0, modifiers: ["Well done", "Add bacon"], status: "delivered" },
      { name: "Lobster Bisque", qty: 1, price: 16.75, modifiers: [], status: "delivered" },
      { name: "Craft Beer Flight", qty: 3, price: 18.0, modifiers: [], status: "delivered" },
      { name: "Chocolate Lava Cake", qty: 2, price: 13.0, modifiers: [], status: "preparing" },
    ],
    total: 134.75,
    status: "open",
    createdAt: "5:55 PM",
  },
];

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  modifiers: string[];
  variants?: { name: string; price: number }[];
  available: boolean;
  channels: { inStore: boolean; doordash: boolean; uberEats: boolean };
  dayParts: string[];
  imageUrl?: string;
  popularity: number;
}

export const menuItems: MenuItem[] = [
  {
    id: "MNU-001",
    name: "Ribeye Steak",
    category: "Mains",
    price: 32.0,
    description: "12oz USDA prime ribeye with seasonal vegetables",
    modifiers: ["Rare", "Medium-rare", "Medium", "Well-done", "Add mushrooms", "No onions"],
    variants: [{ name: "8oz", price: 24.0 }, { name: "12oz", price: 32.0 }, { name: "16oz", price: 42.0 }],
    available: true,
    channels: { inStore: true, doordash: false, uberEats: false },
    dayParts: ["lunch", "dinner"],
    popularity: 95,
  },
  {
    id: "MNU-002",
    name: "Grilled Salmon",
    category: "Mains",
    price: 28.0,
    description: "Atlantic salmon with lemon butter sauce and asparagus",
    modifiers: ["Extra lemon", "No butter", "Add capers"],
    available: true,
    channels: { inStore: true, doordash: true, uberEats: true },
    dayParts: ["lunch", "dinner"],
    popularity: 88,
  },
  {
    id: "MNU-003",
    name: "Caesar Salad",
    category: "Starters",
    price: 12.5,
    description: "Romaine, parmesan, croutons, house Caesar dressing",
    modifiers: ["Add chicken", "Add shrimp", "No anchovies", "Extra dressing"],
    available: true,
    channels: { inStore: true, doordash: true, uberEats: true },
    dayParts: ["lunch", "dinner"],
    popularity: 72,
  },
  {
    id: "MNU-004",
    name: "Wagyu Burger",
    category: "Mains",
    price: 22.0,
    description: "Wagyu beef patty with aged cheddar, lettuce, tomato",
    modifiers: ["Rare", "Medium", "Well done", "Add bacon", "Add egg", "No bun"],
    available: true,
    channels: { inStore: true, doordash: true, uberEats: true },
    dayParts: ["lunch", "dinner"],
    popularity: 91,
  },
  {
    id: "MNU-005",
    name: "Lobster Bisque",
    category: "Starters",
    price: 16.75,
    description: "Creamy New England lobster bisque with chives",
    modifiers: ["Extra cream", "Extra lobster chunks"],
    available: true,
    channels: { inStore: true, doordash: false, uberEats: false },
    dayParts: ["lunch", "dinner"],
    popularity: 79,
  },
  {
    id: "MNU-006",
    name: "Truffle Fries",
    category: "Sides",
    price: 9.0,
    description: "Hand-cut fries with truffle oil and parmesan",
    modifiers: ["Extra truffle", "No parmesan", "Add aioli"],
    available: true,
    channels: { inStore: true, doordash: true, uberEats: true },
    dayParts: ["lunch", "dinner"],
    popularity: 84,
  },
  {
    id: "MNU-007",
    name: "Tiramisu",
    category: "Desserts",
    price: 11.5,
    description: "Classic Italian tiramisu with espresso and mascarpone",
    modifiers: ["Extra espresso", "No alcohol"],
    available: true,
    channels: { inStore: true, doordash: true, uberEats: true },
    dayParts: ["lunch", "dinner"],
    popularity: 68,
  },
  {
    id: "MNU-008",
    name: "Avocado Toast",
    category: "Breakfast",
    price: 14.0,
    description: "Smashed avocado on sourdough with poached eggs",
    modifiers: ["Add bacon", "Extra eggs", "No eggs", "Gluten-free bread"],
    available: true,
    channels: { inStore: true, doordash: true, uberEats: false },
    dayParts: ["breakfast"],
    popularity: 76,
  },
  {
    id: "MNU-009",
    name: "Eggs Benedict",
    category: "Breakfast",
    price: 16.0,
    description: "Poached eggs on English muffin with hollandaise",
    modifiers: ["Extra hollandaise", "Smoked salmon instead", "Spinach instead"],
    available: true,
    channels: { inStore: true, doordash: false, uberEats: false },
    dayParts: ["breakfast"],
    popularity: 82,
  },
  {
    id: "MNU-010",
    name: "Craft Beer Flight",
    category: "Beverages",
    price: 18.0,
    description: "4 rotating craft beers from local breweries",
    modifiers: [],
    available: true,
    channels: { inStore: true, doordash: false, uberEats: false },
    dayParts: ["lunch", "dinner"],
    popularity: 65,
  },
  {
    id: "MNU-011",
    name: "House Red Wine",
    category: "Beverages",
    price: 14.0,
    description: "Glass of house Cabernet Sauvignon",
    modifiers: ["By the bottle (+$42)"],
    available: true,
    channels: { inStore: true, doordash: false, uberEats: false },
    dayParts: ["lunch", "dinner"],
    popularity: 70,
  },
  {
    id: "MNU-012",
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 13.0,
    description: "Warm chocolate cake with vanilla ice cream",
    modifiers: ["Extra ice cream", "No ice cream", "Add whipped cream"],
    available: false,
    channels: { inStore: true, doordash: true, uberEats: true },
    dayParts: ["dinner"],
    popularity: 88,
  },
];

// 30 days of sales data
export const salesData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const base = isWeekend ? 4200 : 2800;
  const variance = Math.floor(Math.random() * 800) - 400;
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    revenue: base + variance,
    orders: Math.floor((base + variance) / 42),
    avgOrderValue: 38 + Math.floor(Math.random() * 12),
  };
});

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  autoDeduct: boolean;
  lastUpdated: string;
  linkedMenuItems: string[];
  costPerUnit: number;
}

export const inventoryItems: InventoryItem[] = [
  { id: "INV-001", name: "Ribeye Steak (12oz)", category: "Proteins", unit: "portions", currentStock: 8, minStock: 10, maxStock: 50, autoDeduct: true, lastUpdated: "Today 3:00 PM", linkedMenuItems: ["Ribeye Steak"], costPerUnit: 18.5 },
  { id: "INV-002", name: "Atlantic Salmon", category: "Proteins", unit: "fillets", currentStock: 22, minStock: 10, maxStock: 60, autoDeduct: true, lastUpdated: "Today 3:00 PM", linkedMenuItems: ["Grilled Salmon"], costPerUnit: 12.0 },
  { id: "INV-003", name: "Wagyu Beef Patties", category: "Proteins", unit: "patties", currentStock: 31, minStock: 15, maxStock: 80, autoDeduct: true, lastUpdated: "Today 3:00 PM", linkedMenuItems: ["Wagyu Burger"], costPerUnit: 9.5 },
  { id: "INV-004", name: "Lobster", category: "Seafood", unit: "lbs", currentStock: 4, minStock: 5, maxStock: 20, autoDeduct: true, lastUpdated: "Today 9:00 AM", linkedMenuItems: ["Lobster Bisque"], costPerUnit: 28.0 },
  { id: "INV-005", name: "Truffle Oil", category: "Pantry", unit: "bottles", currentStock: 3, minStock: 2, maxStock: 10, autoDeduct: false, lastUpdated: "Yesterday", linkedMenuItems: ["Truffle Fries"], costPerUnit: 22.0 },
  { id: "INV-006", name: "Avocados", category: "Produce", unit: "units", currentStock: 0, minStock: 12, maxStock: 48, autoDeduct: true, lastUpdated: "Today 8:00 AM", linkedMenuItems: ["Avocado Toast"], costPerUnit: 1.2 },
  { id: "INV-007", name: "Romaine Lettuce", category: "Produce", unit: "heads", currentStock: 14, minStock: 8, maxStock: 40, autoDeduct: true, lastUpdated: "Today 3:00 PM", linkedMenuItems: ["Caesar Salad"], costPerUnit: 2.5 },
  { id: "INV-008", name: "Parmesan Cheese", category: "Dairy", unit: "lbs", currentStock: 6, minStock: 4, maxStock: 20, autoDeduct: false, lastUpdated: "Today 3:00 PM", linkedMenuItems: ["Caesar Salad", "Truffle Fries"], costPerUnit: 8.0 },
  { id: "INV-009", name: "Heavy Cream", category: "Dairy", unit: "quarts", currentStock: 2, minStock: 3, maxStock: 12, autoDeduct: true, lastUpdated: "Today 3:00 PM", linkedMenuItems: ["Lobster Bisque"], costPerUnit: 4.5 },
  { id: "INV-010", name: "Sourdough Bread", category: "Bakery", unit: "loaves", currentStock: 5, minStock: 4, maxStock: 20, autoDeduct: true, lastUpdated: "Today 7:00 AM", linkedMenuItems: ["Avocado Toast"], costPerUnit: 6.0 },
  { id: "INV-011", name: "Dark Chocolate", category: "Pantry", unit: "lbs", currentStock: 4, minStock: 3, maxStock: 15, autoDeduct: true, lastUpdated: "Yesterday", linkedMenuItems: ["Chocolate Lava Cake"], costPerUnit: 12.0 },
  { id: "INV-012", name: "Espresso Beans", category: "Beverages", unit: "lbs", currentStock: 8, minStock: 5, maxStock: 25, autoDeduct: false, lastUpdated: "Yesterday", linkedMenuItems: ["Tiramisu"], costPerUnit: 15.0 },
];

export interface Transaction {
  id: string;
  amount: number;
  method: "card" | "nfc" | "apple_pay" | "google_pay" | "qr" | "cash";
  status: "approved" | "declined" | "pending";
  time: string;
  tableId?: number;
  last4?: string;
  cardBrand?: string;
}

export const recentTransactions: Transaction[] = [
  { id: "TXN-9841", amount: 87.50, method: "apple_pay", status: "approved", time: "7:12 PM", tableId: 6, cardBrand: "Apple Pay" },
  { id: "TXN-9840", amount: 124.00, method: "card", status: "approved", time: "7:08 PM", tableId: 8, last4: "4242", cardBrand: "Visa" },
  { id: "TXN-9839", amount: 42.25, method: "nfc", status: "approved", time: "6:55 PM", tableId: 2, last4: "8819", cardBrand: "Mastercard" },
  { id: "TXN-9838", amount: 218.75, method: "card", status: "approved", time: "6:48 PM", tableId: 7, last4: "1337", cardBrand: "Amex" },
  { id: "TXN-9837", amount: 35.00, method: "qr", status: "approved", time: "6:40 PM", tableId: 11, cardBrand: "QR Pay" },
  { id: "TXN-9836", amount: 67.50, method: "google_pay", status: "approved", time: "6:32 PM", tableId: 3, cardBrand: "Google Pay" },
  { id: "TXN-9835", amount: 12.00, method: "card", status: "declined", time: "6:28 PM", last4: "0000", cardBrand: "Visa" },
  { id: "TXN-9834", amount: 94.25, method: "card", status: "approved", time: "6:20 PM", tableId: 4, last4: "5555", cardBrand: "Visa" },
];

export interface DeliveryPlatform {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "disconnected" | "error";
  todayOrders: number;
  todayRevenue: number;
  avgPrepTime: number;
  activeOrders: number;
  commission: number;
  lastSync: string;
}

export const deliveryPlatforms: DeliveryPlatform[] = [
  { id: "doordash", name: "DoorDash Drive", logo: "DD", status: "connected", todayOrders: 24, todayRevenue: 892.50, avgPrepTime: 22, activeOrders: 3, commission: 15, lastSync: "2 min ago" },
  { id: "ubereats", name: "Uber Eats", logo: "UE", status: "connected", todayOrders: 18, todayRevenue: 674.00, avgPrepTime: 19, activeOrders: 2, commission: 30, lastSync: "5 min ago" },
  { id: "stream", name: "Stream Middleware", logo: "SM", status: "connected", todayOrders: 8, todayRevenue: 312.25, avgPrepTime: 25, activeOrders: 1, commission: 5, lastSync: "1 min ago" },
  { id: "deliverect", name: "Deliverect / Chowly", logo: "DC", status: "error", todayOrders: 0, todayRevenue: 0, avgPrepTime: 0, activeOrders: 0, commission: 8, lastSync: "45 min ago" },
];

export interface ErpConnection {
  id: string;
  name: string;
  type: "accounting" | "payroll" | "api";
  status: "synced" | "syncing" | "error" | "disconnected";
  lastSync: string;
  recordsSync: number;
  logo: string;
}

export const erpConnections: ErpConnection[] = [
  { id: "qbo", name: "QuickBooks Online", type: "accounting", status: "synced", lastSync: "Today 4:00 PM", recordsSync: 847, logo: "QB" },
  { id: "xero", name: "Xero", type: "accounting", status: "syncing", lastSync: "In progress...", recordsSync: 312, logo: "XR" },
  { id: "gusto", name: "Gusto Payroll", type: "payroll", status: "synced", lastSync: "Today 12:00 PM", recordsSync: 14, logo: "GP" },
  { id: "api", name: "REST API Middleware", type: "api", status: "synced", lastSync: "Continuous", recordsSync: 15420, logo: "API" },
];

export interface ApiLog {
  time: string;
  method: string;
  endpoint: string;
  status: number;
  duration: string;
}

export const apiLogs: ApiLog[] = [
  { time: "7:14:22 PM", method: "POST", endpoint: "/api/orders/sync", status: 200, duration: "142ms" },
  { time: "7:14:01 PM", method: "GET", endpoint: "/api/menu/items", status: 200, duration: "88ms" },
  { time: "7:13:45 PM", method: "PUT", endpoint: "/api/inventory/update", status: 200, duration: "201ms" },
  { time: "7:13:22 PM", method: "POST", endpoint: "/api/payments/record", status: 200, duration: "165ms" },
  { time: "7:12:58 PM", method: "GET", endpoint: "/api/analytics/daily", status: 200, duration: "312ms" },
  { time: "7:12:30 PM", method: "POST", endpoint: "/api/delivery/doordash", status: 200, duration: "445ms" },
  { time: "7:11:55 PM", method: "POST", endpoint: "/api/delivery/deliverect", status: 503, duration: "5001ms" },
  { time: "7:11:22 PM", method: "PUT", endpoint: "/api/menu/86", status: 200, duration: "98ms" },
];

export const peakHoursData = [
  { hour: "6am", mon: 12, tue: 8, wed: 10, thu: 9, fri: 15, sat: 22, sun: 18 },
  { hour: "8am", mon: 45, tue: 42, wed: 48, thu: 44, fri: 52, sat: 68, sun: 72 },
  { hour: "10am", mon: 38, tue: 35, wed: 40, thu: 38, fri: 44, sat: 55, sun: 60 },
  { hour: "12pm", mon: 82, tue: 78, wed: 88, thu: 85, fri: 92, sat: 95, sun: 88 },
  { hour: "2pm", mon: 48, tue: 44, wed: 52, thu: 50, fri: 58, sat: 72, sun: 65 },
  { hour: "4pm", mon: 32, tue: 30, wed: 35, thu: 33, fri: 42, sat: 55, sun: 48 },
  { hour: "6pm", mon: 75, tue: 72, wed: 80, thu: 78, fri: 98, sat: 100, sun: 92 },
  { hour: "8pm", mon: 88, tue: 85, wed: 92, thu: 90, fri: 100, sat: 98, sun: 88 },
  { hour: "10pm", mon: 42, tue: 38, wed: 45, thu: 40, fri: 62, sat: 75, sun: 55 },
];

export const menuPerformanceData = menuItems
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 10)
  .map((item) => ({
    name: item.name.length > 16 ? item.name.slice(0, 16) + "…" : item.name,
    fullName: item.name,
    orders: Math.floor(item.popularity * 2.4),
    revenue: Math.floor(item.popularity * 2.4) * item.price,
  }));
