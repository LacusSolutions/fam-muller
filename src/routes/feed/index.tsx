import { createFileRoute, Link } from '@tanstack/react-router';
import type { TFunction } from 'i18next';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { eventTypeMeta, getMember, members } from '@/data/mockData';
import type { Post, ReactionType } from '@/data/mockData';
import { useFamilyStore } from '@/hooks/useFamilyStore';

export const Route = createFileRoute('/feed/')({
  head: () => ({
    meta: [
      { title: 'Feed — Família Müller' },
      { name: 'description', content: 'Compartilhamentos, fotos e mensagens da Família Müller.' },
      { property: 'og:title', content: 'Feed — Família Müller' },
      { property: 'og:description', content: 'O dia a dia em compartilhamentos.' },
    ],
  }),
  component: FeedPage,
});

const REACTIONS: { emoji: string; key: ReactionType }[] = [
  { key: 'like', emoji: '❤️' },
  { key: 'wow', emoji: '😮' },
  { key: 'sad', emoji: '😢' },
  { key: 'celebrate', emoji: '🎉' },
];

function relTime(iso: string, t: TFunction): string {
  const diff = Date.now() - +new Date(iso);
  const m = Math.floor(diff / 60000);
  if (m < 1) return t('time.now');
  if (m < 60) return t('time.minutes', { count: m });
  const h = Math.floor(m / 60);
  if (h < 24) return t('time.hours', { count: h });
  const d = Math.floor(h / 24);
  return t('time.days', { count: d });
}

function PostCard({ post }: { post: Post }): ReactNode {
  const { t } = useTranslation();
  const author = getMember(post.authorId);
  const { togglePostReaction, addComment } = useFamilyStore();
  const [showAll, setShowAll] = useState(false);
  const [comment, setComment] = useState('');
  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);
  const visibleComments = showAll ? post.comments : post.comments.slice(0, 2);

  return (
    <Card className="p-5">
      <header className="flex items-center gap-3">
        <Link to="/membros/$id" params={{ id: post.authorId }}>
          <img src={author?.photo} alt="" className="h-11 w-11 rounded-full object-cover" />
        </Link>
        <div>
          <Link
            to="/membros/$id"
            params={{ id: post.authorId }}
            className="font-semibold hover:text-primary"
          >
            {author?.fullName}
          </Link>
          <p className="text-xs text-muted-foreground">{relTime(post.createdAt, t)}</p>
        </div>
      </header>
      <p className="mt-3 whitespace-pre-line">{post.content}</p>
      {post.images.length > 0 && (
        <div className={`mt-3 grid gap-1.5 ${post.images.length === 1 ? '' : 'grid-cols-2'}`}>
          {post.images.slice(0, 4).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              loading="lazy"
              className="rounded-lg w-full aspect-video object-cover"
            />
          ))}
        </div>
      )}
      {post.youtubeUrl && (
        <a
          href={post.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex items-center gap-2 rounded-lg bg-destructive/5 border border-destructive/20 p-3 hover:bg-destructive/10"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-destructive text-white">
            ▶
          </span>
          <span className="text-sm font-medium">Assistir vídeo no YouTube</span>
        </a>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1">
          {REACTIONS.map((r) => (
            <button
              key={r.key}
              onClick={() => togglePostReaction(post.id, r.key)}
              className="rounded-full px-2 py-1 hover:bg-surface-alt text-sm transition-colors"
              aria-label={t(`feed.reactions.${r.key}`)}
              title={t(`feed.reactions.${r.key}`)}
            >
              <span aria-hidden>{r.emoji}</span>{' '}
              <span className="text-xs text-muted-foreground">{post.reactions[r.key]}</span>
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {totalReactions} • {post.comments.length} {t('timeline.comments')}
        </span>
      </div>

      {/* Comments */}
      <div className="mt-3 space-y-2">
        {visibleComments.map((c) => {
          const a = getMember(c.authorId);
          return (
            <div key={c.id} className="flex items-start gap-2">
              <img src={a?.photo} alt="" className="h-7 w-7 rounded-full object-cover" />
              <div className="flex-1 rounded-2xl bg-surface-alt px-3 py-2">
                <p className="text-xs font-semibold">{a?.fullName}</p>
                <p className="text-sm">{c.text}</p>
              </div>
            </div>
          );
        })}
        {post.comments.length > 2 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-xs text-primary hover:underline"
          >
            {showAll
              ? t('feed.hideComments')
              : t('feed.showComments', { count: post.comments.length })}
          </button>
        )}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!comment.trim()) return;
            addComment(post.id, comment.trim(), 'm13');
            setComment('');
          }}
        >
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('feed.commentPlaceholder')}
            className="text-sm"
            aria-label={t('feed.commentPlaceholder')}
          />
          <Button type="submit" size="sm" variant="outline">
            {t('feed.sendComment')}
          </Button>
        </form>
      </div>
    </Card>
  );
}

