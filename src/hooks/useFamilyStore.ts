import { useCallback, useEffect, useState } from 'react';

import type { FamilyEvent, Post, ReactionType } from '@/data/mockData';
import { events as initialEvents, posts as initialPosts } from '@/data/mockData';

// Simple in-memory store with localStorage persistence
let eventsState: FamilyEvent[] = [...initialEvents];
let postsState: Post[] = [...initialPosts];
const listeners = new Set<() => void>();

function loadFromStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const e = localStorage.getItem('muller_events');
    const p = localStorage.getItem('muller_posts');
    if (e) eventsState = JSON.parse(e);
    if (p) postsState = JSON.parse(p);
  } catch {
    void 0;
  }
}

function persist(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('muller_events', JSON.stringify(eventsState));
    localStorage.setItem('muller_posts', JSON.stringify(postsState));
  } catch {
    void 0;
  }
}

let loaded = false;
function ensureLoaded(): void {
  if (!loaded && typeof window !== 'undefined') {
    loadFromStorage();
    loaded = true;
  }
}

function notify(): void {
  persist();
  listeners.forEach((l) => l());
}

export function useFamilyStore(): {
  addComment: (postId: string, text: string, authorId: string) => void;
  addEvent: (e: FamilyEvent) => void;
  addPost: (p: Post) => void;
  events: FamilyEvent[];
  posts: Post[];
  togglePostReaction: (postId: string, reaction: ReactionType) => void;
} {
  ensureLoaded();
  const [, setTick] = useState(0);

  useEffect(() => {
    ensureLoaded();
    const l = (): void => {
      setTick((t) => t + 1);
    };
    listeners.add(l);
    queueMicrotask(() => setTick((t) => t + 1));
    return (): void => {
      listeners.delete(l);
    };
  }, []);

  const addEvent = useCallback((e: FamilyEvent) => {
    eventsState = [e, ...eventsState];
    notify();
  }, []);

  const addPost = useCallback((p: Post) => {
    postsState = [p, ...postsState];
    notify();
  }, []);

  const togglePostReaction = useCallback((postId: string, reaction: ReactionType) => {
    postsState = postsState.map((p) => {
      if (p.id !== postId) return p;
      const key = `muller_reacted_${postId}_${reaction}`;
      const reacted = typeof window !== 'undefined' && localStorage.getItem(key);
      const delta = reacted ? -1 : 1;
      if (typeof window !== 'undefined') {
        if (reacted) localStorage.removeItem(key);
        else localStorage.setItem(key, '1');
      }
      return {
        ...p,
        reactions: { ...p.reactions, [reaction]: Math.max(0, p.reactions[reaction] + delta) },
      };
    });
    notify();
  }, []);

  const addComment = useCallback((postId: string, text: string, authorId: string) => {
    postsState = postsState.map((p) =>
      p.id === postId
        ? {
            ...p,
            comments: [
              ...p.comments,
              { id: `c${Date.now()}`, authorId, text, createdAt: new Date().toISOString() },
            ],
          }
        : p,
    );
    notify();
  }, []);

  return {
    events: eventsState,
    posts: postsState,
    addEvent,
    addPost,
    togglePostReaction,
    addComment,
  };
}
