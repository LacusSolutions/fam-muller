import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ChevronRight, Edit } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { events, eventTypeMeta, getMember, members, posts } from '@/data/mockData';

export const Route = createFileRoute('/membros/$id')({
  loader: ({ params }) => {
    const m = getMember(params.id);
    if (!m) throw notFound();
    return { member: m };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [] };
    const m = loaderData.member;
    const url = `https://fam-muller.lovable.app/membros/${params.id}`;
    return {
      meta: [
        { title: `${m.fullName} — Família Müller` },
        { name: 'description', content: m.bio.slice(0, 150) },
        { property: 'og:title', content: `${m.fullName} — Família Müller` },
        { property: 'og:description', content: m.bio.slice(0, 150) },
        { property: 'og:type', content: 'profile' },
        { property: 'og:url', content: url },
        { property: 'og:image', content: m.photo },
        { name: 'twitter:image', content: m.photo },
      ],
      links: [{ rel: 'canonical', href: url }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: m.fullName,
            image: m.photo,
            birthDate: m.birthDate,
            ...(m.deathDate ? { deathDate: m.deathDate } : {}),
            description: m.bio,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl">Membro não encontrado</h1>
      <Link to="/membros" className="mt-4 inline-block text-primary hover:underline">
        ← Voltar
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl text-destructive">Erro</h1>
      <p className="text-muted-foreground mt-2">{error.message}</p>
    </div>
  ),
  component: MemberProfile,
});

function MiniCard({ id }: { id: string }): ReactNode {
  const m = getMember(id);
  if (!m) return null;
  return (
    <Link
      to="/membros/$id"
      params={{ id }}
      className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 border border-border hover:border-primary transition-colors"
    >
      <img src={m.photo} alt="" className="h-8 w-8 rounded-full object-cover" />
      <span className="text-sm font-medium">{m.fullName.split(' ')[0]}</span>
    </Link>
  );
}

function MemberProfile(): ReactNode {
  const { t } = useTranslation();
  const { member } = Route.useLoaderData();
  const memberEvents = events
    .filter((e) => e.memberIds.includes(member.id))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const memberPosts = posts.filter((p) => p.authorId === member.id);
  const ancestors = members.filter((m) => member.parents.includes(m.id));
  const descendants = members.filter((m) => member.children.includes(m.id));
  const spouse = member.spouse ? getMember(member.spouse) : null;

  return (
    <article className="mx-auto max-w-5xl px-6 py-10">
      <Link
        to="/membros"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> {t('members.backToList')}
      </Link>

      {/* Header */}
      <header className="grid gap-8 md:grid-cols-[auto_1fr] items-start">
        <div className="relative mx-auto md:mx-0">
          <div className="rounded-full p-1.5 gradient-primary">
            <img
              src={member.photo}
              alt={member.fullName}
              className="h-44 w-44 md:h-52 md:w-52 rounded-full object-cover border-4 border-background"
            />
          </div>
        </div>
        <div>
          <Badge
            variant={member.isActive ? 'default' : 'secondary'}
            className={member.isActive ? 'bg-primary' : 'bg-accent/30 text-secondary'}
          >
            {member.isActive ? t('members.statusActive') : t('members.statusMemorial')}
          </Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">{member.fullName}</h1>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>
              {t('members.born')}: {new Date(member.birthDate).toLocaleDateString('pt-BR')}
            </span>
            {member.deathDate && (
              <span>
                {t('members.died')}: {new Date(member.deathDate).toLocaleDateString('pt-BR')}
              </span>
            )}
            <span>
              {member.generation}ª {t('members.generation')}
            </span>
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">{member.bio}</p>
          <Button variant="outline" size="sm" className="mt-4">
            <Edit className="mr-1.5 h-3.5 w-3.5" /> {t('members.edit')}
          </Button>
        </div>
      </header>

      {/* Lineage */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold mb-4">{t('members.lineage')}</h2>
        <Card className="p-6 space-y-6">
          {ancestors.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {t('members.ancestors')}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {ancestors.map((a) => (
                  <MiniCard key={a.id} id={a.id} />
                ))}
                <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span className="text-sm font-semibold text-primary">
                  {member.fullName.split(' ')[0]}
                </span>
              </div>
            </div>
          )}
          {spouse && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {t('members.spouse')}
              </p>
              <MiniCard id={spouse.id} />
            </div>
          )}
          {descendants.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {t('members.descendants')}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-primary">
                  {member.fullName.split(' ')[0]}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                {descendants.map((d) => (
                  <MiniCard key={d.id} id={d.id} />
                ))}
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* Personal timeline */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold mb-4">
          {t('members.personalTimeline')}
        </h2>
        {memberEvents.length === 0 ? (
          <p className="text-muted-foreground">{t('members.noEvents')}</p>
        ) : (
          <ol className="relative border-l-2 border-border ml-4 space-y-6">
            {memberEvents.map((e) => (
              <li key={e.id} className="pl-6 relative">
                <span
                  className="absolute -left-[11px] top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px]"
                  aria-hidden
                >
                  {eventTypeMeta[e.type].icon}
                </span>
                <p className="text-xs text-muted-foreground">
                  {new Date(e.date).toLocaleDateString('pt-BR')}
                </p>
                <p className="font-semibold">{e.title}</p>
                <p className="text-sm text-muted-foreground">{e.description}</p>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* Posts */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold mb-4">{t('members.posts')}</h2>
        {memberPosts.length === 0 ? (
          <p className="text-muted-foreground">{t('members.noPosts')}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {memberPosts.map((p) => (
              <Card key={p.id} className="p-5">
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm">{p.content}</p>
                <div className="mt-3 flex gap-3 text-xs text-muted-foreground">
                  <span>❤ {Object.values(p.reactions).reduce((a, b) => a + b, 0)}</span>
                  <span>💬 {p.comments.length}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
