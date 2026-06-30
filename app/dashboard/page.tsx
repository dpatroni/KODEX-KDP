import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { DynamicChart, ScoreArea } from "@/components/DynamicChart";
import { MetricCard } from "@/components/MetricCard";
import { ResearchCopy } from "@/components/ResearchCopy";
import { metrics, candidates, roadmap } from "@/lib/data";

export default function Dashboard() {
  return (
    <AppShell>
      <Topbar title="Research Dashboard" subtitle="Magnetic architecture discovery workspace for KODEX M-001." />
      <div className="grid gap-5 p-6 md:grid-cols-4">{metrics.map((m) => <MetricCard key={m.label} {...m}/>)}</div>
      <div className="grid gap-5 px-6 lg:grid-cols-[1.2fr_.8fr]"><DynamicChart/><ScoreArea/></div>
      <div className="grid gap-5 p-6 lg:grid-cols-[.9fr_1.1fr]">
        <ResearchCopy />
        <div className="panel rounded-3xl p-7">
          <h2 className="text-2xl font-semibold">Roadmap status</h2>
          <div className="mt-6 space-y-5">{roadmap.map(([name, progress]: any) => <div key={name}><div className="mb-2 flex justify-between text-sm text-white/60"><span>{name}</span><span>{progress}%</span></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-cyan-200" style={{width:`${progress}%`}} /></div></div>)}</div>
        </div>
      </div>
    </AppShell>
  );
}
