import type { FlagIndex } from '@data';
import { createContext, useContext } from 'react';

export const ChapterFlagsContext = createContext<Set<FlagIndex> | null>(null);

export function useChapterFlags() {
  return useContext(ChapterFlagsContext);
}
