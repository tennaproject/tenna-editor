import { useMediaQuery } from './use-media-query';

export function useCanHover() {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
