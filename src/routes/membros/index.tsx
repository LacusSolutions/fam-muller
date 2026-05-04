import { createFileRoute, Link } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { type ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { members } from '@/data/mockData';

export const Route = createFileRoute('/membros/')({
  head: () => ({
    meta: [
      { title: 'Membros — Família Müller' },
      { name: 'description', content: 'Conheça os membros das quatro gerações da Família Müller.' },
      { property: 'og:title', content: 'Membros — Família Müller' },
      { property: 'og:description', content: 'Quatro gerações de história.' },
    ],
  }),
  component: MembersPage,
});

function MembersPage(): ReactNode {
  const { t } = useTranslation();
  const [q, setQ] = useState('');
  const [gen, setGen] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (q && !m.fullName.toLowerCase().includes(q.toLowerCase())) return false;
      if (gen !== 'all' && String(m.generation) !== gen) return false;
      if (status === 'active' && !m.isActive) return false;
      if (status === 'memorial' && m.isActive) return false;
      return true;
    });
  }, [q, gen, status]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold">{t('members.title')}</h1>
        <p className="text-muted-foreground mt-2">{members.length} membros</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_180px_180px] mb-8">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('members.search')}
            className="pl-9"
            aria-label={t('members.search')}
          />
        </div>
        <Select value={gen} onValueChange={setGen}>
          <SelectTrigger aria-label={t('members.filterGeneration')}>
            <SelectValue placeholder={t('members.filterGeneration')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('members.filterAll')}</SelectItem>
            <SelectItem value="1">1ª {t('members.generation')}</SelectItem>
            <SelectItem value="2">2ª {t('members.generation')}</SelectItem>
            <SelectItem value="3">3ª {t('members.generation')}</SelectItem>
            <SelectItem value="4">4ª {t('members.generation')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger aria-label={t('members.filterStatus')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('members.filterAll')}</SelectItem>
            <SelectItem value="active">{t('members.statusActive')}</SelectItem>
            <SelectItem value="memorial">{t('members.statusMemorial')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">{t('members.noResults')}</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((m) => {
            const by = new Date(m.birthDate).getFullYear();
            const dy = m.deathDate ? new Date(m.deathDate).getFullYear() : null;
            return (
              <Link key={m.id} to="/membros/$id" params={{ id: m.id }} className="group">
                <Card className="overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1 h-full">
                  <div className="aspect-square overflow-hidden bg-surface-alt">
                    <img
                      src={m.photo}
                      alt={m.fullName}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-primary">
                      {m.fullName}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {by} – {dy ?? 'presente'}
                    </p>
                    <Badge variant="secondary" className="mt-2 text-[10px]">
                      {m.generation}ª {t('members.generation')}
                    </Badge>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