function FeedPage(): ReactNode {
  const { t } = useTranslation();
  const { posts, events, addPost } = useFamilyStore();
  const [draft, setDraft] = useState('');

  const featured = [...posts].reduce<Record<string, number>>(
    (acc, p) => ({ ...acc, [p.authorId]: (acc[p.authorId] ?? 0) + 1 + p.comments.length }),
    {},
  );
  const top3 = Object.entries(featured)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const today = new Date();
  const upcoming = members
    .filter((m) => m.isActive)
    .map((m) => {
      const bd = new Date(m.birthDate);
      const next = new Date(today.getFullYear(), bd.getMonth(), bd.getDate());
      if (next < today) next.setFullYear(today.getFullYear() + 1);
      return { m, days: Math.floor((+next - +today) / 86400000), date: next };
    })
    .filter((x) => x.days <= 60)
    .sort((a, b) => a.days - b.days);

  const recentEvents = [...events]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  function publish(): void {
    if (!draft.trim()) return;
    addPost({
      id: `p${Date.now()}`,
      authorId: 'm13',
      content: draft.trim(),
      images: [],
      reactions: { like: 0, wow: 0, sad: 0, celebrate: 0 },
      comments: [],
      createdAt: new Date().toISOString(),
    });
    setDraft('');
    toast.success(t('form.postCreated'));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 grid gap-8 lg:grid-cols-[1fr_320px]">
      <section>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">{t('feed.title')}</h1>

        <Card className="p-4 mb-6">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t('feed.placeholder')}
            rows={3}
            className="resize-none border-0 focus-visible:ring-0 p-0"
          />
          <div className="mt-3 flex justify-end">
            <Button onClick={publish} className="gradient-primary" disabled={!draft.trim()}>
              {t('feed.publish')}
            </Button>
          </div>
        </Card>

        <div className="space-y-5">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      <aside className="hidden lg:block space-y-6">
        <Card className="p-5">
          <h2 className="font-display text-lg font-semibold mb-3">{t('feed.featuredMembers')}</h2>
          <ul className="space-y-3">
            {top3.map(([id]) => {
              const m = getMember(id);
              return m ? (
                <li key={id}>
                  <Link
                    to="/membros/$id"
                    params={{ id }}
                    className="flex items-center gap-3 hover:bg-surface-alt rounded-md p-1 -m-1"
                  >
                    <img src={m.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <span className="text-sm font-medium">{m.fullName}</span>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="font-display text-lg font-semibold mb-3">{t('feed.upcomingBirthdays')}</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('feed.noUpcoming')}</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.slice(0, 4).map(({ m, date, days }) => (
                <li key={m.id} className="flex items-center gap-3">
                  <img src={m.photo} alt="" className="h-9 w-9 rounded-full object-cover" />
                  <div className="text-sm">
                    <Link
                      to="/membros/$id"
                      params={{ id: m.id }}
                      className="font-medium hover:text-primary"
                    >
                      {m.fullName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })} • em{' '}
                      {days}d
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="font-display text-lg font-semibold mb-3">{t('feed.recentEvents')}</h2>
          <ul className="space-y-3">
            {recentEvents.map((e) => (
              <li key={e.id} className="text-sm">
                <span aria-hidden className="mr-1">
                  {eventTypeMeta[e.type].icon}
                </span>
                <span className="font-medium">{e.title}</span>
                <p className="text-xs text-muted-foreground">
                  {new Date(e.date).toLocaleDateString('pt-BR')}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
    </div>
  );
}
