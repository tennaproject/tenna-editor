import type { FlagIndex } from '@data';
import { createContext, use } from 'react';

export const ChapterFlagsContext = createContext<Set<FlagIndex> | null>(null);

export function useChapterFlags() {
  return use(ChapterFlagsContext);
}
