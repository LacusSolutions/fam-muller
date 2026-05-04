import { Link, useRouterState } from '@tanstack/react-router';
import { Globe, Menu, Plus, TreePine, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const langs = [
  { code: 'pt-BR', flag: '🇧🇷', labelKey: 'language.pt' },
  { code: 'en', flag: '🇺🇸', labelKey: 'language.en' },
  { code: 'de', flag: '🇩🇪', labelKey: 'language.de' },
];

export function Header({ onAddEvent }: { onAddEvent?: () => void }): ReactNode {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/membros', label: t('nav.members') },
    { to: '/linha-do-tempo', label: t('nav.timeline') },
    { to: '/arvore-genealogica', label: t('nav.tree') },
    { to: '/feed', label: t('nav.feed') },
  ] as const;

  const currentLang = langs.find((l) => l.code === i18n.language) ?? langs[0];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <a href="#main" className="skip-link">
        {t('nav.skipToContent')}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-primary-foreground">
            <TreePine className="h-5 w-5" aria-hidden />
          </span>
          <span>Família Müller</span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-primary bg-primary/8'
                    : 'text-foreground/70 hover:text-foreground hover:bg-surface-alt',
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label={t('language.select')}
                className="gap-1.5"
              >
                <Globe className="h-4 w-4" aria-hidden />
                <span aria-hidden>{currentLang.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {langs.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => i18n.changeLanguage(l.code)}>
                  <span className="mr-2" aria-hidden>
                    {l.flag}
                  </span>{' '}
                  {t(l.labelKey)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {onAddEvent && (
            <Button
              onClick={onAddEvent}
              size="sm"
              className="hidden sm:inline-flex gradient-primary"
            >
              <Plus className="mr-1.5 h-4 w-4" aria-hidden /> {t('nav.addEvent')}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t('nav.menu')}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav aria-label="Mobile" className="flex flex-col p-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-surface-alt"
              >
                {l.label}
              </Link>
            ))}
            {onAddEvent && (
              <Button
                onClick={() => {
                  setOpen(false);
                  onAddEvent();
                }}
                className="mt-2 gradient-primary"
              >
                <Plus className="mr-1.5 h-4 w-4" /> {t('nav.addEvent')}
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
