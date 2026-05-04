import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { AddEventModal } from '@/components/AddEventModal';

import { Footer } from './Footer';
import { Header } from './Header';
import '@/i18n';

const ModalCtx = createContext<{ openAddEvent: () => void }>({ openAddEvent: () => {} });
export const useAddEventModal = (): { openAddEvent: () => void } => useContext(ModalCtx);

export function SiteShell({ children }: { children: ReactNode }): ReactNode {
  const [open, setOpen] = useState(false);
  // Force i18n init on client
  useEffect((): void => {}, []);
  return (
    <ModalCtx.Provider value={{ openAddEvent: () => setOpen(true) }}>
      <div className="min-h-screen flex flex-col">
        <Header onAddEvent={() => setOpen(true)} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <AddEventModal open={open} onOpenChange={setOpen} />
      </div>
    </ModalCtx.Provider>
  );
}
