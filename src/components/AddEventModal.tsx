import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFamilyStore } from "@/hooks/useFamilyStore";
import { eventTypeMeta, members } from "@/data/mockData";
import type { EventType, FamilyEvent } from "@/data/mockData";

const TYPES: EventType[] = ["birth", "death", "wedding", "reunion", "milestone", "travel", "other"];

export function AddEventModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t } = useTranslation();
  const { addEvent } = useFamilyStore();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<EventType>("milestone");
  const [description, setDescription] = useState("");
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  function reset() {
    setTitle(""); setDate(""); setType("milestone"); setDescription(""); setMemberIds([]); setYoutubeUrl("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !date) return;
    const ev: FamilyEvent = {
      id: `e${Date.now()}`,
      title, description, date, type, memberIds,
      attachments: { photos: [], documents: [], youtubeUrl: youtubeUrl || undefined },
      createdBy: "m13",
      reactions: 0,
      commentCount: 0,
    };
    addEvent(ev);
    toast.success(t("form.eventCreated"));
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t("nav.addEvent")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="ev-title">{t("form.title")} *</Label>
            <Input id="ev-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("form.titlePlaceholder")} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="ev-date">{t("form.date")} *</Label>
              <Input id="ev-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="ev-type">{t("form.type")}</Label>
              <Select value={type} onValueChange={(v) => setType(v as EventType)}>
                <SelectTrigger id="ev-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPES.map((tp) => (
                    <SelectItem key={tp} value={tp}>
                      {eventTypeMeta[tp].icon} {t(`eventTypes.${tp}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="ev-desc">{t("form.description")}</Label>
            <Textarea id="ev-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder={t("form.descPlaceholder")} />
          </div>
          <div>
            <Label>{t("form.members")}</Label>
            <div className="mt-2 max-h-32 overflow-y-auto rounded-md border border-border p-2 bg-surface">
              {members.map((m) => (
                <label key={m.id} className="flex items-center gap-2 rounded px-2 py-1 hover:bg-surface-alt cursor-pointer">
                  <input
                    type="checkbox"
                    checked={memberIds.includes(m.id)}
                    onChange={(e) => setMemberIds(e.target.checked ? [...memberIds, m.id] : memberIds.filter((x) => x !== m.id))}
                  />
                  <span className="text-sm">{m.fullName}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="ev-yt">{t("form.youtube")}</Label>
            <Input id="ev-yt" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/..." />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>{t("form.cancel")}</Button>
            <Button type="submit" className="gradient-primary">{t("form.save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
