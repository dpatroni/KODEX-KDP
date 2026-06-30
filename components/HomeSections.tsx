import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BrainCircuit, Boxes, CircuitBoard } from "lucide-react";

type HomeLang = "es" | "en";

const missionCards: Record<
  HomeLang,
  Array<{ title: string; body: string; icon: LucideIcon }>
> = {
  es: [
    {
      title: "Engineering",
      body: "Diseño, comparación y documentación de arquitecturas electromagnéticas con criterios técnicos trazables.",
      icon: CircuitBoard,
    },
    {
      title: "Artificial Intelligence",
      body: "Exploración asistida por modelos computacionales para priorizar candidatos, patrones y rutas de validación.",
      icon: BrainCircuit,
    },
    {
      title: "Digital Twin",
      body: "Representaciones progresivas del sistema físico para conectar hipótesis, simulación, evidencia y prototipo.",
      icon: Boxes,
    },
  ],
  en: [
    {
      title: "Engineering",
      body: "Design, comparison and documentation of electromagnetic architectures with traceable technical criteria.",
      icon: CircuitBoard,
    },
    {
      title: "Artificial Intelligence",
      body: "Model-assisted exploration to prioritize candidates, patterns and validation paths.",
      icon: BrainCircuit,
    },
    {
      title: "Digital Twin",
      body: "Progressive representations of the physical system connecting hypothesis, simulation, evidence and prototype.",
      icon: Boxes,
    },
  ],
};

const workflowSteps: Record<HomeLang, Array<{ label: string; body: string }>> = {
  es: [
    { label: "Idea", body: "Hipótesis técnica y criterio de investigación." },
    { label: "Diseño", body: "Arquitecturas, funciones espaciales y parámetros." },
    { label: "Simulación", body: "Modelo computacional y ranking reproducible." },
    { label: "Validación", body: "FEM, prototipo físico y medición controlada." },
    { label: "Publicación", body: "Documentación técnica y evidencia compartible." },
  ],
  en: [
    { label: "Idea", body: "Technical hypothesis and research criteria." },
    { label: "Design", body: "Architectures, spatial functions and parameters." },
    { label: "Simulation", body: "Computational model and reproducible ranking." },
    { label: "Validation", body: "FEM, physical prototype and controlled measurement." },
    { label: "Publication", body: "Technical documentation and shareable evidence." },
  ],
};

const footerLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Experiments", href: "/experiments" },
  { label: "Explorer", href: "/explorer" },
  { label: "Publications", href: "/publications" },
  { label: "Roadmap", href: "/roadmap" },
];

export function MissionSection({ lang }: { lang: HomeLang }) {
  const es = lang === "es";

  return (
    <section className="mt-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="badge inline-flex rounded-full px-4 py-2 text-sm">Mission</div>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
            {es
              ? "Convertir investigación electromagnética en conocimiento medible."
              : "Turning electromagnetic research into measurable knowledge."}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/50">
          {es
            ? "KODEX organiza la transición desde exploración computacional hacia validación física progresiva."
            : "KODEX organizes the transition from computational exploration toward progressive physical validation."}
        </p>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {missionCards[lang].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="panel rounded-3xl p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] text-cyan-200">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-white/55">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ResearchWorkflow({ lang }: { lang: HomeLang }) {
  const es = lang === "es";

  return (
    <section className="panel mt-10 rounded-3xl p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="badge inline-flex rounded-full px-4 py-2 text-sm">Research Workflow</div>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight md:text-4xl">
            {es
              ? "Un flujo de investigación para avanzar con evidencia, no con promesas."
              : "A research flow for advancing with evidence, not promises."}
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-white/50">
          {es
            ? "Cada etapa deja artefactos verificables para reducir incertidumbre técnica."
            : "Each stage leaves verifiable artifacts to reduce technical uncertainty."}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 xl:flex-row xl:items-stretch">
        {workflowSteps[lang].map((step, index) => (
          <div key={step.label} className="contents">
            <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-cyan-200/70">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.label}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{step.body}</p>
            </div>
            {index < workflowSteps[lang].length - 1 ? (
              <div className="flex items-center justify-center text-cyan-200/50 xl:px-1">
                <ArrowRight className="h-5 w-5 rotate-90 xl:rotate-0" aria-hidden="true" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeFooter() {
  return (
    <footer className="relative left-1/2 mt-16 w-screen -translate-x-1/2 border-t border-white/[.08] bg-[#050608]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <div className="text-sm font-bold uppercase tracking-[.28em] text-white/72">
              KODEX Research Labs
            </div>
            <p className="mt-4 max-w-2xl text-xl font-semibold leading-8 text-white">
              Engineering the Future of Electromagnetic Discovery.
            </p>
            <p className="mt-3 text-sm text-white/50">Version 0.2 — Public Technical Preview</p>
            <p className="mt-7 max-w-2xl text-sm leading-6 text-white/48">
              Advancing electromagnetic engineering through mathematics, simulation and artificial intelligence.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm lg:max-w-md lg:justify-end" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/55 transition hover:text-cyan-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-white/[.06] pt-6 text-sm text-white/42">
          © 2026 KODEX Research Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
