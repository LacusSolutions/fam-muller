import { Link } from '@tanstack/react-router';
import { TreePine } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export function Footer(): ReactNode {
  const { t } = useTranslation();
  return (
    <footer className="mt-20 border-t border-border bg-surface-alt/50">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold text-primary">
            <TreePine className="h-5 w-5" aria-hidden />
            Família Müller
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{t('footer.tagline')}</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">
            {t('footer.quickLinks')}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/membros" className="hover:text-primary">
                {t('nav.members')}
              </Link>
            </li>
            <li>
              <Link to="/linha-do-tempo" className="hover:text-primary">
                {t('nav.timeline')}
              </Link>
            </li>
            <li>
              <Link to="/arvore-genealogica" className="hover:text-primary">
                {t('nav.tree')}
              </Link>
            </li>
            <li>
              <Link to="/feed" className="hover:text-primary">
                {t('nav.feed')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-muted-foreground">{t('footer.preserving')}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Família Müller. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
