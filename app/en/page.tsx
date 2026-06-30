import Link from "next/link";
import { DynamicChart } from "@/components/DynamicChart";
import { MetricCard } from "@/components/MetricCard";
import { metrics } from "@/lib/data";
import { PublicExplainer } from "@/components/PublicExplainer";

export default function EnglishLanding() {
  return (
    <main className="kdp-bg soft-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex items-center justify-between">
          <div className="text-sm font-bold tracking-[.32em]">KODEX</div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950">
              Open Platform
            </Link>
            <Link href="/" className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70">
              Español
            </Link>
          </div>
        </header>

        <div className="grid gap-10 py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="badge inline-flex rounded-full px-4 py-2 text-sm">Public Technical Preview</div>
            <h1 className="mt-7 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              KODEX Discovery Platform
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
              A digital research lab for exploring magnetic architectures through spatial functions, simplified
              simulation, automatic ranking and progressive validation.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/50">
              Our research starts from a simple idea: the spatial orientation of magnets should not be treated as a fixed
              detail, but as a mathematical variable that can be designed, measured and optimized.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard" className="rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950">
                Enter the lab
              </Link>
              <Link href="/collaboration" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80">
                Collaborate
              </Link>
            </div>
          </div>
          <DynamicChart />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
        </div>

        <PublicExplainer lang="en" />

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold">What we show publicly</h2>
            <p className="mt-4 leading-7 text-white/55">
              We show methodology, aggregated metrics, demonstrator charts and validation status. We do not yet publish
              the full optimizer code, sensitive genomes or complete CAD files.
            </p>
          </div>
          <div className="panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold">What we seek</h2>
            <p className="mt-4 leading-7 text-white/55">
              We seek collaboration with electromagnetic engineers, universities, FEM specialists, prototype builders
              and investors interested in deep tech for energy and electric machines.
            </p>
          </div>
          <div className="panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold">How we validate</h2>
            <p className="mt-4 leading-7 text-white/55">
              The validation path is deliberately conservative: simplified dipole model, FEM simulation, controlled
              physical design, experimental measurement and comparison against the model.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
