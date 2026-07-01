import { AppShell } from "@/components/AppShell";
import { ExplorerWorkspace } from "@/components/ExplorerWorkspace";
import { Topbar } from "@/components/Topbar";

export default function Explorer() {
  return (
    <AppShell>
      <Topbar title="Architecture Explorer" subtitle="Automatic ranking of spatial magnetic function candidates." />
      <ExplorerWorkspace />
    </AppShell>
  );
}
