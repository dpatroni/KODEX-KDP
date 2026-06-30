import Link from "next/link";
export function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 border-b border-white/10 px-6 py-6 md:flex-row md:items-end">
      <div>
        <div className="badge inline-flex rounded-full px-3 py-1 text-xs">KDP v1.0 Alpha</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-white/55">{subtitle}</p>
      </div>
      <div className="flex gap-3">
        <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/65">Home</Link>
        <Link href="/en" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">English</Link>
      </div>
    </div>
  );
}
