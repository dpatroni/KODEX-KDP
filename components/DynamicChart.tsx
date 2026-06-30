 "use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from "recharts";

const data = Array.from({ length: 73 }).map((_, i) => {
  const theta = i * 5;
  return {
    theta,
    baseline: Math.sin(theta * Math.PI / 180) * 0.42,
    candidate: Math.sin(theta * 2 * Math.PI / 180 + 0.8) * 0.63 + Math.sin(theta * Math.PI / 180) * 0.18,
    torque: Math.sin(theta * 2 * Math.PI / 180 + 1.1) * 0.5,
  };
});

export function DynamicChart() {
  return (
    <div className="panel rounded-3xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <div><h3 className="text-xl font-semibold">Dynamic Magnetic Response</h3><p className="text-sm text-white/45">relative flux and torque proxy</p></div>
        <span className="badge rounded-full px-3 py-1 text-xs">simulation preview</span>
      </div>
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
            <XAxis dataKey="theta" stroke="rgba(255,255,255,.45)" />
            <YAxis stroke="rgba(255,255,255,.45)" />
            <Tooltip contentStyle={{ background: "#0B1020", border: "1px solid rgba(255,255,255,.15)", borderRadius: 12 }} />
            <Legend />
            <Line type="monotone" dataKey="baseline" stroke="#7DB7FF" dot={false} name="EXP-001" />
            <Line type="monotone" dataKey="candidate" stroke="#8EF0C7" dot={false} name="CAND-001317" />
            <Line type="monotone" dataKey="torque" stroke="#B794F6" dot={false} name="Torque proxy" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ScoreArea() {
  const rows = Array.from({ length: 30 }).map((_, i) => ({ run: i + 1, score: 0.55 + Math.log(i + 1) / 10 + Math.sin(i) * 0.025 }));
  return (
    <div className="panel rounded-3xl p-6">
      <h3 className="text-xl font-semibold">Explorer convergence</h3>
      <p className="mt-1 text-sm text-white/45">score trend across candidate batches</p>
      <div className="mt-5 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rows}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
            <XAxis dataKey="run" stroke="rgba(255,255,255,.45)" />
            <YAxis stroke="rgba(255,255,255,.45)" />
            <Tooltip contentStyle={{ background: "#0B1020", border: "1px solid rgba(255,255,255,.15)", borderRadius: 12 }} />
            <Area type="monotone" dataKey="score" stroke="#8EF0C7" fill="rgba(142,240,199,.18)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
