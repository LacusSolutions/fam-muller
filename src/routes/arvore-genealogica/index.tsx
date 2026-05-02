import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import {
  ReactFlow, Background, Controls, MiniMap, Handle, Position,
  type Node, type Edge, type NodeProps, ReactFlowProvider, useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { members, getMember } from "@/data/mockData";

export const Route = createFileRoute("/arvore-genealogica/")({
  head: () => ({
    meta: [
      { title: "Árvore Genealógica — Família Müller" },
      { name: "description", content: "Explore as quatro gerações da Família Müller em uma árvore genealógica interativa." },
      { property: "og:title", content: "Árvore Genealógica — Família Müller" },
      { property: "og:description", content: "Quatro gerações conectadas." },
    ],
  }),
  component: TreePageWrapper,
});

type MemberNodeData = { id: string; name: string; photo: string; years: string; isActive: boolean };

function MemberNode({ data }: NodeProps) {
  const d = data as unknown as MemberNodeData;
  return (
    <div className={`group relative flex flex-col items-center w-[120px] cursor-pointer`}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <div className={`rounded-full p-1 ${d.isActive ? "bg-primary" : "bg-accent"}`}>
        <img src={d.photo} alt={d.name} className="h-14 w-14 rounded-full object-cover border-2 border-background" />
      </div>
      <div className="mt-1.5 text-center">
        <p className="text-xs font-semibold leading-tight text-foreground">{d.name}</p>
        <p className="text-[10px] text-muted-foreground">{d.years}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
    </div>
  );
}

const nodeTypes = { member: MemberNode };

function buildGraph(showDeceased: boolean): { nodes: Node[]; edges: Edge[] } {
  const visible = members.filter((m) => showDeceased || m.isActive || m.children.some((c) => members.find((x) => x.id === c)?.isActive));
  // Layout per generation
  const byGen: Record<number, typeof members> = { 1: [], 2: [], 3: [], 4: [] };
  visible.forEach((m) => byGen[m.generation]?.push(m));

  const nodes: Node[] = [];
  const xSpacing = 180;
  const ySpacing = 200;
  Object.entries(byGen).forEach(([gen, list]) => {
    const g = Number(gen);
    const totalW = (list.length - 1) * xSpacing;
    list.forEach((m, i) => {
      const by = new Date(m.birthDate).getFullYear();
      const dy = m.deathDate ? new Date(m.deathDate).getFullYear() : "";
      nodes.push({
        id: m.id,
        type: "member",
        position: { x: i * xSpacing - totalW / 2, y: (g - 1) * ySpacing },
        data: {
          id: m.id,
          name: m.fullName.split(" ")[0] + " " + (m.fullName.split(" ")[1] ?? ""),
          photo: m.photo,
          years: `${by}–${dy || "•"}`,
          isActive: m.isActive,
        },
      });
    });
  });

  const visibleIds = new Set(visible.map((m) => m.id));
  const edges: Edge[] = [];
  visible.forEach((m) => {
    m.children.forEach((cId) => {
      if (visibleIds.has(cId)) {
        edges.push({ id: `${m.id}-${cId}`, source: m.id, target: cId, style: { stroke: "var(--color-primary)", strokeWidth: 1.5 } });
      }
    });
    if (m.spouse && visibleIds.has(m.spouse) && m.id < m.spouse) {
      edges.push({ id: `s-${m.id}-${m.spouse}`, source: m.id, target: m.spouse, style: { stroke: "var(--color-secondary)", strokeDasharray: "5,5" }, type: "straight" });
    }
  });
  return { nodes, edges };
}

function TreeInner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDeceased, setShowDeceased] = useState(true);
  const [search, setSearch] = useState("");
  const { fitView, setCenter, getNode } = useReactFlow();

  const { nodes, edges } = useMemo(() => buildGraph(showDeceased), [showDeceased]);

  function handleSearch(v: string) {
    setSearch(v);
    if (!v) return;
    const m = members.find((x) => x.fullName.toLowerCase().includes(v.toLowerCase()));
    if (m) {
      const node = getNode(m.id);
      if (node) setCenter(node.position.x + 60, node.position.y + 40, { zoom: 1.2, duration: 600 });
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="border-b border-border bg-surface px-6 py-3 flex flex-wrap items-center gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold">{t("tree.title")}</h1>
          <p className="text-xs text-muted-foreground">{t("tree.subtitle")}</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <Input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder={t("tree.search")} className="w-56" aria-label={t("tree.search")} />
          <div className="flex items-center gap-2">
            <Switch id="dec" checked={showDeceased} onCheckedChange={setShowDeceased} />
            <Label htmlFor="dec" className="text-sm">{t("tree.showDeceased")}</Label>
          </div>
          <Button variant="outline" size="sm" onClick={() => fitView({ duration: 600, padding: 0.2 })}>{t("tree.center")}</Button>
        </div>
      </div>
      <div className="flex-1 bg-surface-alt/30">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          maxZoom={2}
          onNodeClick={(_, n) => navigate({ to: "/membros/$id", params: { id: n.id } })}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="var(--color-border)" gap={24} />
          <Controls className="!bg-surface !border-border" />
          <MiniMap pannable zoomable className="!bg-surface !border-border" />
        </ReactFlow>
      </div>
    </div>
  );
}

function TreePageWrapper() {
  return (
    <ReactFlowProvider>
      <TreeInner />
    </ReactFlowProvider>
  );
}
