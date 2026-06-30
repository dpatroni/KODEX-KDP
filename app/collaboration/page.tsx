import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";

const collaborationNeeds = [
  "Research collaboration",
  "Technical validation",
  "Engineering partnerships",
  "Early-stage scientific discussion",
  "FEM / Maxwell simulation support",
  "Prototype and laboratory validation",
];

const contactItems = [
  { label: "Name", value: "Daniel Patroni", icon: UserRound },
  { label: "Role", value: "KODEX Research Labs", icon: UserRound },
  { label: "Email", value: "dpatroni@kodex.pe", icon: Mail },
  { label: "Phone / WhatsApp", value: "+51 983 115 213", icon: Phone },
  { label: "Location", value: "Peru", icon: MapPin },
];

export default function Collaboration() {
  return (
    <AppShell>
      <Topbar
        title="Collaboration"
        subtitle="Direct contact for research, engineering validation and early technical partnerships."
      />

      <div className="grid gap-6 p-6 xl:grid-cols-[1.1fr_.9fr]">
        <section className="panel overflow-hidden rounded-3xl p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="badge inline-flex rounded-full px-4 py-2 text-sm">KODEX Research Labs</div>
              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight">
                Collaborate with KODEX Research Labs
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">
                We are open to research collaboration, technical validation, engineering partnerships and early-stage
                scientific discussion.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/45">
                Estamos abiertos a colaboración en investigación, validación técnica, alianzas de ingeniería y
                conversaciones científicas tempranas.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-4 py-3 text-sm text-cyan-100">
              Public Technical Preview
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-3 text-sm text-white/42">
                    <Icon className="h-4 w-4 text-cyan-100/75" aria-hidden="true" />
                    {item.label}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-white">{item.value}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="mailto:dpatroni@kodex.pe"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </Link>
            <Link
              href="https://wa.me/51983115213"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-200/40 hover:text-cyan-100"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </Link>
          </div>
        </section>

        <aside className="panel rounded-3xl p-7">
          <div className="badge inline-flex rounded-full px-4 py-2 text-sm">Collaboration Areas</div>
          <h2 className="mt-6 text-2xl font-semibold">Where partners can contribute</h2>
          <div className="mt-6 space-y-3">
            {collaborationNeeds.map((need) => (
              <div key={need} className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm text-white/65">
                {need}
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border border-cyan-200/20 bg-cyan-200/[.07] p-5">
            <div className="text-sm font-semibold text-cyan-100">Validation roadmap</div>
            <p className="mt-3 text-sm leading-6 text-white/55">
              KODEX is presenting a reproducible methodology, early computational evidence and a clear path from
              simplified model to FEM, prototype and laboratory data.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
