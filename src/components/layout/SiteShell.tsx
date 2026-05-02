import { createContext, useContext, useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AddEventModal } from "@/components/AddEventModal";
import "@/i18n";

const ModalCtx = createContext<{ openAddEvent: () => void }>({ openAddEvent: () => {} });
export const useAddEventModal = () => useContext(ModalCtx);

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  // Force i18n init on client
  useEffect(() => {}, []);
  return (
    <ModalCtx.Provider value={{ openAddEvent: () => setOpen(true) }}>
      <div className="min-h-screen flex flex-col">
        <Header onAddEvent={() => setOpen(true)} />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <AddEventModal open={open} onOpenChange={setOpen} />
      </div>
    </ModalCtx.Provider>
  );
}
