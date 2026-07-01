"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { CheckCircle2, KeyRound, LockKeyhole, Mail, ShieldCheck, X, XCircle } from "lucide-react";

type AccessTab = "code" | "request";

export type RestrictedResource = {
  title: string;
  description: string;
};

export const restrictedResearchResources: RestrictedResource[] = [
  {
    title: "Advanced Candidate Data",
    description: "Conceptual candidate summaries, validation status, and partner-facing ranking context.",
  },
  {
    title: "Technical Architecture Notes",
    description: "High-level notes on the proprietary research framework and confidential architecture under development.",
  },
  {
    title: "Digital Twin Package",
    description: "Overview of digital twin development stages and planned partner review materials.",
  },
  {
    title: "FEM Validation Roadmap",
    description: "IP-safe validation sequence from simplified evidence toward external engineering review.",
  },
  {
    title: "Partner Research Brief",
    description: "Extended research narrative prepared for investors, universities and technical partners.",
  },
  {
    title: "Prototype Notes",
    description: "Conceptual prototype planning notes without manufacturing-ready drawings or parameters.",
  },
];

const interestTypes = [
  "Investment",
  "Technical collaboration",
  "Academic / research",
  "Industrial partner",
  "Media / press",
  "Other",
];

// Demo-only gate for the public preview. This is not production security.
const demoAccessCode = "4321";

export function RestrictedAccessCardGrid({
  resources,
  title = "Restricted Research Access",
  subtitle = "Extended materials are available only to selected collaborators, investors and technical partners.",
}: {
  resources: RestrictedResource[];
  title?: string;
  subtitle?: string;
}) {
  const [activeResource, setActiveResource] = useState<RestrictedResource | null>(null);
  const [initialTab, setInitialTab] = useState<AccessTab>("code");

  function openResource(resource: RestrictedResource, tab: AccessTab) {
    setInitialTab(tab);
    setActiveResource(resource);
  }

  return (
    <section className="px-6 pb-6">
      <div className="panel rounded-3xl p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="badge inline-flex rounded-full px-4 py-2 text-sm">Restricted research access</div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">{subtitle}</p>
          </div>
          <div className="rounded-2xl border border-cyan-200/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
            IP strategy in progress
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <LockedResearchCard key={resource.title} resource={resource} onOpen={openResource} />
          ))}
        </div>
      </div>

      {activeResource ? (
        <RestrictedAccessModal
          initialTab={initialTab}
          resource={activeResource}
          onClose={() => setActiveResource(null)}
        />
      ) : null}
    </section>
  );
}

export function RestrictedMaterialCatalog() {
  return (
    <RestrictedAccessCardGrid
      resources={restrictedResearchResources}
      title="Restricted material catalog"
      subtitle="A high-level catalog of extended research materials available through collaborator access or reviewed partner requests."
    />
  );
}

