import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Header />
      <main className="px-6 lg:px-10 py-6 max-w-[1600px] mx-auto">
        <StatusStrip />
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <DigitalTwinCard />
          <IntakeCard />
          <WorkflowCard />
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-md bg-primary grid place-items-center">
            <div className="size-2.5 rounded-full bg-background" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold tracking-tight">Fridson AI</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              Nordhavn Tower · L1
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            <span>All agents operational</span>
          </div>
          <div className="size-8 rounded-full bg-secondary grid place-items-center text-[10px] font-mono">
            OP1
          </div>
        </div>
      </div>
    </header>
  );
}

function StatusStrip() {
  const stats = [
    { label: "Active Incidents", value: "07", tone: "text-foreground" },
    { label: "AI Triage Rate", value: "94%", tone: "text-success" },
    { label: "Predicted Failures", value: "03", tone: "text-warning" },
    { label: "Vendors in Network", value: "126", tone: "text-foreground" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            {s.label}
          </div>
          <div className={`mt-1 text-2xl font-semibold tracking-tight ${s.tone}`}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function CardShell({
  index,
  title,
  subtitle,
  icon,
  children,
}: {
  index: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="size-9 rounded-lg bg-secondary grid place-items-center text-primary shrink-0">
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

// 1. Digital Twin
type Hotspot = {
  id: string;
  top: string;
  left: string;
  label: string;
  zone: string;
  status: "critical" | "warning" | "ok";
  detail: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "ahu-04",
    top: "32%",
    left: "72%",
    label: "AHU-04",
    zone: "East Wing · Ceiling",
    status: "critical",
    detail: "Bearing vibration +15% — failure predicted in 9 days.",
  },
  {
    id: "kitch-leak",
    top: "68%",
    left: "28%",
    label: "Kitchen sink",
    zone: "Lobby · Pantry",
    status: "warning",
    detail: "Moisture sensor tripped 14:02. Tenant reported via QR.",
  },
  {
    id: "access-2",
    top: "62%",
    left: "70%",
    label: "Access Pt 2",
    zone: "Last Room",
    status: "ok",
    detail: "All readings nominal. Last scan 09:35.",
  },
];

function DigitalTwinCard() {
  const [active, setActive] = useState<Hotspot>(HOTSPOTS[0]);

  return (
    <CardShell
      index="01 · Sense"
      title="Digital Twin — Floor 1"
      subtitle="Live sensor mesh over the building schematic"
      icon={<Building2 className="size-4" />}
    >
      <div className="relative rounded-lg overflow-hidden border border-border bg-background aspect-[4/3]">
        <img
          src={floorPlan}
          alt="Floor 1 digital twin"
          width={1280}
          height={896}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/40" />
        {HOTSPOTS.map((h) => {
          const color =
            h.status === "critical"
              ? "bg-destructive"
              : h.status === "warning"
                ? "bg-warning"
                : "bg-success";
          const isActive = active.id === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setActive(h)}
              style={{ top: h.top, left: h.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              aria-label={h.label}
            >
              <span
                className={`absolute inset-0 m-auto size-6 rounded-full ${color} opacity-30 animate-ping`}
              />
              <span
                className={`relative block size-3 rounded-full ${color} ring-2 ${isActive ? "ring-foreground" : "ring-background"}`}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono bg-background/80 backdrop-blur px-1.5 py-0.5 rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                {h.label}
              </span>
            </button>
          );
        })}
        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-background/70 backdrop-blur text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border">
          Live · 1:200
        </div>
      </div>

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
          </div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            {active.zone}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{active.detail}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <MiniStat label="Sensors" value="124" />
        <MiniStat label="Online" value="98.4%" />
        <MiniStat label="Temp avg" value="21.4°" />
      </div>
    </CardShell>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-secondary/40 py-2">
      <div className="text-sm font-semibold">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

// 2. Intake
function IntakeCard() {
  const [recording, setRecording] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);
  const transcript =
    '"Loud rattling sound from the ventilation in the east wing. Started about an hour ago — getting worse."';

  return (
    <CardShell
      index="02 · Report"
      title="AI Intake — Voice & Photo"
      subtitle="Scan QR, talk or snap. AI triages in seconds."
      icon={<Sparkles className="size-4" />}
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
            className={`size-10 rounded-full grid place-items-center transition-colors shrink-0 ${
              recording
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
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
                  style={{ height: `${h}%` }}
                  className={`w-[3px] rounded-full ${
                    recording ? "bg-primary" : "bg-muted-foreground/40"
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
            className="text-[10px] font-mono text-primary hover:underline"
          >
            {hasPhoto ? "Retake" : "Attach"}
          </button>
        </div>
        {hasPhoto ? (
          <div className="aspect-video rounded-md bg-background border border-border grid place-items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary opacity-60" />
            <Camera className="size-8 text-muted-foreground relative" />
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-muted-foreground bg-background/70 px-1.5 py-0.5 rounded border border-border">
              IMG_4421 · ceiling vent · L1-E
            </span>
          </div>
        ) : (
          <button className="aspect-video w-full rounded-md border border-dashed border-border grid place-items-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
            <ImageIcon className="size-6" />
          </button>
        )}
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <div className="flex items-center gap-2 text-primary text-[10px] font-mono uppercase tracking-widest">
          <Sparkles className="size-3" />
          AI Triage Result
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
          <Tag label="Type" value="HVAC" />
          <Tag label="Priority" value="High" tone="warning" />
          <Tag label="Confidence" value="92%" />
        </div>
        <button className="mt-3 w-full h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <Send className="size-3.5" />
          Dispatch Workflow
        </button>
      </div>
    </CardShell>
  );
}

function Tag({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "warning";
}) {
  return (
    <div className="rounded-md border border-border bg-background/50 px-2 py-1.5">
      <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div
        className={`text-sm font-semibold ${tone === "warning" ? "text-warning" : "text-foreground"}`}
      >
        {value}
      </div>
    </div>
  );
}

// 3. Workflow
const VENDORS = [
  {
    name: "Klimatek HVAC ApS",
    eta: "42 min",
    price: "4 200 DKK",
    rating: 4.9,
    badge: "BEST MATCH",
    selected: true,
  },
  {
    name: "Nord Ventilation",
    eta: "1h 10m",
    price: "3 850 DKK",
    rating: 4.6,
    badge: "CHEAPEST",
    selected: false,
  },
  {
    name: "CPH Service Group",
    eta: "55 min",
    price: "4 900 DKK",
    rating: 4.8,
    badge: null,
    selected: false,
  },
];

const STEPS = [
  {
    title: "Incident triaged",
    detail: "AHU-04 · HVAC · High priority",
    status: "done" as const,
    time: "14:02",
    icon: <CheckCircle2 className="size-3.5" />,
  },
  {
    title: "Vendor bidding opened",
    detail: "12 contractors invited · 3 responded",
    status: "done" as const,
    time: "14:03",
    icon: <Activity className="size-3.5" />,
  },
  {
    title: "Klimatek HVAC selected",
    detail: "Best score: reliability × cost × ETA",
    status: "active" as const,
    time: "14:04",
    icon: <Wrench className="size-3.5" />,
  },
  {
    title: "Tenant + compliance notified",
    detail: "SMS sent · safety log queued",
    status: "pending" as const,
    time: "—",
    icon: <FileText className="size-3.5" />,
  },
  {
    title: "Resolution & documentation",
    detail: "Auto-close + invoice reconciliation",
    status: "pending" as const,
    time: "—",
    icon: <CheckCircle2 className="size-3.5" />,
  },
];

function WorkflowCard() {
  return (
    <CardShell
      index="03 · Act"
      title="Action Workflow"
      subtitle="AI brokers the best vendor and runs the plan"
      icon={<Wrench className="size-4" />}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Vendor Bidding · Live
          </div>
          <div className="text-[10px] font-mono text-success flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            3 bids
          </div>
        </div>
        <div className="space-y-2">
          {VENDORS.map((v) => (
            <div
              key={v.name}
              className={`rounded-lg border p-3 transition-colors ${
                v.selected ? "border-primary bg-primary/5" : "border-border bg-secondary/30"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium truncate">{v.name}</span>
                  {v.badge && (
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        v.selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {v.badge}
                    </span>
                  )}
                </div>
                {v.selected && <ChevronRight className="size-4 text-primary shrink-0" />}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" /> {v.eta}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3" /> {v.price}
                </span>
                <span className="flex items-center gap-1">
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
          {STEPS.map((s) => {
            const color =
              s.status === "done"
                ? "bg-success text-background"
                : s.status === "active"
                  ? "bg-primary text-primary-foreground"
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

      <div className="mt-auto rounded-lg border border-warning/30 bg-warning/5 p-3 flex items-start gap-3">
        <AlertTriangle className="size-4 text-warning shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-foreground font-medium">Approval pending.</span> Klimatek will be
          auto-dispatched in <span className="font-mono text-warning">02:14</span> if no override.
        </div>
      </div>
    </CardShell>
  );
}