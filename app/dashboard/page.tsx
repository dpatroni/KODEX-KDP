"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Atom,
  CheckCircle2,
  Clock3,
  Cpu,
  FlaskConical,
  Gauge,
  RadioTower,
  ShieldCheck,
  Target,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";

type Tone = "cyan" | "emerald" | "violet" | "amber";

type Kpi = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

const kpis: Kpi[] = [
  { label: "Architectures", value: "5,760", detail: "ranked spatial designs", icon: Cpu },
  { label: "Active Experiments", value: "12", detail: "running and queued", icon: FlaskConical },
  { label: "Best Candidate", value: "CAND-001317", detail: "SMF-SIN / A=40 / H=2", icon: Target },
  { label: "Validation Level", value: "L1 → FEM", detail: "next evidence gate", icon: ShieldCheck },
];

const activityFeed: Array<{ time: string; title: string; detail: string; tone: Tone }> = [
  { time: "15:42", title: "FEM prep unlocked", detail: "CAND-001317 assumptions are ready for review.", tone: "cyan" },
  { time: "14:18", title: "Explorer batch indexed", detail: "5,760 architectures normalized and ranked.", tone: "emerald" },
  { time: "12:05", title: "Digital twin synced", detail: "M-001 geometry and validation notes aligned.", tone: "violet" },
  { time: "09:40", title: "Protocol draft updated", detail: "Prototype fixture constraints captured.", tone: "amber" },
];

const queuedExperiments = [
  { id: "EXP-FEM-014", name: "CAND-001317 FEM mesh", owner: "Validation", eta: "2h", progress: 72 },
  { id: "EXP-SIM-022", name: "Harmonic sweep H=2", owner: "Explorer", eta: "4h", progress: 46 },
  { id: "EXP-DOC-009", name: "Evidence package review", owner: "Research", eta: "1d", progress: 28 },
];

const pipeline = [
  { stage: "Idea", progress: 100, state: "Locked" },
  { stage: "Design", progress: 100, state: "Complete" },
  { stage: "Simulation", progress: 88, state: "Active" },
  { stage: "FEM", progress: 42, state: "Ready" },
  { stage: "Prototype", progress: 16, state: "Pending" },
];

const systemStatus = [
  { label: "Digital Twin", value: "Synced", icon: RadioTower, progress: 96, tone: "cyan" as Tone },
  { label: "FEM Prep", value: "Ready", icon: Gauge, progress: 74, tone: "emerald" as Tone },
  { label: "Prototype", value: "Pending", icon: Atom, progress: 18, tone: "amber" as Tone },
  { label: "Documentation", value: "Active", icon: Activity, progress: 62, tone: "violet" as Tone },
];

const magnetAngles = Array.from({ length: 16 }, (_, index) => index * 22.5);
const gridLines = Array.from({ length: 9 }, (_, index) => index);