export function RestrictedAccessInlinePanel({ resource }: { resource: RestrictedResource }) {
  const [activeResource, setActiveResource] = useState<RestrictedResource | null>(null);
  const [initialTab, setInitialTab] = useState<AccessTab>("code");
  const [unlocked, setUnlocked] = useState(false);

  function openModal(tab: AccessTab) {
    setInitialTab(tab);
    setActiveResource(resource);
  }

  return (
    <section className="xl:col-span-2">
      <div className="panel rounded-3xl p-6 shadow-glow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
              <LockKeyhole size={20} />
            </div>
            <p className="mt-5 text-sm text-cyan-100/70">Restricted research access</p>
            <h2 className="mt-2 text-2xl font-semibold">{resource.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              {resource.description} Mock candidate ranking remains conceptual and preliminary.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <button
              type="button"
              onClick={() => openModal("code")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/78 transition hover:border-cyan-200/45 hover:text-cyan-100"
            >
              <KeyRound size={16} />
              Enter Access Code
            </button>
            <button
              type="button"
              onClick={() => openModal("request")}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-200 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
            >
              <Mail size={16} />
              Request Research Access
            </button>
          </div>
        </div>

        {unlocked ? (
          <div className="mt-6">
            <CollaboratorPreview />
          </div>
        ) : null}
      </div>

      {activeResource ? (
        <RestrictedAccessModal
          initialTab={initialTab}
          resource={activeResource}
          onClose={() => setActiveResource(null)}
          onUnlock={() => setUnlocked(true)}
        />
      ) : null}
    </section>
  );
}

export function PartnerAccessSection() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className="px-6 pb-6">
      <div className="panel rounded-3xl p-7">
        <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="badge inline-flex rounded-full px-4 py-2 text-sm">Partner Access</div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight">Partner Access</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60">
              Selected collaborators can access extended research summaries through a private access code. New
              partners, investors and institutions may request access for review.
            </p>

            <div className="mt-7 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-5">
              <ContactLine label="Email" value="dpatroni@kodex.pe" href="mailto:dpatroni@kodex.pe" />
              <ContactLine label="Phone / WhatsApp" value="+51 983 115 213" href="https://wa.me/51983115213" />
            </div>

            {unlocked ? (
              <div className="mt-6">
                <CollaboratorPreview />
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <AccessCodePanel onUnlock={() => setUnlocked(true)} />
            <RequestAccessForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function LockedResearchCard({
  resource,
  onOpen,
}: {
  resource: RestrictedResource;
  onOpen: (resource: RestrictedResource, tab: AccessTab) => void;
}) {
  return (
    <article
      className="group cursor-pointer rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:border-cyan-200/35 hover:bg-cyan-300/[.06]"
      onClick={() => onOpen(resource, "code")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
          <LockKeyhole size={20} />
        </div>
        <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-white/48">
          Locked
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{resource.title}</h3>
      <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/55">{resource.description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(resource, "request");
          }}
          className="rounded-full bg-cyan-200 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          Request Research Access
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(resource, "code");
          }}
          className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/72 transition hover:border-cyan-200/45 hover:text-cyan-100"
        >
          Enter Access Code
        </button>
      </div>
    </article>
  );
}

function RestrictedAccessModal({
  initialTab,
  resource,
  onClose,
  onUnlock,
}: {
  initialTab: AccessTab;
  resource: RestrictedResource;
  onClose: () => void;
  onUnlock?: () => void;
}) {
  const [tab, setTab] = useState<AccessTab>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab, resource.title]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/78 px-4 py-6 backdrop-blur-md">
      <div className="w-full max-w-5xl rounded-3xl border border-white/12 bg-[#07101d] shadow-[0_28px_90px_rgba(0,0,0,.55)]">
        <div className="flex items-start justify-between gap-5 border-b border-white/10 p-6">
          <div>
            <div className="badge inline-flex rounded-full px-3 py-1 text-xs">Restricted research access</div>
            <h2 className="mt-4 text-3xl font-semibold">Restricted Research Access</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">
              KODEX shares extended research materials only with selected collaborators, investors and technical
              partners.
            </p>
            <p className="mt-2 text-xs text-white/38">Selected material: {resource.title}</p>
          </div>
          <button
            type="button"
            aria-label="Close restricted research access modal"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-cyan-200/45 hover:text-cyan-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-5 p-6 lg:grid-cols-2">
          <div className={`rounded-3xl border p-5 ${tab === "code" ? "border-cyan-200/35 bg-cyan-300/[.06]" : "border-white/10 bg-black/18"}`}>
            <TabButton active={tab === "code"} icon={<KeyRound size={16} />} onClick={() => setTab("code")}>
              I have an access code
            </TabButton>
            <div className={tab === "code" ? "mt-5 block" : "mt-5 hidden lg:block"}>
              <AccessCodePanel onUnlock={onUnlock} />
            </div>
          </div>

          <div className={`rounded-3xl border p-5 ${tab === "request" ? "border-cyan-200/35 bg-cyan-300/[.06]" : "border-white/10 bg-black/18"}`}>
            <TabButton active={tab === "request"} icon={<Mail size={16} />} onClick={() => setTab("request")}>
              Request access
            </TabButton>
            <div className={tab === "request" ? "mt-5 block" : "mt-5 hidden lg:block"}>
              <RequestAccessForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccessCodePanel({ onUnlock }: { onUnlock?: () => void }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (code.trim() === demoAccessCode) {
      setStatus("success");
      onUnlock?.();
      return;
    }

    setStatus("error");
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <h3 className="text-lg font-semibold">I have an access code</h3>
      <form className="mt-4 space-y-4" onSubmit={submitCode}>
        <Field label="Access code">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-200/45"
            inputMode="numeric"
            placeholder="Enter collaborator code"
            type="password"
          />
        </Field>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          <ShieldCheck size={16} />
          Unlock collaborator preview
        </button>
      </form>

      {status === "success" ? (
        <StatusMessage tone="success">Access granted. Collaborator preview unlocked.</StatusMessage>
      ) : null}
      {status === "error" ? (
        <StatusMessage tone="error">Invalid code. Please request access or contact KODEX.</StatusMessage>
      ) : null}

      {status === "success" ? (
        <div className="mt-5">
          <CollaboratorPreview compact />
        </div>
      ) : null}
    </div>
  );
}

