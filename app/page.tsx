import Link from "next/link";
import { DynamicChart } from "@/components/DynamicChart";
import { MetricCard } from "@/components/MetricCard";
import { metrics } from "@/lib/data";
import { PublicExplainer } from "@/components/PublicExplainer";
import { HomeFooter, MissionSection, ResearchWorkflow } from "@/components/HomeSections";

export default function Landing() {
  return (
    <main className="kdp-bg soft-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-bold tracking-[.32em]">KODEX</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
              Open Platform
            </Link>
            <Link href="/en" className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-cyan-200/40 hover:text-cyan-100">
              English
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
              KODEX Discovery Platform es un entorno de investigación en ingeniería donde nuevas arquitecturas
              electromagnéticas pueden diseñarse, evaluarse, documentarse y validarse progresivamente.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/50">
              Un laboratorio digital para explorar arquitecturas magnéticas mediante funciones espaciales,
              simulación simplificada, ranking automático y un camino conservador hacia FEM, prototipo y publicación.
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
                Entrar al laboratorio
              </Link>
              <Link href="/collaboration" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-200/40 hover:text-cyan-100">
                Colaborar
              </Link>
            </div>
          </div>
          <DynamicChart />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
        </div>

        <MissionSection lang="es" />

        <ResearchWorkflow lang="es" />

        <PublicExplainer lang="es" />

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold">Qué mostramos públicamente</h2>
            <p className="mt-4 leading-7 text-white/55">
              Mostramos metodología, métricas agregadas, gráficos demostrativos y el estado de validación. No publicamos
              aún el código completo del optimizador, genomas sensibles ni archivos CAD completos.
            </p>
          </div>
          <div className="panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold">Qué buscamos</h2>
            <p className="mt-4 leading-7 text-white/55">
              Buscamos colaboración con ingenieros electromagnéticos, universidades, especialistas FEM, makers de
              prototipos e inversionistas interesados en deep tech aplicada a energía y máquinas eléctricas.
            </p>
          </div>
          <div className="panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold">Cómo validaremos</h2>
            <p className="mt-4 leading-7 text-white/55">
              El camino de validación es deliberadamente conservador: modelo dipolar simplificado, simulación FEM,
              diseño físico controlado, medición experimental y comparación contra el modelo.
            </p>
          </div>
        </section>

        <HomeFooter lang="es" />
      </section>
    </main>
  );
}
