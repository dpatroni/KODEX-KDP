export function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="panel rounded-3xl p-6"><div className="text-sm text-white/45">{label}</div><div className="mt-3 text-3xl font-semibold">{value}</div><div className="mt-3 text-sm text-white/45">{detail}</div></div>;
}
