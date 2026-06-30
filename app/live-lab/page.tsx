 "use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { DynamicChart } from "@/components/DynamicChart";

export default function LiveLab() {
  const [amp, setAmp] = useState(40);
  const [harmonic, setHarmonic] = useState(2);
  const score = (0.72 + amp / 240 + harmonic / 80).toFixed(3);
  return (
    <AppShell>
      <Topbar title="Live Lab" subtitle="Interactive research interface. Current version computes a frontend preview; Python API connection is next." />
      <div className="grid gap-6 p-6 lg:grid-cols-[.75fr_1.25fr]">
        <div className="panel rounded-3xl p-6">
          <h2 className="text-2xl font-semibold">Run candidate preview</h2>
          <label className="mt-6 block text-sm text-white/55">Amplitude: {amp}°</label>
          <input className="mt-3 w-full" type="range" min="5" max="45" value={amp} onChange={(e)=>setAmp(Number(e.target.value))}/>
          <label className="mt-6 block text-sm text-white/55">Harmonic: {harmonic}</label>
          <input className="mt-3 w-full" type="range" min="1" max="5" value={harmonic} onChange={(e)=>setHarmonic(Number(e.target.value))}/>
          <button className="mt-7 w-full rounded-2xl bg-cyan-200 px-5 py-3 font-semibold text-slate-950">Run Experiment Preview</button>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5"><div className="text-sm text-white/45">Estimated KODEX Score</div><div className="mt-2 text-4xl font-semibold">{score}</div></div>
        </div>
        <DynamicChart />
      </div>
    </AppShell>
  );
}
