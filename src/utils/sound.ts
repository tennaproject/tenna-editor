import { useUi } from '@store';

export function playSound(src: string) {
  if (!useUi.getState().ui.sound.enabled) return;
  void new Audio(src).play().catch(() => {});
}
