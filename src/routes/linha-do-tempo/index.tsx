import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFamilyStore } from "@/hooks/useFamilyStore";
import { eventTypeMeta, getMember } from "@/data/mockData";
import type { EventType } from "@/data/mockData";
import { useAddEventModal } from "@/components/layout/SiteShell";

export const Route = createFileRoute("/linha-do-tempo/")({
  head: () => ({
    meta: [
      { title: "Linha do Tempo — Família Müller" },
      { name: "description", content: "Cada momento que moldou a história da Família Müller, em ordem cronológica." },
      { property: "og:title", content: "Linha do Tempo — Família Müller" },
      { property: "og:description", content: "A história visual da Família Müller." },
    ],
  }),
  component: TimelinePage,
});

const TYPES: ("all" | EventType)[] = ["all", "birth", "wedding", "death", "reunion", "milestone", "travel", "other"];

function TimelinePage() {
  const { t } = useTranslation();
  const { events } = useFamilyStore();
  const { openAddEvent } = useAddEventModal();
  const [type, setType] = useState<"all" | EventType>("all");
  const [year, setYear] = useState("all");

  const sorted = useMemo(() => [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date)), [events]);
  const years = useMemo(() => Array.from(new Set(sorted.map((e) => new Date(e.date).getFullYear()))).sort(), [sorted]);
  const filtered = sorted.filter((e) => {
    if (type !== "all" && e.type !== type) return false;
    if (year !== "all" && String(new Date(e.date).getFullYear()) !== year) return false;
    return true;
  });

  const hasFilters = type !== "all" || year !== "all";

  return (
    <div className="relative">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold">{t("timeline.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("timeline.subtitle")}</p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger className="w-44" aria-label={t("timeline.filterType")}><SelectValue /></SelectTrigger>
            <SelectContent>
              {TYPES.map((tp) => (
                <SelectItem key={tp} value={tp}>
                  {tp === "all" ? t("members.filterAll") : `${eventTypeMeta[tp].icon} ${t(`eventTypes.${tp}`)}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-32" aria-label={t("timeline.filterYear")}><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("members.filterAll")}</SelectItem>
              {years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={() => { setType("all"); setYear("all"); }}>
              <X className="h-3.5 w-3.5 mr-1" /> {t("timeline.clearFilters")}
            </Button>
          )}
        </div>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">{t("timeline.noEvents")}</p>
        ) : (
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" aria-hidden />
            <ol className="space-y-10">
              {filtered.map((e, i) => {
                const date = new Date(e.date);
                const meta = eventTypeMeta[e.type];
                const onLeft = i % 2 === 0;
                return (
                  <li key={e.id} className={`relative md:grid md:grid-cols-2 md:gap-8 ${onLeft ? "" : "md:[&>*:first-child]:order-2"}`}>
                    <span className="absolute left-4 md:left-1/2 top-6 grid h-8 w-8 place-items-center rounded-full gradient-primary text-base shadow-soft -translate-x-1/2 z-10" aria-hidden>
                      {meta.icon}
                    </span>
                    <div className={`pl-12 md:pl-0 ${onLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <Card className="p-5 hover:shadow-elegant transition-shadow">
                        <div className={`flex items-center gap-2 mb-2 ${onLeft ? "md:justify-end" : ""}`}>
                          <Badge className={meta.color + " border"}>{t(`eventTypes.${e.type}`)}</Badge>
                          <time className="text-xs text-muted-foreground">{date.toLocaleDateString("pt-BR")}</time>
                        </div>
                        <h3 className="font-display text-xl font-semibold">{e.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
                        {e.attachments.photos.length > 0 && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {e.attachments.photos.slice(0, 2).map((p, idx) => (
                              <img key={idx} src={p} alt="" loading="lazy" className="rounded-md aspect-video object-cover" />
                            ))}
                          </div>
                        )}
                        {e.attachments.youtubeUrl && (
                          <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-destructive/10 text-destructive px-2 py-1 text-xs">▶ Vídeo do YouTube</div>
                        )}
                        {e.memberIds.length > 0 && (
                          <div className={`mt-3 flex flex-wrap gap-1.5 ${onLeft ? "md:justify-end" : ""}`}>
                            <span className="text-xs text-muted-foreground self-center">{t("timeline.participants")}:</span>
                            {e.memberIds.slice(0, 5).map((id) => {
                              const m = getMember(id);
                              return m ? (
                                <Link key={id} to="/membros/$id" params={{ id }} title={m.fullName}>
                                  <img src={m.photo} alt={m.fullName} className="h-6 w-6 rounded-full object-cover border border-border" />
                                </Link>
                              ) : null;
                            })}
                          </div>
                        )}
                        <div className={`mt-3 flex gap-3 text-xs text-muted-foreground ${onLeft ? "md:justify-end" : ""}`}>
                          <button className="hover:text-primary">❤ {e.reactions}</button>
                          <span>💬 {e.commentCount}</span>
                        </div>
                      </Card>
                    </div>
                    <div />
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>

      {/* FAB */}
      <Button
        onClick={openAddEvent}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-primary shadow-elegant z-30"
        aria-label={t("timeline.addEvent")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
