import { create } from 'zustand';
import type { Save } from '@types';

const MAX_HISTORY = 50;

interface HistoryEntry {
  snapshot: string;
  label: string;
}

interface HistoryState {
  past: HistoryEntry[];
  future: HistoryEntry[];
  canUndo: boolean;
  canRedo: boolean;
  push: (save: Save, label?: string) => void;
  undo: (currentSave: Save) => Save | null;
  redo: (currentSave: Save) => Save | null;
  clear: () => void;
}

export const useHistory = create<HistoryState>((set, get) => ({
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,

  push: (save: Save, label = '') => {
    const snapshot = JSON.stringify(save);
    set((state) => {
      const nextPast = [...state.past, { snapshot, label }];
      if (nextPast.length > MAX_HISTORY) {
        nextPast.shift();
      }
      return {
        past: nextPast,
        future: [],
        canUndo: nextPast.length > 0,
        canRedo: false,
      };
    });
  },

  undo: (currentSave: Save) => {
    const { past } = get();
    if (past.length === 0) return null;

    const entry = past[past.length - 1];
    const nextPast = past.slice(0, -1);
    const currentSnapshot = JSON.stringify(currentSave);

    set((state) => ({
      past: nextPast,
      future: [...state.future, { snapshot: currentSnapshot, label: entry.label }],
      canUndo: nextPast.length > 0,
      canRedo: true,
    }));

    try {
      return JSON.parse(entry.snapshot) as Save;
    } catch (e) {
      console.error('Failed to parse undo state', e);
      return null;
    }
  },

  redo: (currentSave: Save) => {
    const { future } = get();
    if (future.length === 0) return null;

    const entry = future[future.length - 1];
    const nextFuture = future.slice(0, -1);
    const currentSnapshot = JSON.stringify(currentSave);

    set((state) => ({
      past: [...state.past, { snapshot: currentSnapshot, label: entry.label }],
      future: nextFuture,
      canUndo: true,
      canRedo: nextFuture.length > 0,
    }));

    try {
      return JSON.parse(entry.snapshot) as Save;
    } catch (e) {
      console.error('Failed to parse redo state', e);
      return null;
    }
  },

  clear: () => {
    set({
      past: [],
      future: [],
      canUndo: false,
      canRedo: false,
    });
  },
}));
