import Link from "next/link";
import { Activity, Atom, BarChart3, BookOpen, FlaskConical, GitBranch, Handshake, Home, Trophy, Waypoints } from "lucide-react";

const items = [
  ["Dashboard", "/dashboard", Home],
  ["Explorer", "/explorer", Waypoints],
  ["Live Lab", "/live-lab", FlaskConical],
  ["Hall of Fame", "/hall-of-fame", Trophy],
  ["Experiments", "/experiments", Activity],
  ["Publications", "/publications", BookOpen],
  ["Roadmap", "/roadmap", GitBranch],
  ["Collaboration", "/collaboration", Handshake],
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-black/20 p-5 backdrop-blur-xl lg:block">
      <Link href="/" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200"><Atom size={22}/></div>
        <div>
          <div className="text-sm font-bold tracking-[.28em]">KODEX</div>
          <div className="text-xs text-white/45">Discovery Platform</div>
        </div>
      </Link>
      <nav className="mt-7 space-y-2">
        {items.map(([label, href, Icon]: any) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/65 hover:bg-white/7 hover:text-white">
            <Icon size={18}/> {label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-5 text-amber-100/75">
        L1 model: preliminary computational evidence. FEM and prototype validation required.
      </div>
    </aside>
  );
}
