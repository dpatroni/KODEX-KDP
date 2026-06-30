import Link from "next/link";
import { DynamicChart } from "@/components/DynamicChart";
import { MetricCard } from "@/components/MetricCard";
import { metrics } from "@/lib/data";
import { PublicExplainer } from "@/components/PublicExplainer";
import { HomeFooter, MissionSection, ResearchWorkflow } from "@/components/HomeSections";

export default function EnglishLanding() {
  return (
    <main className="kdp-bg soft-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-bold tracking-[.32em]">KODEX</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
              Open Platform
            </Link>
            <Link href="/" className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-cyan-200/40 hover:text-cyan-100">
              Español
            </Link>
          </div>
        </header>

        <div className="grid gap-10 pb-16 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="flex flex-wrap gap-3">
              <div className="badge inline-flex rounded-full px-4 py-2 text-sm">Public Technical Preview</div>
              <div className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-white/60">
                KODEX Research Labs
              </div>
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              KODEX Discovery Platform
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-white/75">
              KODEX Discovery Platform is an engineering research environment where new electromagnetic architectures
              can be designed, evaluated, documented and progressively validated.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/50">
              A digital lab for exploring magnetic architectures through spatial functions, simplified simulation,
              automatic ranking and a conservative path toward FEM, prototype and publication.
            </p>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[.18em] text-white/40">Architecture Run</div>
                <div className="mt-2 text-lg font-semibold">5,760</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[.18em] text-white/40">Validation</div>
                <div className="mt-2 text-lg font-semibold">L1 → FEM</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[.18em] text-white/40">Focus</div>
                <div className="mt-2 text-lg font-semibold">Digital Twin</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard" className="rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
                Enter the lab
              </Link>
              <Link href="/collaboration" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-200/40 hover:text-cyan-100">
                Collaborate
              </Link>
            </div>
          </div>
          <DynamicChart />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
        </div>

        <MissionSection lang="en" />

        <ResearchWorkflow lang="en" />

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

        <HomeFooter />
      </section>
    </main>
  );
}