function signalPath(phase: number, amplitude: number, frequency: number, baseline: number) {
  return Array.from({ length: 92 }, (_, index) => {
    const x = 58 + index * 8.85;
    const y =
      baseline +
      Math.sin(index * frequency + phase) * amplitude +
      Math.sin(index * 0.17 + phase * 0.4) * (amplitude * 0.28);

    return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

function StatusDot({ tone = "cyan" }: { tone?: Tone }) {
  const toneClass = {
    cyan: "bg-cyan-200 shadow-cyan-200/40",
    emerald: "bg-emerald-200 shadow-emerald-200/40",
    violet: "bg-violet-200 shadow-violet-200/40",
    amber: "bg-amber-200 shadow-amber-200/40",
  }[tone];

  return <span className={`h-2.5 w-2.5 rounded-full shadow-[0_0_18px] motion-safe:animate-pulse ${toneClass}`} />;
}

function SectionHeader({ label, title, meta }: { label: string; title: string; meta?: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="badge inline-flex rounded-full px-3 py-1 text-xs">{label}</div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {meta ? <div className="text-sm text-white/45">{meta}</div> : null}
    </div>
  );
}

function AnimatedBar({ value, tone = "cyan" }: { value: number; tone?: Tone }) {
  const color =
    tone === "amber"
      ? "from-amber-200 via-cyan-200 to-emerald-200"
      : tone === "violet"
        ? "from-violet-200 via-cyan-200 to-emerald-200"
        : "from-cyan-200 via-sky-300 to-emerald-200";

  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700 motion-safe:animate-pulse`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function DigitalTwinVisual() {
  return (
    <div className="panel relative min-h-[520px] overflow-hidden rounded-[2rem] p-6 transition duration-300 hover:border-cyan-200/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(103,232,249,.16),transparent_34%),radial-gradient(circle_at_72%_74%,rgba(167,243,208,.10),transparent_32%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="badge inline-flex rounded-full px-3 py-1 text-xs">Digital Twin / Fusion View</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">KODEX M-001 architecture</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
            Axial rotor model, 16-magnet array and FEM preparation plane for progressive validation.
          </p>
        </div>
        <div className="hidden rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-4 py-3 text-right text-xs text-cyan-100/75 sm:block">
          <div>MODEL STATE</div>
          <div className="mt-1 font-semibold text-cyan-100">SYNCED</div>
        </div>
      </div>

      <div className="relative mt-6 h-[390px]">
        <svg className="h-full w-full" viewBox="0 0 760 430" role="img" aria-label="KODEX M-001 digital twin rotor model">
          <defs>
            <pattern id="twin-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
            </pattern>
            <radialGradient id="rotor-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity=".78" />
              <stop offset="38%" stopColor="#67E8F9" stopOpacity=".3" />
              <stop offset="100%" stopColor="#0B1120" stopOpacity=".08" />
            </radialGradient>
            <linearGradient id="magnet-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" stopOpacity=".96" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity=".86" />
            </linearGradient>
            <filter id="cyan-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="760" height="430" rx="28" fill="url(#twin-grid)" opacity=".72" />
          <ellipse cx="380" cy="310" rx="245" ry="48" fill="rgba(103,232,249,.045)" stroke="rgba(103,232,249,.34)" />
          <ellipse cx="380" cy="310" rx="180" ry="30" fill="none" stroke="rgba(167,243,208,.24)" strokeDasharray="10 12">
            <animate attributeName="stroke-dashoffset" from="0" to="-88" dur="14s" repeatCount="indefinite" />
          </ellipse>

          {[
            "M80 240 C205 72 555 74 680 240",
            "M88 274 C230 150 530 150 672 274",
            "M115 192 C250 23 510 28 645 192",
            "M120 330 C260 232 500 232 640 330",
          ].map((path, index) => (
            <path
              key={path}
              d={path}
              fill="none"
              stroke={index % 2 === 0 ? "rgba(103,232,249,.44)" : "rgba(167,243,208,.34)"}
              strokeWidth={index === 0 ? 2.2 : 1.5}
              strokeDasharray="9 14"
              filter="url(#cyan-glow)"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-110" dur={`${13 + index * 2}s`} repeatCount="indefinite" />
            </path>
          ))}

          <g transform="translate(380 214)">
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="52s" repeatCount="indefinite" />
              <circle r="116" fill="rgba(15,23,42,.72)" stroke="rgba(103,232,249,.46)" strokeWidth="2" />
              <circle r="86" fill="none" stroke="rgba(255,255,255,.12)" strokeDasharray="5 10" />
              <circle r="42" fill="url(#rotor-core)" stroke="rgba(255,255,255,.22)" />
              {magnetAngles.map((angle) => {
                const radians = (angle * Math.PI) / 180;
                const x = Math.cos(radians) * 96;
                const y = Math.sin(radians) * 96;

                return (
                  <rect
                    key={angle}
                    x="-8"
                    y="-20"
                    width="16"
                    height="40"
                    rx="5"
                    fill="url(#magnet-fill)"
                    opacity=".92"
                    transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle + 90})`}
                  />
                );
              })}
            </g>
            <circle r="130" fill="none" stroke="rgba(103,232,249,.22)" strokeWidth="1" strokeDasharray="2 8" />
          </g>

          <g className="text-[13px] font-medium">
            <path d="M462 160 L588 116" stroke="rgba(103,232,249,.55)" />
            <text x="596" y="118" fill="rgba(224,242,254,.86)">Rotor</text>
            <path d="M502 232 L628 246" stroke="rgba(103,232,249,.55)" />
            <text x="636" y="250" fill="rgba(224,242,254,.86)">Magnet Array</text>
            <path d="M492 310 L612 342" stroke="rgba(167,243,208,.46)" />
            <text x="620" y="347" fill="rgba(209,250,229,.82)">Coil Plane</text>
            <path d="M245 310 L140 348" stroke="rgba(167,243,208,.46)" />
            <text x="64" y="354" fill="rgba(209,250,229,.82)">FEM Prep</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function SignalPanel() {
  const candidate = signalPath(0.4, 58, 0.19, 158);
  const experiment = signalPath(1.8, 38, 0.16, 182);
  const validation = signalPath(2.7, 44, 0.13, 122);

  return (
    <div className="panel overflow-hidden rounded-[2rem] p-6 transition duration-300 hover:border-cyan-200/30">
      <SectionHeader label="Dynamic Research Signal" title="Active simulation trace" meta="CAND-001317 / EXP-001" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-4">
        <div className="flex flex-wrap gap-4 px-2 pb-4 text-xs text-white/55">
          <span className="flex items-center gap-2"><span className="h-2 w-6 rounded-full bg-cyan-200" />CAND-001317</span>
          <span className="flex items-center gap-2"><span className="h-2 w-6 rounded-full bg-sky-300" />EXP-001</span>
          <span className="flex items-center gap-2"><span className="h-2 w-6 rounded-full bg-emerald-200" />Validation Index</span>
        </div>
        <svg className="h-[360px] w-full" viewBox="0 0 920 340" role="img" aria-label="Dynamic research signal chart">
          <defs>
            <filter id="chart-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="chart-fade" x1="0" x2="1">
              <stop offset="0%" stopColor="#67E8F9" stopOpacity=".18" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity=".04" />
            </linearGradient>
          </defs>
          <rect x="38" y="22" width="842" height="280" rx="18" fill="url(#chart-fade)" stroke="rgba(255,255,255,.08)" />
          {gridLines.map((line) => (
            <g key={line}>
              <line x1={58 + line * 100} x2={58 + line * 100} y1="38" y2="286" stroke="rgba(255,255,255,.07)" />
              <line x1="58" x2="860" y1={48 + line * 30} y2={48 + line * 30} stroke="rgba(255,255,255,.07)" />
            </g>
          ))}
          <path d={validation} fill="none" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" filter="url(#chart-glow)" />
          <path d={experiment} fill="none" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" opacity=".82" />
          <path d={candidate} fill="none" stroke="#67E8F9" strokeWidth="4.5" strokeLinecap="round" filter="url(#chart-glow)" />
          <line x1="120" x2="120" y1="34" y2="292" stroke="rgba(103,232,249,.48)" strokeWidth="2">
            <animate attributeName="x1" values="90;830;90" dur="18s" repeatCount="indefinite" />
            <animate attributeName="x2" values="90;830;90" dur="18s" repeatCount="indefinite" />
          </line>
          <text x="60" y="322" fill="rgba(255,255,255,.38)" fontSize="12">theta sweep</text>
          <text x="760" y="322" fill="rgba(255,255,255,.38)" fontSize="12">validation signal</text>
        </svg>
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="panel rounded-[2rem] p-6">
      <SectionHeader label="Activity Feed" title="Research pulse" meta="Today" />
      <div className="mt-6 space-y-3">
        {activityFeed.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-black/20 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/25 hover:bg-white/[.05]"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1"><StatusDot tone={item.tone} /></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="truncate text-sm font-semibold text-white/90">{item.title}</h3>
                  <span className="text-xs text-white/35">{item.time}</span>
                </div>
                <p className="mt-2 text-sm leading-5 text-white/50">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValidationTimeline() {
  return (
    <div className="panel rounded-[2rem] p-6">
      <SectionHeader label="Validation Pipeline" title="Idea to prototype timeline" meta="Progressive evidence gates" />
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="grid min-w-[780px] grid-cols-5 gap-5">
          {pipeline.map((item, index) => (
            <div key={item.stage} className="relative">
              {index < pipeline.length - 1 ? (
                <div className="absolute left-[calc(50%+26px)] top-[30px] h-px w-[calc(100%-30px)] bg-cyan-200/22">
                  <div className="h-px w-2/3 bg-gradient-to-r from-cyan-200 to-transparent motion-safe:animate-pulse" />
                </div>
              ) : null}
              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-200/10 shadow-[0_0_36px_rgba(103,232,249,.12)]">
                  {item.progress >= 80 ? (
                    <CheckCircle2 className="h-5 w-5 text-cyan-100" aria-hidden="true" />
                  ) : (
                    <StatusDot tone={item.stage === "Prototype" ? "amber" : "cyan"} />
                  )}
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-center transition hover:border-cyan-200/30 hover:bg-white/[.05]">
                  <h3 className="text-sm font-semibold">{item.stage}</h3>
                  <div className="mt-1 text-xs text-white/40">{item.state}</div>
                  <div className="mt-4"><AnimatedBar value={item.progress} tone={item.stage === "Prototype" ? "amber" : "cyan"} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveQueue() {
  return (
    <div className="panel rounded-[2rem] p-6">
      <SectionHeader label="Live Lab Queue" title="Next experiments" meta="3 active slots" />
      <div className="mt-6 grid gap-4">
        {queuedExperiments.map((experiment) => (
          <div
            key={experiment.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[.05]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[.18em] text-cyan-100/60">{experiment.id}</div>
                <h3 className="mt-2 font-semibold text-white/90">{experiment.name}</h3>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/45">
                <span>{experiment.owner}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs">ETA {experiment.eta}</span>
              </div>
            </div>
            <div className="mt-5"><AnimatedBar value={experiment.progress} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusMatrix() {
  return (
    <div className="panel rounded-[2rem] p-6">
      <SectionHeader label="KODEX M-001 Status" title="System readiness matrix" meta="Digital twin checkpoint" />
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {systemStatus.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-black/20 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[.05]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[.18em] text-white/35">{item.label}</div>
                  <div className="mt-3 flex items-center gap-2 text-lg font-semibold text-white">
                    <StatusDot tone={item.tone} />
                    {item.value}
                  </div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-6"><AnimatedBar value={item.progress} tone={item.tone} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AppShell>
      <Topbar
        title="KODEX Research Command Center"
        subtitle="Operational view of experiments, candidates and validation progress."
      />

      <div className="space-y-10 p-6 md:p-8 xl:p-10">
        <section className="grid gap-8 xl:grid-cols-[.88fr_1.12fr]">
          <div className="space-y-7">
            <div className="max-w-3xl">
              <div className="badge inline-flex rounded-full px-3 py-1 text-xs">Operational Core</div>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                KODEX M-001 digital research control layer.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/58">
                Live experiment telemetry, candidate ranking and FEM readiness are consolidated into a single command
                center for electromagnetic discovery.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {kpis.map((kpi) => {
                const Icon = kpi.icon;

                return (
                  <div
                    key={kpi.label}
                    className="panel group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[.07]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-xs uppercase tracking-[.18em] text-white/38">{kpi.label}</div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-100 transition group-hover:bg-cyan-200/15">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-semibold tracking-tight">{kpi.value}</div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-white/45">
                      <StatusDot />
                      {kpi.detail}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="panel rounded-3xl p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-cyan-100">
                    <StatusDot />
                    Command Center Online
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
                    Current validation posture: L1 signal accepted, FEM preparation open, prototype path pending.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs text-white/45">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="text-lg font-semibold text-white">16</div>
                    magnets
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="text-lg font-semibold text-white">0.982</div>
                    score
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="text-lg font-semibold text-white">FEM</div>
                    gate
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DigitalTwinVisual />
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.34fr_.66fr]">
          <SignalPanel />
          <ActivityFeed />
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.12fr_.88fr]">
          <ValidationTimeline />
          <LiveQueue />
        </section>

        <StatusMatrix />
      </div>
    </AppShell>
  );
}
