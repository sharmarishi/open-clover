import {
  Monitor,
  Wifi,
  Battery,
  BatteryLow,
  CheckCircle2,
  AlertCircle,
  Printer,
  Cpu,
  Settings,
  RefreshCw,
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  model: string;
  role: string;
  status: "online" | "offline" | "warning";
  ip: string;
  firmware: string;
  serial: string;
  battery?: number;
  wifiStrength: number;
  lastSeen: string;
  location: string;
  specs: { label: string; value: string }[];
}

const devices: Device[] = [
  {
    id: "dev-001",
    name: "Station Duo — Front",
    model: "Clover Station Duo",
    role: "Primary POS Terminal",
    status: "online",
    ip: "192.168.1.101",
    firmware: "6.4.2",
    serial: "C0200M1234567",
    wifiStrength: 95,
    lastSeen: "Now",
    location: "Front Counter",
    specs: [
      { label: "Display", value: "14\" FHD + 8\" Customer" },
      { label: "Processor", value: "Qualcomm Snapdragon" },
      { label: "RAM", value: "4 GB" },
      { label: "Storage", value: "32 GB eMMC" },
      { label: "Printer", value: "Integrated thermal" },
    ],
  },
  {
    id: "dev-002",
    name: "Clover Mini — Bar",
    model: "Clover Mini",
    role: "Bar POS Terminal",
    status: "online",
    ip: "192.168.1.102",
    firmware: "6.4.2",
    serial: "C0302M9876543",
    wifiStrength: 87,
    lastSeen: "Now",
    location: "Bar Station",
    specs: [
      { label: "Display", value: "7\" Touchscreen" },
      { label: "Connectivity", value: "Wi-Fi + Ethernet" },
      { label: "Printer", value: "External Ethernet" },
      { label: "Card Reader", value: "Integrated EMV/NFC" },
      { label: "RAM", value: "2 GB" },
    ],
  },
  {
    id: "dev-003",
    name: "Clover Flex — Server 1",
    model: "Clover Flex",
    role: "Tableside Ordering",
    status: "online",
    ip: "192.168.1.103",
    firmware: "6.3.8",
    serial: "C0401M5551234",
    battery: 72,
    wifiStrength: 79,
    lastSeen: "30 sec ago",
    location: "Dining Room — Maria",
    specs: [
      { label: "Display", value: "5\" Touchscreen" },
      { label: "Battery", value: "1865 mAh" },
      { label: "Weight", value: "316g" },
      { label: "Printer", value: "Built-in receipt" },
      { label: "Camera", value: "8MP QR scanner" },
    ],
  },
  {
    id: "dev-004",
    name: "Clover Flex — Server 2",
    model: "Clover Flex",
    role: "Tableside Ordering",
    status: "online",
    ip: "192.168.1.104",
    firmware: "6.3.8",
    serial: "C0401M5551235",
    battery: 41,
    wifiStrength: 71,
    lastSeen: "1 min ago",
    location: "Dining Room — James",
    specs: [
      { label: "Display", value: "5\" Touchscreen" },
      { label: "Battery", value: "1865 mAh" },
      { label: "Weight", value: "316g" },
      { label: "Printer", value: "Built-in receipt" },
      { label: "Camera", value: "8MP QR scanner" },
    ],
  },
  {
    id: "dev-005",
    name: "Clover Flex — Server 3",
    model: "Clover Flex",
    role: "Tableside Ordering",
    status: "warning",
    ip: "192.168.1.105",
    firmware: "6.3.1",
    serial: "C0401M5551236",
    battery: 12,
    wifiStrength: 45,
    lastSeen: "5 min ago",
    location: "Patio — Chen",
    specs: [
      { label: "Display", value: "5\" Touchscreen" },
      { label: "Battery", value: "1865 mAh" },
      { label: "Weight", value: "316g" },
      { label: "Printer", value: "Built-in receipt" },
      { label: "Camera", value: "8MP QR scanner" },
    ],
  },
  {
    id: "dev-006",
    name: "Kitchen Display — Hot Line",
    model: "Clover Kitchen Display",
    role: "KDS — Primary Kitchen",
    status: "online",
    ip: "192.168.1.110",
    firmware: "4.2.1",
    serial: "KDS001M7654321",
    wifiStrength: 92,
    lastSeen: "Now",
    location: "Kitchen — Hot Line",
    specs: [
      { label: "Display", value: "14\" Full HD" },
      { label: "Mounting", value: "Wall / Under-cabinet" },
      { label: "Interface", value: "Ethernet + Wi-Fi" },
      { label: "Brightness", value: "500 nit (outdoor)" },
      { label: "OS", value: "Android 11" },
    ],
  },
  {
    id: "dev-007",
    name: "Kitchen Display — Expo",
    model: "Clover Kitchen Display",
    role: "KDS — Expediting",
    status: "online",
    ip: "192.168.1.111",
    firmware: "4.2.1",
    serial: "KDS002M7654322",
    wifiStrength: 88,
    lastSeen: "Now",
    location: "Kitchen — Expo Station",
    specs: [
      { label: "Display", value: "14\" Full HD" },
      { label: "Mounting", value: "Wall / Under-cabinet" },
      { label: "Interface", value: "Ethernet + Wi-Fi" },
      { label: "Brightness", value: "500 nit (outdoor)" },
      { label: "OS", value: "Android 11" },
    ],
  },
  {
    id: "dev-008",
    name: "Receipt Printer — Kitchen",
    model: "Star TSP743II",
    role: "Kitchen Ticket Printer",
    status: "offline",
    ip: "192.168.1.120",
    firmware: "2.1.0",
    serial: "TSP743II-88821",
    wifiStrength: 0,
    lastSeen: "2 hrs ago",
    location: "Kitchen — Cold Side",
    specs: [
      { label: "Print Speed", value: "250mm/sec" },
      { label: "Paper Width", value: "3\" thermal" },
      { label: "Interface", value: "Ethernet" },
      { label: "Cutter", value: "Auto partial" },
    ],
  },
];

