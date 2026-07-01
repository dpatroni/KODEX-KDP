export const researchDisclaimerText =
  "KDP v1.0 Alpha presents a conceptual research interface. Technical implementation details are confidential and subject to IP review. Access-code previews are informational and do not disclose protected engineering details.";

export function ResearchDisclaimer() {
  return (
    <footer className="px-6 pb-8 pt-2">
      <div className="rounded-3xl border border-white/10 bg-black/20 p-5 text-xs leading-6 text-white/45 backdrop-blur">
        {researchDisclaimerText}
      </div>
    </footer>
  );
}
