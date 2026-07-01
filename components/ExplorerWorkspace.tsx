"use client";

import { useMemo, useState } from "react";
import { Download, ExternalLink, Play, Send, SlidersHorizontal } from "lucide-react";
import { candidates } from "@/lib/data";
import { RestrictedAccessInlinePanel, restrictedResearchResources } from "@/components/RestrictedAccess";

type Candidate = (typeof candidates)[number];

const magnetCounts = [8, 16, 24, 32];
const families = ["SMF-SIN", "SMF-COS", "SMF-HYBRID", "Half-Twist"];
const harmonics = [1, 2, 3, 4];
const betaModes = ["standard", "progressive", "paired"];

const familyColors: Record<string, string> = {
  "SMF-SIN": "#67E8F9",
  "SMF-COS": "#8EF0C7",
  "SMF-HYBRID": "#B794F6",
  "Half-Twist": "#FDE68A",
};

const statusClasses: Record<string, string> = {
  "Ready for FEM": "border-cyan-200/30 bg-cyan-300/10 text-cyan-100",
  Ranked: "border-sky-200/25 bg-sky-400/10 text-sky-100",
  Candidate: "border-purple-200/25 bg-purple-400/10 text-purple-100",
  Exploratory: "border-amber-200/25 bg-amber-300/10 text-amber-100",
};

