import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Mic,
  Send,
  Wrench,
  FileText,
  Building2,
  ChevronRight,
  Sparkles,
  Image as ImageIcon,
  Clock,
  DollarSign,
  Star,
  Wind,
  Coffee,
  Refrigerator,
  Printer,
  Lightbulb,
  Droplet,
  Layers,
} from "lucide-react";
import floorPlan from "@/assets/floor-plan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fridson AI — Building Nervous System" },
      {
        name: "description",
        content:
          "Operations dashboard for Fridson AI — digital twin, AI intake, and automated vendor workflow for office buildings.",
      },
      { property: "og:title", content: "Fridson AI — Building Nervous System" },
      {
        property: "og:description",
        content:
          "Operations dashboard for Fridson AI — digital twin, AI intake, and automated vendor workflow for office buildings.",
      },
    ],
  }),
  component: Index,
});

// ---------------- Floors & systems ----------------

type SystemKey = "hvac" | "coffee" | "fridge" | "office" | "lighting" | "plumbing";

const SYSTEM_META: Record<
  SystemKey,
  { label: string; icon: React.ReactNode; color: string; tint: string }
> = {
  hvac: { label: "HVAC", icon: <Wind className="size-3.5" />, color: "bg-info", tint: "text-info" },
  coffee: {
    label: "Coffee machine",
    icon: <Coffee className="size-3.5" />,
    color: "bg-warning",
    tint: "text-warning",
  },
  fridge: {
    label: "Fridge / Pantry",
    icon: <Refrigerator className="size-3.5" />,
    color: "bg-accent",
    tint: "text-accent",
  },
  office: {
    label: "Office equipment",
    icon: <Printer className="size-3.5" />,
    color: "bg-magenta",
    tint: "text-magenta",
  },
  lighting: {
    label: "Lighting",
    icon: <Lightbulb className="size-3.5" />,
    color: "bg-lime",
    tint: "text-lime",
  },
  plumbing: {
    label: "Plumbing",
    icon: <Droplet className="size-3.5" />,
    color: "bg-primary",
    tint: "text-primary",
  },
};

type Hotspot = {
  id: string;
  top: string;
  left: string;
  label: string;
  zone: string;
  status: "critical" | "warning" | "ok";
  system: SystemKey;
  detail: string;
};

type Floor = {
  id: string;
  name: string;
  level: string;
  occupancy: number;
  incidents: number;
  hotspots: Hotspot[];
};

const FLOORS: Floor[] = [
  {
    id: "l1",
    name: "Lobby & Pantry",
    level: "L1",
    occupancy: 62,
    incidents: 3,
    hotspots: [
      {
        id: "ahu-04",
        top: "30%",
        left: "72%",
        label: "AHU-04",
        zone: "East Wing · Ceiling",
        status: "critical",
        system: "hvac",
        detail: "Bearing vibration +15%. Failure predicted in 9 days.",
      },
      {
        id: "kitch-leak",
        top: "68%",
        left: "28%",
        label: "Pantry sink",
        zone: "Lobby · Pantry",
        status: "warning",
        system: "plumbing",
        detail: "Moisture sensor tripped 14:02. Tenant reported via QR.",
      },
      {
        id: "espresso-1",
        top: "55%",
        left: "55%",
        label: "La Marzocco #1",
        zone: "Pantry · Bar",
        status: "warning",
        system: "coffee",
        detail: "Boiler pressure low. Descale cycle overdue by 3 days.",
      },
    ],
  },
  {
    id: "l2",
    name: "Open workspace",
    level: "L2",
    occupancy: 81,
    incidents: 2,
    hotspots: [
      {
        id: "printer-2",
        top: "40%",
        left: "60%",
        label: "Printer C-22",
        zone: "Print bay",
        status: "warning",
        system: "office",
        detail: "Paper jam frequency 4× normal. Roller wear suspected.",
      },
      {
        id: "light-2",
        top: "25%",
        left: "35%",
        label: "Zone B lights",
        zone: "North desks",
        status: "ok",
        system: "lighting",
        detail: "Daylight harvesting nominal. 92% lumen retention.",
      },
    ],
  },
  {
    id: "l3",
    name: "Meeting & focus",
    level: "L3",
    occupancy: 44,
    incidents: 1,
    hotspots: [
      {
        id: "fridge-3",
        top: "60%",
        left: "30%",
        label: "Kitchen fridge",
        zone: "Café corner",
        status: "critical",
        system: "fridge",
        detail: "Compressor cycling 2× normal. Internal temp drifted to 7.8°C.",
      },
      {
        id: "ahu-3",
        top: "35%",
        left: "70%",
        label: "AHU-09",
        zone: "Boardroom",
        status: "ok",
        system: "hvac",
        detail: "Air quality 412 ppm CO₂. Within target.",
      },
    ],
  },
  {
    id: "l4",
    name: "Executive suites",
    level: "L4",
    occupancy: 28,
    incidents: 1,
    hotspots: [
      {
        id: "espresso-4",
        top: "50%",
        left: "50%",
        label: "Bean-to-cup #2",
        zone: "Exec pantry",
        status: "warning",
        system: "coffee",
        detail: "Grinder torque rising. Burr replacement due.",
      },
    ],
  },
  {
    id: "roof",
    name: "Rooftop plant",
    level: "RF",
    occupancy: 0,
    incidents: 0,
    hotspots: [
      {
        id: "chiller-rf",
        top: "45%",
        left: "65%",
        label: "Chiller-01",
        zone: "Rooftop",
        status: "ok",
        system: "hvac",
        detail: "Δt 6.1°C. Efficiency at design point.",
      },
    ],
  },
];