function WifiBars({ strength }: { strength: number }) {
  const bars = [25, 50, 75, 100];
  return (
    <div className="flex items-end gap-0.5 h-3.5">
      {bars.map((threshold, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm transition-colors ${
            strength >= threshold ? "bg-emerald-400" : "bg-gray-700"
          }`}
          style={{ height: `${(i + 1) * 4 + 2}px` }}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Device["status"] }) {
  if (status === "online") {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Online
      </span>
    );
  }
  if (status === "warning") {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
        <AlertCircle className="w-3 h-3" />
        Warning
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
      Offline
    </span>
  );
}

function DeviceIcon({ model }: { model: string }) {
  if (model.includes("Kitchen Display")) return <Monitor className="w-6 h-6 text-violet-400" />;
  if (model.includes("Printer")) return <Printer className="w-6 h-6 text-gray-400" />;
  if (model.includes("Flex")) return <Cpu className="w-6 h-6 text-emerald-400" />;
  return <Monitor className="w-6 h-6 text-violet-400" />;
}

export default function HardwarePage() {
  const onlineCount = devices.filter((d) => d.status === "online").length;
  const warningCount = devices.filter((d) => d.status === "warning").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hardware</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage your Clover device fleet</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-2 rounded-lg transition-colors">
          <RefreshCw className="w-4 h-4" />
          Refresh All
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{devices.length}</div>
          <div className="text-xs text-gray-400 mt-0.5">Total Devices</div>
        </div>
        <div className="bg-gray-900 border border-emerald-500/20 rounded-xl p-4">
          <div className="text-2xl font-bold text-emerald-400">{onlineCount}</div>
          <div className="text-xs text-gray-400 mt-0.5">Online</div>
        </div>
        <div className="bg-gray-900 border border-amber-500/20 rounded-xl p-4">
          <div className="text-2xl font-bold text-amber-400">{warningCount}</div>
          <div className="text-xs text-gray-400 mt-0.5">Needs Attention</div>
        </div>
        <div className="bg-gray-900 border border-red-500/20 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-400">{offlineCount}</div>
          <div className="text-xs text-gray-400 mt-0.5">Offline</div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`bg-gray-900 border rounded-xl p-5 transition-colors ${
              device.status === "offline"
                ? "border-red-500/20 opacity-75"
                : device.status === "warning"
                ? "border-amber-500/30"
                : "border-gray-800 hover:border-gray-600"
            }`}
          >
            {/* Top Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  device.status === "online" ? "bg-violet-500/15" : "bg-gray-800"
                }`}>
                  <DeviceIcon model={device.model} />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm leading-tight">{device.name}</div>
                  <div className="text-xs text-gray-400">{device.model}</div>
                </div>
              </div>
              <StatusBadge status={device.status} />
            </div>

            {/* Role */}
            <div className="mb-4 px-2.5 py-1.5 bg-gray-800/60 rounded-lg text-xs text-gray-300">
              {device.role} — <span className="text-gray-400">{device.location}</span>
            </div>

            {/* Connectivity Row */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-gray-400" />
                <WifiBars strength={device.wifiStrength} />
                <span className="text-xs text-gray-400">{device.wifiStrength}%</span>
              </div>
              {device.battery !== undefined && (
                <div className="flex items-center gap-1.5">
                  {device.battery < 20 ? (
                    <BatteryLow className="w-3.5 h-3.5 text-red-400" />
                  ) : (
                    <Battery className="w-3.5 h-3.5 text-gray-400" />
                  )}
                  <span className={`text-xs ${device.battery < 20 ? "text-red-400 font-medium" : "text-gray-400"}`}>
                    {device.battery}%
                  </span>
                </div>
              )}
            </div>

            {/* Specs */}
            <div className="space-y-1.5 mb-4">
              {device.specs.slice(0, 3).map((spec) => (
                <div key={spec.label} className="flex justify-between text-xs">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="text-gray-300">{spec.value}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Firmware</span>
                <span className="text-gray-300">v{device.firmware}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">IP Address</span>
                <span className="font-mono text-gray-300">{device.ip}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                {device.status === "online" ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-red-400" />
                )}
                Last seen: {device.lastSeen}
              </div>
              <button className="text-gray-500 hover:text-gray-300 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
