import { createContext, use } from 'react';

export const FieldSearchContext = createContext<string | null>(null);

export function useFieldSearch() {
  return use(FieldSearchContext);
}
