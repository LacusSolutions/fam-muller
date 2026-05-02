import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { events, posts, members, galleryImages, eventTypeMeta, getMember } from "@/data/mockData";
import heroImg from "@/assets/hero-watermill.jpg";
import aboutImg from "@/assets/about-family.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Família Müller — Início" },
      { name: "description", content: "Conheça a história, os membros e os momentos marcantes da Família Müller." },
      { property: "og:title", content: "Família Müller — Início" },
      { property: "og:description", content: "Conheça a história da Família Müller." },
    ],
  }),
  component: HomePage,
});

function useCountUp(target: number, duration = 1500) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current || started.current) return;
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return { ref, v };
}

function Stat({ icon, value, label }: { icon: string; value: number; label: string }) {
  const { ref, v } = useCountUp(value);
  return (
    <div className="text-center">
      <div className="text-4xl mb-2" aria-hidden>{icon}</div>
      <div ref={ref} className="font-display text-4xl md:text-5xl font-bold text-primary">{v}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function HomePage() {
  const { t } = useTranslation();
  const totalPhotos = galleryImages.length + events.reduce((s, e) => s + e.attachments.photos.length, 0);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.4em] text-accent animate-fade-in-up">est. 1890</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {t("home.heroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="gradient-primary border-0 text-base">
              <Link to="/membros">{t("home.ctaMembers")} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20 hover:text-white text-base">
              <Link to="/linha-do-tempo">{t("home.ctaTimeline")}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce-down" aria-label={t("home.scrollDown")}>
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-secondary mb-3">1890 — {new Date().getFullYear()}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">{t("home.aboutTitle")}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{t("home.aboutText")}</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-accent/20 -z-10 rotate-2" />
            <img src={aboutImg} alt="Foto histórica da família Müller" loading="lazy" className="rounded-2xl shadow-elegant w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-surface-alt/40">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12">{t("home.galleryTitle")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <figure
                key={img.src}
                className={`group relative overflow-hidden rounded-lg shadow-soft ${i % 5 === 0 ? "row-span-2" : ""}`}
                style={{ aspectRatio: i % 5 === 0 ? "1/2" : "1/1" }}
              >
                <img src={img.src} alt={img.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold text-accent">{img.year}</span>
                  <p className="text-sm">{img.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">{t("home.statsTitle")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-primary-foreground [&_*]:!text-primary-foreground">
            <Stat icon="🌳" value={members.length} label={t("home.statsMembers")} />
            <Stat icon="📅" value={events.length} label={t("home.statsEvents")} />
            <Stat icon="📸" value={totalPhotos} label={t("home.statsPhotos")} />
            <Stat icon="🌍" value={4} label={t("home.statsGenerations")} />
          </div>
        </div>
      </section>

      {/* Recent Events */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold">{t("home.recentEventsTitle")}</h2>
            <Link to="/linha-do-tempo" className="text-sm font-medium text-primary hover:underline">{t("home.seeAll")} →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...events].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3).map((e) => (
              <Card key={e.id} className="p-6 hover:shadow-elegant transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs ${eventTypeMeta[e.type].color}`}>
                    {eventTypeMeta[e.type].icon} {new Date(e.date).getFullYear()}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{e.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-surface-alt/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold">{t("home.recentPostsTitle")}</h2>
            <Link to="/feed" className="text-sm font-medium text-primary hover:underline">{t("home.seeAll")} →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {posts.slice(0, 2).map((p) => {
              const author = getMember(p.authorId);
              return (
                <Card key={p.id} className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={author?.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium">{author?.fullName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground line-clamp-3">{p.content}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
