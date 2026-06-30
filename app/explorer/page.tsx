import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { candidates } from "@/lib/data";

export default function Explorer() {
  return (
    <AppShell>
      <Topbar title="Architecture Explorer" subtitle="Automatic ranking of spatial magnetic function candidates." />
      <div className="grid gap-6 p-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="panel rounded-3xl p-6">
          <h2 className="text-2xl font-semibold">Search space</h2>
          {["Magnet count: 16", "Families: sin, cos, hybrid, half-twist", "Amplitude range: 5°–40°", "Harmonics: 1–4", "Beta modes: fixed, theta, double-theta"].map((x) => <div key={x} className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/65">{x}</div>)}
        </div>
        <div className="panel rounded-3xl p-6">
          <h2 className="text-2xl font-semibold">Top candidates</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm"><thead className="bg-white/5 text-white/55"><tr><th className="p-4">Rank</th><th>Candidate</th><th>Family</th><th>Score</th><th>Validation</th></tr></thead><tbody>{candidates.map(c=><tr key={c.id} className="border-t border-white/10"><td className="p-4">{c.rank}</td><td className="font-medium">{c.id}</td><td className="text-white/60">{c.family}</td><td>{c.score.toFixed(3)}</td><td>{c.validation}</td></tr>)}</tbody></table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