export function ExplorerWorkspace() {
  const [magnetCount, setMagnetCount] = useState(16);
  const [selectedFamilies, setSelectedFamilies] = useState(families);
  const [amplitude, setAmplitude] = useState(40);
  const [selectedHarmonics, setSelectedHarmonics] = useState(harmonics);
  const [betaMode, setBetaMode] = useState("progressive");
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidates[0].id);
  const [feedback, setFeedback] = useState("Ready to inspect ranked candidates.");

  const selectedCandidate = useMemo(
    () => candidates.find((candidate) => candidate.id === selectedCandidateId) ?? candidates[0],
    [selectedCandidateId],
  );

  function toggleListValue<T>(value: T, values: T[], setter: (next: T[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function runExploration() {
    const activeFamilies = selectedFamilies.length ? selectedFamilies.join(", ") : "no families";
    const message = `Mock exploration queued: ${magnetCount} magnets, ${activeFamilies}, harmonic set ${selectedHarmonics.join("/") || "none"}.`;
    setFeedback(message);
    console.log("[KDP Explorer]", message);
  }

  function handleCandidateAction(action: string, candidate = selectedCandidate) {
    const message = `${action} requested for ${candidate.id}. Placeholder action logged.`;
    setSelectedCandidateId(candidate.id);
    setFeedback(message);
    console.log("[KDP Explorer]", message);
  }

  return (
    <div className="grid gap-6 p-6 xl:grid-cols-[380px_minmax(0,1fr)]">
      <SearchSpacePanel
        amplitude={amplitude}
        betaMode={betaMode}
        magnetCount={magnetCount}
        selectedFamilies={selectedFamilies}
        selectedHarmonics={selectedHarmonics}
        onAmplitudeChange={setAmplitude}
        onBetaModeChange={setBetaMode}
        onMagnetCountChange={setMagnetCount}
        onRunExploration={runExploration}
        onToggleFamily={(family) => toggleListValue(family, selectedFamilies, setSelectedFamilies)}
        onToggleHarmonic={(harmonic) => toggleListValue(harmonic, selectedHarmonics, setSelectedHarmonics)}
      />

      <CandidateTable
        selectedCandidateId={selectedCandidate.id}
        onAction={handleCandidateAction}
        onSelectCandidate={setSelectedCandidateId}
      />

      <div className="grid gap-6 xl:col-span-2 lg:grid-cols-[0.9fr_1.1fr]">
        <CandidateDetail candidate={selectedCandidate} feedback={feedback} onAction={handleCandidateAction} />
        <ArchitectureSignature candidate={selectedCandidate} />
      </div>

      <RestrictedAccessInlinePanel resource={restrictedResearchResources[0]} />
    </div>
  );
}

function SearchSpacePanel({
  amplitude,
  betaMode,
  magnetCount,
  selectedFamilies,
  selectedHarmonics,
  onAmplitudeChange,
  onBetaModeChange,
  onMagnetCountChange,
  onRunExploration,
  onToggleFamily,
  onToggleHarmonic,
}: {
  amplitude: number;
  betaMode: string;
  magnetCount: number;
  selectedFamilies: string[];
  selectedHarmonics: number[];
  onAmplitudeChange: (value: number) => void;
  onBetaModeChange: (value: string) => void;
  onMagnetCountChange: (value: number) => void;
  onRunExploration: () => void;
  onToggleFamily: (value: string) => void;
  onToggleHarmonic: (value: number) => void;
}) {
  return (
    <section className="panel rounded-3xl p-6 shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-100/70">Search Space / Parameters</p>
          <h2 className="mt-2 text-2xl font-semibold">Exploration controls</h2>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
          <SlidersHorizontal size={20} />
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <ControlGroup label="Magnet count">
          <div className="grid grid-cols-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-1">
            {magnetCounts.map((count) => (
              <button
                key={count}
                type="button"
                aria-pressed={magnetCount === count}
                onClick={() => onMagnetCountChange(count)}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  magnetCount === count ? "bg-cyan-200 text-slate-950" : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </ControlGroup>

        <ControlGroup label="Families">
          <div className="flex flex-wrap gap-2">
            {families.map((family) => (
              <ChipButton
                key={family}
                active={selectedFamilies.includes(family)}
                label={family}
                onClick={() => onToggleFamily(family)}
              />
            ))}
          </div>
        </ControlGroup>

        <ControlGroup label="Amplitude range" value={`5-${amplitude} deg`}>
          <div>
            <input
              aria-label="Amplitude maximum"
              type="range"
              min={5}
              max={40}
              step={1}
              value={amplitude}
              onChange={(event) => onAmplitudeChange(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-200"
            />
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>5 deg</span>
              <span>40 deg</span>
            </div>
          </div>
        </ControlGroup>

        <ControlGroup label="Harmonics">
          <div className="flex flex-wrap gap-2">
            {harmonics.map((harmonic) => (
              <ChipButton
                key={harmonic}
                active={selectedHarmonics.includes(harmonic)}
                label={String(harmonic)}
                onClick={() => onToggleHarmonic(harmonic)}
              />
            ))}
          </div>
        </ControlGroup>

        <ControlGroup label="Pattern modes">
          <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            {betaModes.map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={betaMode === mode}
                onClick={() => onBetaModeChange(mode)}
                className={`rounded-2xl border px-3 py-2 text-sm transition ${
                  betaMode === mode
                    ? "border-cyan-200/50 bg-cyan-300/10 text-cyan-100"
                    : "border-white/10 bg-white/[.03] text-white/55 hover:border-white/20 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </ControlGroup>
      </div>

      <button
        type="button"
        onClick={onRunExploration}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
      >
        <Play size={16} />
        Run exploration
      </button>

      <p className="mt-5 rounded-2xl border border-amber-200/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100/75">
        L1 ranking uses preliminary computational evidence. FEM and prototype validation required.
      </p>
    </section>
  );
}

function CandidateTable({
  selectedCandidateId,
  onAction,
  onSelectCandidate,
}: {
  selectedCandidateId: string;
  onAction: (action: string, candidate: Candidate) => void;
  onSelectCandidate: (id: string) => void;
}) {
  return (
    <section className="panel rounded-3xl p-6 shadow-glow">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-cyan-100/70">Top Candidates</p>
          <h2 className="mt-2 text-2xl font-semibold">Ranked architectures</h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-white/42">
            Conceptual L1 ranking for public preview. Extended candidate data remains restricted and IP-safe.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-white/55">
          {candidates.length} visible / 5,760 scanned
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[1120px] text-left text-sm">
          <colgroup>
            <col className="w-[7%]" />
            <col className="w-[36%]" />
            <col className="w-[13%]" />
            <col className="w-[9%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
            <col className="w-[13%]" />
          </colgroup>
          <thead className="bg-white/[.06] text-xs text-white/45">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Rank</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Candidate</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Family</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Score</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Validation</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Status</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => {
              const selected = candidate.id === selectedCandidateId;

              return (
                <tr
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate.id)}
                  className={`cursor-pointer border-t border-white/10 transition ${
                    selected ? "bg-cyan-300/10 shadow-[inset_3px_0_0_rgba(103,232,249,.95)]" : "hover:bg-white/[.04]"
                  }`}
                >
                  <td className="px-4 py-4 text-white/70">#{candidate.rank}</td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-white">{candidate.id}</div>
                    <div className="mt-1 text-xs text-white/40">{candidate.summary}</div>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span
                      className="inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs"
                      style={{
                        borderColor: `${familyColors[candidate.family]}55`,
                        backgroundColor: `${familyColors[candidate.family]}18`,
                        color: familyColors[candidate.family],
                      }}
                    >
                      {candidate.family}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-cyan-50">{candidate.score.toFixed(3)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-white/60">{candidate.validation}</td>
                  <td className="px-4 py-4 align-middle">
                    <span className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs ${statusClasses[candidate.status] ?? "border-white/10 bg-white/5 text-white/60"}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right align-middle">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onAction("Open candidate", candidate);
                      }}
                      className="inline-flex min-w-[154px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/75 transition hover:border-cyan-200/50 hover:text-cyan-100"
                    >
                      <ExternalLink size={14} />
                      Open candidate
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CandidateDetail({
  candidate,
  feedback,
  onAction,
}: {
  candidate: Candidate;
  feedback: string;
  onAction: (action: string, candidate: Candidate) => void;
}) {
  const nextAction = candidate.id === "CAND-001317" ? "Prepare partner validation brief" : "Compare against baseline";
  const details = [
    ["Candidate ID", candidate.id],
    ["Family", candidate.family],
    ["Rank", `#${candidate.rank}`],
    ["Score", candidate.score.toFixed(3)],
    ["Validation level", candidate.validation],
    ["Status", candidate.status],
    ["Magnet count", "Restricted summary"],
    ["Geometry class", "Confidential architecture under development"],
    ["Search method", "Spatial Magnetic Function ranking"],
    ["Next action", nextAction],
  ];

  return (
    <section className="panel rounded-3xl p-6 shadow-glow">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-cyan-100/70">Candidate Detail</p>
          <h2 className="mt-2 text-2xl font-semibold">{candidate.id}</h2>
          <p className="mt-2 text-sm text-white/50">{candidate.summary}</p>
        </div>
        <span className={`w-fit rounded-full border px-3 py-1 text-xs ${statusClasses[candidate.status] ?? "border-white/10 bg-white/5 text-white/60"}`}>
          {candidate.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="text-xs text-white/40">{label}</div>
            <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <ActionButton icon={<ExternalLink size={16} />} label="Open candidate" onClick={() => onAction("Open candidate", candidate)} />
        <ActionButton icon={<Send size={16} />} label="Send to Live Lab" onClick={() => onAction("Send to Live Lab", candidate)} />
        <ActionButton icon={<Download size={16} />} label="Export safe brief" onClick={() => onAction("Export safe brief", candidate)} />
      </div>

      <p className="mt-5 rounded-2xl border border-cyan-200/15 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50/75">
        {feedback}
      </p>
    </section>
  );
}

function ArchitectureSignature({ candidate }: { candidate: Candidate }) {
  const magnetCount = 16;
  const accent = familyColors[candidate.family] ?? "#67E8F9";
  const activeMarker = candidate.rank % magnetCount;
  const companionMarker = (activeMarker + 8) % magnetCount;
  const waveformPoints = buildWaveformPoints(candidate);

  return (
    <section className="panel overflow-hidden rounded-3xl p-6 shadow-glow">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-cyan-100/70">Architecture signature</p>
          <h2 className="mt-2 text-2xl font-semibold">Magnetic architecture map</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-white/55">
          {candidate.family} / {candidate.validation}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative min-h-[310px] rounded-3xl border border-white/10 bg-black/20 p-4">
          <svg viewBox="0 0 340 320" role="img" aria-label={`${candidate.id} magnetic architecture signature`} className="h-full min-h-[280px] w-full">
            <defs>
              <radialGradient id="rotorGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
                <stop offset="58%" stopColor={accent} stopOpacity="0.08" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </radialGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width="340" height="320" fill="transparent" />
            <circle cx="166" cy="137" r="100" fill="url(#rotorGlow)" />
            <circle cx="166" cy="137" r="82" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
            <circle cx="166" cy="137" r="51" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
            <circle cx="166" cy="137" r="8" fill={accent} filter="url(#softGlow)" />

            {Array.from({ length: magnetCount }).map((_, index) => {
              const angle = (360 / magnetCount) * index;
              const active = index === activeMarker;
              const companion = index === companionMarker;

              return (
                <g key={index} transform={`translate(166 137) rotate(${angle}) translate(0 -83)`}>
                  <rect
                    x="-5"
                    y="-17"
                    width="10"
                    height="34"
                    rx="2"
                    fill={active ? accent : companion ? "#8EF0C7" : "rgba(255,255,255,.22)"}
                    stroke={active || companion ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.22)"}
                    strokeWidth={active ? 1.4 : 0.7}
                    filter={active ? "url(#softGlow)" : undefined}
                  />
                </g>
              );
            })}

            <line x1="166" y1="137" x2="254" y2="98" stroke={accent} strokeWidth="2" strokeLinecap="round" />
            <circle cx="254" cy="98" r="4" fill={accent} />
            <path d="M40 262 C78 224, 109 290, 145 252 S214 220, 254 254 S302 278, 322 238" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="8" strokeLinecap="round" />
            <polyline points={waveformPoints} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#softGlow)" />

            <text x="34" y="32" fill="rgba(255,255,255,.55)" fontSize="11">Magnet array</text>
            <text x="234" y="82" fill="rgba(255,255,255,.55)" fontSize="11">field pattern</text>
            <text x="34" y="302" fill="rgba(255,255,255,.55)" fontSize="11">harmonic signature</text>
          </svg>
        </div>

        <div className="space-y-3">
          <SignatureMetric label="Magnet array" value="16 axial markers" />
          <SignatureMetric label="Field pattern" value={phaseLabel(candidate)} />
          <SignatureMetric label="Harmonic signature" value={harmonicLabel(candidate)} />
          <div className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
            <div className="text-xs text-white/40">Selected candidate</div>
            <div className="mt-2 text-sm font-semibold" style={{ color: accent }}>
              {candidate.id}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlGroup({ children, label, value }: { children: React.ReactNode; label: string; value?: string }) {
  return (
    <div className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-white/75">{label}</label>
        {value ? <span className="rounded-full border border-white/10 bg-white/[.04] px-2.5 py-1 text-xs text-cyan-100/80">{value}</span> : null}
      </div>
      {children}
    </div>
  );
}

function ChipButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-sm transition ${
        active
          ? "border-cyan-200/45 bg-cyan-300/10 text-cyan-100"
          : "border-white/10 bg-white/[.03] text-white/55 hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
    >
      {icon}
      {label}
    </button>
  );
}

function SignatureMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <div className="text-xs text-white/40">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
    </div>
  );
}

function buildWaveformPoints(candidate: Candidate) {
  const phase = candidate.rank * 0.13;
  const familyShift = candidate.family === "SMF-COS" ? Math.PI / 2 : candidate.family === "SMF-HYBRID" ? Math.PI / 4 : 0;

  return Array.from({ length: 42 })
    .map((_, index) => {
      const x = 40 + index * 6.8;
      const wave = Math.sin(index * 0.52 + phase + familyShift) * 15;
      const harmonic = Math.sin(index * 1.04 + phase) * (candidate.family === "Half-Twist" ? 9 : 5);
      const y = 258 - wave - harmonic - (candidate.score - 0.8) * 28;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function phaseLabel(candidate: Candidate) {
  if (candidate.id === "CAND-001317") return "restricted lead pattern";
  if (candidate.family === "SMF-COS") return "cosine offset";
  if (candidate.family === "Half-Twist") return "half-turn bias";
  return "conceptual pattern";
}

function harmonicLabel(candidate: Candidate) {
  if (candidate.family === "SMF-HYBRID") return "H1 + H3 blend";
  if (candidate.family === "Half-Twist") return "H2 exploratory";
  return candidate.rank <= 2 ? "H2 dominant" : "H1/H2 ranked";
}
