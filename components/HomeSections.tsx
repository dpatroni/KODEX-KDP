import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BrainCircuit, Boxes, CircuitBoard, Globe2, Mail, MapPin } from "lucide-react";

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

const researchLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Explorer", href: "/explorer" },
  { label: "Live Lab", href: "/live-lab" },
  { label: "Publications", href: "/publications" },
  { label: "Roadmap", href: "/roadmap" },
];

const footerCopy = {
  es: {
    research: "Investigación",
    contact: "Contacto",
    description:
      "KODEX Research Labs desarrolla plataformas avanzadas de ingeniería para sistemas electromagnéticos, inteligencia artificial y descubrimiento computacional.",
    email: "Correo",
    website: "Sitio web",
    location: "Ubicación",
    locationValue: "Lima, Peru",
    cta: "Contactar al equipo de investigación",
    platform: "KODEX Discovery Platform v0.2 Alpha",
    subline: "Plataforma de investigación • Software experimental • KODEX Research Labs",
  },
  en: {
    research: "Research",
    contact: "Contact",
    description:
      "KODEX Research Labs develops advanced engineering platforms for electromagnetic systems, artificial intelligence and computational discovery.",
    email: "Email",
    website: "Website",
    location: "Location",
    locationValue: "Lima, Peru",
    cta: "Contact Research Team",
    platform: "KODEX Discovery Platform v0.2 Alpha",
    subline: "Research Platform • Experimental Software • KODEX Research Labs",
  },
};

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

export function HomeFooter({ lang = "es" }: { lang?: HomeLang }) {
  const copy = footerCopy[lang];

  return (
    <footer className="relative left-1/2 mt-20 w-screen -translate-x-1/2 border-t border-white/[.08] bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_.75fr_1fr] lg:gap-16">
          <div>
            <div className="text-sm font-bold uppercase tracking-[.28em] text-white/78">
              KODEX Research Labs
            </div>
            <p className="mt-4 max-w-2xl text-xl font-semibold leading-8 text-white">
              Engineering the Future of Electromagnetic Discovery.
            </p>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/48">
              {copy.description}
            </p>
            <p className="mt-9 text-sm text-white/42">© 2026 KODEX Research Labs</p>
          </div>

          <nav aria-label="Footer research navigation">
            <h2 className="text-sm font-semibold uppercase tracking-[.22em] text-white/62">{copy.research}</h2>
            <div className="mt-6 flex flex-col items-start gap-4">
              {researchLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-white/50 transition hover:text-cyan-100">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[.22em] text-white/62">{copy.contact}</h2>
            <div className="mt-6 space-y-6">
              <div className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 text-cyan-100/70" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-[.18em] text-white/32">{copy.email}</div>
                  <Link href="mailto:dpatroni@kodex.pe" className="mt-2 block text-sm text-white/62 transition hover:text-cyan-100">
                    dpatroni@kodex.pe
                  </Link>
                </div>
              </div>
              <div className="flex gap-3">
                <Globe2 className="mt-1 h-4 w-4 text-cyan-100/70" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-[.18em] text-white/32">{copy.website}</div>
                  <Link href="https://kodex.pe" className="mt-2 block text-sm text-white/62 transition hover:text-cyan-100">
                    https://kodex.pe
                  </Link>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 text-cyan-100/70" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-[.18em] text-white/32">{copy.location}</div>
                  <div className="mt-2 text-sm text-white/62">{copy.locationValue}</div>
                </div>
              </div>
            </div>

            <Link
              href="/collaboration"
              className="mt-8 inline-flex rounded-full border border-white/14 bg-white/[.03] px-5 py-3 text-sm font-semibold text-white/78 transition hover:border-cyan-200/40 hover:text-cyan-100"
            >
              {copy.cta}
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-white/[.08] pt-8">
          <div className="flex flex-col gap-3 text-xs leading-6 text-white/36 md:flex-row md:items-center md:justify-between">
            <span>{copy.platform}</span>
            <span>{copy.subline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
