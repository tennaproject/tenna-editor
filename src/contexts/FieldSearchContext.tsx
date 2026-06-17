import { createContext, useContext } from 'react';

export const FieldSearchContext = createContext<string | null>(null);

export function useFieldSearch() {
  return useContext(FieldSearchContext);
}