function RequestAccessForm() {
  const [submitted, setSubmitted] = useState(false);

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <h3 className="text-lg font-semibold">Request access</h3>
      <form className="mt-4 grid gap-4" onSubmit={submitRequest}>
        <Field label="Full name">
          <InputField autoComplete="name" required />
        </Field>
        <Field label="Company / Institution">
          <InputField autoComplete="organization" required />
        </Field>
        <Field label="Role / Position">
          <InputField required />
        </Field>
        <Field label="Email">
          <InputField autoComplete="email" required type="email" />
        </Field>
        <Field label="Country">
          <InputField autoComplete="country-name" required />
        </Field>
        <Field label="Interest type">
          <select
            required
            className="w-full rounded-2xl border border-white/10 bg-[#08111f] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-200/45"
            defaultValue=""
          >
            <option value="" disabled>
              Select interest type
            </option>
            {interestTypes.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Message">
          <textarea
            required
            rows={4}
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-200/45"
          />
        </Field>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          Submit access request
        </button>
      </form>

      {submitted ? (
        <StatusMessage tone="success">Request received. The KODEX team will review your access request.</StatusMessage>
      ) : null}
    </div>
  );
}

function CollaboratorPreview({ compact = false }: { compact?: boolean }) {
  const previewItems = [
    "Extended project overview with IP-safe research context.",
    "Validation roadmap summary from conceptual evidence to external review.",
    "Candidate families described at a conceptual level.",
    "Digital twin development stages and partner review milestones.",
    "Collaboration opportunities for research, validation and strategic review.",
  ];

  return (
    <div className="rounded-2xl border border-cyan-200/20 bg-cyan-300/[.08] p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
        <CheckCircle2 size={17} />
        Collaborator Preview
      </div>
      {!compact ? (
        <p className="mt-3 text-sm leading-6 text-white/60">
          This preview shares extended marketing and research summaries only. It does not include confidential
          implementation details, protected engineering parameters or manufacturing-ready materials.
        </p>
      ) : null}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {previewItems.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-black/18 p-4 text-sm leading-6 text-white/62">
            {item}
          </div>
        ))}
      </div>
      <a
        href="mailto:dpatroni@kodex.pe"
        className="mt-5 inline-flex rounded-full border border-cyan-200/30 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10"
      >
        Contact KODEX about partner research access
      </a>
    </div>
  );
}

function Field({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-white/52">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function InputField({
  autoComplete,
  required,
  type = "text",
}: {
  autoComplete?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <input
      autoComplete={autoComplete}
      required={required}
      type={type}
      className="w-full rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-200/45"
    />
  );
}

function TabButton({
  active,
  children,
  icon,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-full items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
        active
          ? "border-cyan-200/45 bg-cyan-300/10 text-cyan-100"
          : "border-white/10 bg-white/[.03] text-white/60 hover:border-white/20 hover:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function StatusMessage({ children, tone }: { children: ReactNode; tone: "success" | "error" }) {
  const Icon = tone === "success" ? CheckCircle2 : XCircle;
  const className =
    tone === "success"
      ? "border-cyan-200/20 bg-cyan-300/10 text-cyan-50"
      : "border-rose-200/25 bg-rose-400/10 text-rose-100";

  return (
    <div className={`mt-4 flex items-start gap-2 rounded-2xl border p-4 text-sm leading-6 ${className}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function ContactLine({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-white/10 bg-white/[.03] p-4 transition hover:border-cyan-200/35"
    >
      <div className="text-xs uppercase tracking-[.16em] text-white/38">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/82">{value}</div>
    </a>
  );
}
