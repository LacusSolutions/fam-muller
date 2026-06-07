import { createRootRoute, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { SiteShell } from '@/components/layout/SiteShell';

import appCss from '../styles.css?url';

function NotFoundComponent(): ReactNode {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary font-display">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">A página que você procura não existe.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Família Müller' },
      { name: 'google-site-verification', content: 'q9ilqug5angWDTiPbz1s7yftDp_clxmOpexouOzgnHM' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Família Müller' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebSite', name: 'Família Müller', url: 'https://fam-muller.lovable.app' },
            { '@type': 'Organization', name: 'Família Müller', url: 'https://fam-muller.lovable.app' },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent(): ReactNode {
  return (
    <SiteShell>
      <Outlet />
      <Toaster richColors position="top-center" />
    </SiteShell>
  );
}
