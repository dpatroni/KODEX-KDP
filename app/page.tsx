import Link from "next/link";
import { DynamicChart } from "@/components/DynamicChart";
import { MetricCard } from "@/components/MetricCard";
import { metrics } from "@/lib/data";
import { PublicExplainer } from "@/components/PublicExplainer";

export default function Landing() {
  return (
    <main className="kdp-bg soft-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex items-center justify-between">
          <div className="text-sm font-bold tracking-[.32em]">KODEX</div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950">
              Open Platform
            </Link>
            <Link href="/en" className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70">
              English
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
              Un laboratorio digital para explorar arquitecturas magnéticas mediante funciones espaciales,
              simulación simplificada, ranking automático y validación progresiva.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/50">
              Nuestra investigación parte de una idea simple: la orientación espacial de los imanes no debe tratarse
              como un detalle fijo, sino como una variable matemática que puede diseñarse, medirse y optimizarse.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard" className="rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950">
                Entrar al laboratorio
              </Link>
              <Link href="/collaboration" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80">
                Colaborar
              </Link>
            </div>
          </div>
          <DynamicChart />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
        </div>

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
      </section>
    </main>
  );
}