function Index() {
  const [floorId, setFloorId] = useState(FLOORS[0].id);
  const floor = useMemo(() => FLOORS.find((f) => f.id === floorId)!, [floorId]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 size-[440px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 size-[480px] rounded-full bg-magenta/20 blur-[120px]" />
      </div>

      <Header />
      <div className="flex">
        <FloorSidebar floorId={floorId} onSelect={setFloorId} />
        <main className="flex-1 px-6 lg:px-10 py-6 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <DigitalTwinCard floor={floor} />
            <IntakeCard floor={floor} />
            <WorkflowCard floor={floor} />
          </div>
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="px-6 lg:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="size-8 rounded-lg grid place-items-center shadow-lg shadow-primary/30"
            style={{ background: "var(--gradient-aurora)" }}
          >
            <Sparkles className="size-4 text-background" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold tracking-tight text-base">Fridson AI</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              Nordhavn Tower
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            <span>All agents operational</span>
          </div>
          <div
            className="size-8 rounded-full grid place-items-center text-[10px] font-mono text-background"
            style={{ background: "var(--gradient-sunset)" }}
          >
            OP1
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------------- Sidebar ----------------

function FloorSidebar({
  floorId,
  onSelect,
}: {
  floorId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="hidden md:flex w-60 shrink-0 border-r border-border bg-card/40 backdrop-blur-sm sticky top-14 self-start h-[calc(100vh-3.5rem)] flex-col">
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <Layers className="size-3" />
          Floors
        </div>
        <div className="mt-1 text-sm font-medium">Nordhavn Tower</div>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {FLOORS.map((f) => {
          const active = f.id === floorId;
          return (
            <button
              key={f.id}
              onClick={() => onSelect(f.id)}
              className={`w-full text-left rounded-lg px-3 py-2.5 transition-all group relative overflow-hidden ${
                active
                  ? "bg-primary/15 border border-primary/40 shadow-lg shadow-primary/10"
                  : "border border-transparent hover:bg-secondary/60"
              }`}
            >
              {active && (
                <span
                  className="absolute inset-y-2 left-0 w-0.5 rounded-r"
                  style={{ background: "var(--gradient-aurora)" }}
                />
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {f.level}
                  </span>
                  <span className={`text-sm ${active ? "font-medium" : ""}`}>{f.name}</span>
                </div>
                {f.incidents > 0 && (
                  <span
                    className={`text-[10px] font-mono size-5 rounded-full grid place-items-center ${
                      f.incidents > 1 ? "bg-destructive text-destructive-foreground" : "bg-warning text-background"
                    }`}
                  >
                    {f.incidents}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${f.occupancy}%`,
                      background: "var(--gradient-aurora)",
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{f.occupancy}%</span>
              </div>
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
          Systems online
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {(Object.keys(SYSTEM_META) as SystemKey[]).map((k) => {
            const m = SYSTEM_META[k];
            return (
              <div
                key={k}
                title={m.label}
                className={`aspect-square rounded-md border border-border grid place-items-center ${m.tint}`}
              >
                {m.icon}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

// ---------------- Card shell ----------------

function CardShell({
  index,
  title,
  subtitle,
  icon,
  accent = "primary",
  children,
}: {
  index: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent?: "primary" | "accent" | "magenta";
  children: React.ReactNode;
}) {
  const ringClass =
    accent === "primary"
      ? "from-primary/40"
      : accent === "accent"
        ? "from-accent/40"
        : "from-magenta/40";
  const iconBg =
    accent === "primary"
      ? "bg-primary/15 text-primary"
      : accent === "accent"
        ? "bg-accent/15 text-accent"
        : "bg-magenta/15 text-magenta";
  return (
    <section className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden flex flex-col">
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${ringClass} via-transparent to-transparent`}
      />
      <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`size-9 rounded-lg grid place-items-center shrink-0 ${iconBg}`}>
            {icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                {index}
              </span>
              <h2 className="font-semibold tracking-tight truncate">{title}</h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-4">{children}</div>
    </section>
  );
}

// ---------------- 1. Digital Twin ----------------

function DigitalTwinCard({ floor }: { floor: Floor }) {
  const [activeId, setActiveId] = useState(floor.hotspots[0]?.id);
  const active =
    floor.hotspots.find((h) => h.id === activeId) ?? floor.hotspots[0];

  // reset selection when floor changes
  if (active && active.id !== activeId && !floor.hotspots.find((h) => h.id === activeId)) {
    // no-op: avoids stale state visual; selection falls back to first
  }

  return (
    <CardShell
      index="01 · Sense"
      title={`Digital Twin — ${floor.level}`}
      subtitle={`${floor.name} · live sensor mesh over schematic`}
      icon={<Building2 className="size-4" />}
      accent="accent"
    >
      <div className="relative rounded-lg overflow-hidden border border-border bg-background aspect-[4/3]">
        <img
          src={floorPlan}
          alt={`${floor.level} digital twin`}
          width={1280}
          height={896}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div
          className="absolute inset-0 mix-blend-screen opacity-60"
          style={{ background: "var(--gradient-ocean)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
        {floor.hotspots.map((h) => {
          const color =
            h.status === "critical"
              ? "bg-destructive"
              : h.status === "warning"
                ? "bg-warning"
                : "bg-success";
          const isActive = active?.id === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setActiveId(h.id)}
              style={{ top: h.top, left: h.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              aria-label={h.label}
            >
              <span
                className={`absolute inset-0 m-auto size-7 rounded-full ${color} opacity-40 animate-ping`}
              />
              <span
                className={`relative block size-3.5 rounded-full ${color} ring-2 ${
                  isActive ? "ring-foreground" : "ring-background"
                }`}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono bg-background/85 backdrop-blur px-1.5 py-0.5 rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                {h.label}
              </span>
            </button>
          );
        })}
        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-background/70 backdrop-blur text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border">
          Live · 1:200
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-background/70 backdrop-blur text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/40">
          {floor.hotspots.length} nodes
        </div>
      </div>

      {active && (
        <div className="rounded-lg border border-border bg-secondary/40 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full ${
                  active.status === "critical"
                    ? "bg-destructive"
                    : active.status === "warning"
                      ? "bg-warning"
                      : "bg-success"
                }`}
              />
              <span className="text-sm font-medium">{active.label}</span>
              <span
                className={`inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${SYSTEM_META[active.system].tint} bg-background/50 border border-border`}
              >
                {SYSTEM_META[active.system].icon}
                {SYSTEM_META[active.system].label}
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              {active.zone}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{active.detail}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-center">
        <MiniStat label="Sensors" value="124" tone="accent" />
        <MiniStat label="Online" value="98.4%" tone="success" />
        <MiniStat label="Occupancy" value={`${floor.occupancy}%`} tone="primary" />
      </div>
    </CardShell>
  );
}

function MiniStat({
  label,
  value,
  tone = "primary",
}: {
  label: string;
  value: string;
  tone?: "primary" | "accent" | "success";
}) {
  const toneClass =
    tone === "primary"
      ? "text-primary"
      : tone === "accent"
        ? "text-accent"
        : "text-success";
  return (
    <div className="rounded-md border border-border bg-secondary/40 py-2">
      <div className={`text-sm font-semibold ${toneClass}`}>{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

// ---------------- 2. Intake ----------------

function IntakeCard({ floor }: { floor: Floor }) {
  const [recording, setRecording] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);

  // Pick the most severe hotspot on this floor for the demo transcript
  const focus =
    floor.hotspots.find((h) => h.status === "critical") ??
    floor.hotspots.find((h) => h.status === "warning") ??
    floor.hotspots[0];

  const transcript = focus
    ? TRANSCRIPTS[focus.system]
    : '"Everything looks fine on this floor right now."';

  return (
    <CardShell
      index="02 · Report"
      title="AI Intake — Voice & Photo"
      subtitle="Scan QR, talk or snap. AI triages in seconds."
      icon={<Sparkles className="size-4" />}
      accent="primary"
    >
      <div className="rounded-lg border border-border bg-secondary/40 p-4">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Voice Note
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">00:14</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setRecording((r) => !r)}
            className={`size-10 rounded-full grid place-items-center transition-all shrink-0 ${
              recording
                ? "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/40"
                : "text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/40"
            }`}
            style={recording ? undefined : { background: "var(--gradient-aurora)" }}
            aria-label="Toggle recording"
          >
            <Mic className="size-4" />
          </button>
          <div className="flex-1 h-8 flex items-center gap-[2px]">
            {Array.from({ length: 42 }).map((_, i) => {
              const h = 20 + Math.abs(Math.sin(i * 1.7)) * 80;
              return (
                <span
                  key={i}
                  style={{
                    height: `${h}%`,
                    background: recording
                      ? `linear-gradient(180deg, var(--magenta), var(--primary))`
                      : undefined,
                  }}
                  className={`w-[3px] rounded-full ${
                    recording ? "" : "bg-muted-foreground/40"
                  }`}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground italic leading-relaxed">
          {transcript}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-secondary/40 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Photo Evidence
          </div>
          <button
            onClick={() => setHasPhoto((p) => !p)}
            className="text-[10px] font-mono text-accent hover:underline"
          >
            {hasPhoto ? "Retake" : "Attach"}
          </button>
        </div>
        {hasPhoto ? (
          <div className="aspect-video rounded-md bg-background border border-border grid place-items-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-50"
              style={{ background: "var(--gradient-sunset)" }}
            />
            <Camera className="size-8 text-background relative" />
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-foreground bg-background/70 px-1.5 py-0.5 rounded border border-border">
              IMG_4421 · {focus?.label ?? "—"} · {floor.level}
            </span>
          </div>
        ) : (
          <button className="aspect-video w-full rounded-md border border-dashed border-border grid place-items-center text-muted-foreground hover:border-accent hover:text-accent transition-colors">
            <ImageIcon className="size-6" />
          </button>
        )}
      </div>

      <div
        className="rounded-lg border p-4"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--primary) 12%, transparent), color-mix(in oklch, var(--accent) 8%, transparent))",
          borderColor: "color-mix(in oklch, var(--primary) 40%, transparent)",
        }}
      >
        <div className="flex items-center gap-2 text-primary text-[10px] font-mono uppercase tracking-widest">
          <Sparkles className="size-3" />
          AI Triage Result
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
          <Tag label="Type" value={focus ? SYSTEM_META[focus.system].label : "—"} tone="info" />
          <Tag
            label="Priority"
            value={
              focus?.status === "critical"
                ? "Critical"
                : focus?.status === "warning"
                  ? "High"
                  : "Low"
            }
            tone={focus?.status === "critical" ? "destructive" : "warning"}
          />
          <Tag label="Confidence" value="92%" tone="success" />
        </div>
        <button
          className="mt-3 w-full h-9 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-primary-foreground shadow-lg shadow-primary/30"
          style={{ background: "var(--gradient-aurora)" }}
        >
          <Send className="size-3.5" />
          Dispatch Workflow
        </button>
      </div>
    </CardShell>
  );
}

const TRANSCRIPTS: Record<SystemKey, string> = {
  hvac: '"Loud rattling sound from the ventilation in the east wing. Started about an hour ago — getting worse."',
  coffee: '"The espresso machine in the pantry won\'t pull a shot. Pressure gauge looks low and it\'s making a hissing noise."',
  fridge: '"The kitchen fridge feels warm and the milk has gone off. The compressor keeps clicking on and off."',
  office: '"The big printer near the print bay jams every other job. It\'s eating paper and the rollers sound rough."',
  lighting: '"Half the lights on the north side flicker when the blinds open. Pretty distracting in meetings."',
  plumbing: '"Water is pooling under the pantry sink — looks like a slow drip from the trap. Towels down for now."',
};

function Tag({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "warning" | "destructive" | "success" | "info";
}) {
  const toneClass =
    tone === "warning"
      ? "text-warning"
      : tone === "destructive"
        ? "text-destructive"
        : tone === "success"
          ? "text-success"
          : tone === "info"
            ? "text-info"
            : "text-foreground";
  return (
    <div className="rounded-md border border-border bg-background/50 px-2 py-1.5">
      <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className={`text-sm font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}

// ---------------- 3. Workflow ----------------

type VendorSet = {
  service: string;
  vendors: { name: string; eta: string; price: string; rating: number; badge: string | null; selected: boolean }[];
  steps: { title: string; detail: string; status: "done" | "active" | "pending"; time: string; icon: React.ReactNode }[];
};

const VENDOR_PLAYBOOK: Record<SystemKey, VendorSet> = {
  hvac: {
    service: "HVAC service",
    vendors: [
      { name: "Klimatek HVAC ApS", eta: "42 min", price: "4 200 DKK", rating: 4.9, badge: "BEST MATCH", selected: true },
      { name: "Nord Ventilation", eta: "1h 10m", price: "3 850 DKK", rating: 4.6, badge: "CHEAPEST", selected: false },
      { name: "CPH Service Group", eta: "55 min", price: "4 900 DKK", rating: 4.8, badge: null, selected: false },
    ],
    steps: hvacSteps(),
  },
  coffee: {
    service: "Coffee machine service",
    vendors: [
      { name: "Caffè Care Nordic", eta: "1h 20m", price: "1 850 DKK", rating: 4.9, badge: "BEST MATCH", selected: true },
      { name: "BaristaFix DK", eta: "2h", price: "1 450 DKK", rating: 4.5, badge: "CHEAPEST", selected: false },
      { name: "La Marzocco CPH", eta: "Tomorrow", price: "2 100 DKK", rating: 5.0, badge: "OEM", selected: false },
    ],
    steps: genericSteps("Caffè Care Nordic", "espresso machine"),
  },
  fridge: {
    service: "Refrigeration repair",
    vendors: [
      { name: "Cool Solutions A/S", eta: "55 min", price: "2 600 DKK", rating: 4.8, badge: "BEST MATCH", selected: true },
      { name: "FrostTek Service", eta: "1h 30m", price: "2 200 DKK", rating: 4.4, badge: "CHEAPEST", selected: false },
      { name: "Nordic Cooling", eta: "1h 10m", price: "2 850 DKK", rating: 4.7, badge: null, selected: false },
    ],
    steps: genericSteps("Cool Solutions A/S", "kitchen fridge"),
  },
  office: {
    service: "Office equipment service",
    vendors: [
      { name: "Konica MFP Care", eta: "2h", price: "1 400 DKK", rating: 4.7, badge: "BEST MATCH", selected: true },
      { name: "PrintHub CPH", eta: "3h", price: "1 100 DKK", rating: 4.3, badge: "CHEAPEST", selected: false },
      { name: "Office Service Plus", eta: "Same day", price: "1 650 DKK", rating: 4.6, badge: null, selected: false },
    ],
    steps: genericSteps("Konica MFP Care", "printer C-22"),
  },
  lighting: {
    service: "Lighting service",
    vendors: [
      { name: "Lumen Nordic", eta: "1h 30m", price: "1 200 DKK", rating: 4.8, badge: "BEST MATCH", selected: true },
      { name: "ElectroFix DK", eta: "1h", price: "1 050 DKK", rating: 4.5, badge: "FASTEST", selected: false },
      { name: "Light & Power", eta: "2h", price: "1 400 DKK", rating: 4.6, badge: null, selected: false },
    ],
    steps: genericSteps("Lumen Nordic", "zone B lighting"),
  },
  plumbing: {
    service: "Plumbing service",
    vendors: [
      { name: "Rør & Vand ApS", eta: "38 min", price: "2 100 DKK", rating: 4.9, badge: "BEST MATCH", selected: true },
      { name: "AquaService CPH", eta: "1h", price: "1 800 DKK", rating: 4.6, badge: "CHEAPEST", selected: false },
      { name: "Nordic Plumb", eta: "50 min", price: "2 300 DKK", rating: 4.7, badge: null, selected: false },
    ],
    steps: genericSteps("Rør & Vand ApS", "pantry sink"),
  },
};

function hvacSteps() {
  return [
    { title: "Incident triaged", detail: "AHU-04 · HVAC · High priority", status: "done" as const, time: "14:02", icon: <CheckCircle2 className="size-3.5" /> },
    { title: "Vendor bidding opened", detail: "12 contractors invited · 3 responded", status: "done" as const, time: "14:03", icon: <Activity className="size-3.5" /> },
    { title: "Klimatek HVAC selected", detail: "Best score: reliability × cost × ETA", status: "active" as const, time: "14:04", icon: <Wrench className="size-3.5" /> },
    { title: "Tenant + compliance notified", detail: "SMS sent · safety log queued", status: "pending" as const, time: "—", icon: <FileText className="size-3.5" /> },
    { title: "Resolution & documentation", detail: "Auto-close + invoice reconciliation", status: "pending" as const, time: "—", icon: <CheckCircle2 className="size-3.5" /> },
  ];
}

function genericSteps(vendor: string, asset: string) {
  return [
    { title: "Incident triaged", detail: `${asset} flagged by AI`, status: "done" as const, time: "14:02", icon: <CheckCircle2 className="size-3.5" /> },
    { title: "Vendor bidding opened", detail: "Specialists invited · bids streaming in", status: "done" as const, time: "14:03", icon: <Activity className="size-3.5" /> },
    { title: `${vendor} selected`, detail: "Best score: reliability × cost × ETA", status: "active" as const, time: "14:04", icon: <Wrench className="size-3.5" /> },
    { title: "Tenant notified", detail: "SMS + dashboard ping", status: "pending" as const, time: "—", icon: <FileText className="size-3.5" /> },
    { title: "Resolution & docs", detail: "Auto-close + invoice reconciliation", status: "pending" as const, time: "—", icon: <CheckCircle2 className="size-3.5" /> },
  ];
}

function WorkflowCard({ floor }: { floor: Floor }) {
  const focus =
    floor.hotspots.find((h) => h.status === "critical") ??
    floor.hotspots.find((h) => h.status === "warning") ??
    floor.hotspots[0];

  const playbook = focus ? VENDOR_PLAYBOOK[focus.system] : VENDOR_PLAYBOOK.hvac;

  return (
    <CardShell
      index="03 · Act"
      title="Action Workflow"
      subtitle={`AI brokers the best vendor for ${playbook.service.toLowerCase()}`}
      icon={<Wrench className="size-4" />}
      accent="magenta"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Vendor Bidding · Live
          </div>
          <div className="text-[10px] font-mono text-success flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            {playbook.vendors.length} bids
          </div>
        </div>
        <div className="space-y-2">
          {playbook.vendors.map((v) => (
            <div
              key={v.name}
              className={`rounded-lg border p-3 transition-colors ${
                v.selected
                  ? "border-magenta/50 bg-magenta/10 shadow-lg shadow-magenta/10"
                  : "border-border bg-secondary/30"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium truncate">{v.name}</span>
                  {v.badge && (
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        v.selected
                          ? "bg-magenta text-background"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {v.badge}
                    </span>
                  )}
                </div>
                {v.selected && <ChevronRight className="size-4 text-magenta shrink-0" />}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-info">
                  <Clock className="size-3" /> {v.eta}
                </span>
                <span className="flex items-center gap-1 text-lime">
                  <DollarSign className="size-3" /> {v.price}
                </span>
                <span className="flex items-center gap-1 text-warning">
                  <Star className="size-3" /> {v.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Execution Plan
        </div>
        <ol className="relative space-y-3 pl-6 before:content-[''] before:absolute before:left-[9px] before:top-1 before:bottom-1 before:w-px before:bg-border">
          {playbook.steps.map((s) => {
            const color =
              s.status === "done"
                ? "bg-success text-background"
                : s.status === "active"
                  ? "bg-magenta text-background"
                  : "bg-secondary text-muted-foreground";
            return (
              <li key={s.title} className="relative">
                <span
                  className={`absolute -left-6 top-0.5 size-[18px] rounded-full grid place-items-center ${color}`}
                >
                  {s.icon}
                </span>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">{s.time}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.detail}</div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-auto rounded-lg border border-warning/30 bg-warning/10 p-3 flex items-start gap-3">
        <AlertTriangle className="size-4 text-warning shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-foreground font-medium">Approval pending.</span>{" "}
          {playbook.vendors[0].name} will be auto-dispatched in{" "}
          <span className="font-mono text-warning">02:14</span> if no override.
        </div>
      </div>
    </CardShell>
  );
}