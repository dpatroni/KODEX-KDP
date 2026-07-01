import { Sidebar } from "./Sidebar";
import { ResearchDisclaimer } from "./ResearchDisclaimer";
export function AppShell({ children }: { children: React.ReactNode }) {
  return <main className="kdp-bg soft-grid min-h-screen"><Sidebar/><section className="lg:pl-72">{children}<ResearchDisclaimer /></section></main>;
}
