import { create } from 'zustand';
import type { GameData } from '@types';
import { buildGameData } from '@utils/resolve-game-data';
import { resolveDataPackReferences } from '@utils/data-packs';
import { useSave } from './save';
import { useDataPacks } from './data-packs';

function computeGameData(): GameData {
  const save = useSave.getState().save;
  const active = resolveDataPackReferences(
    useDataPacks.getState().packs,
    save?.meta.dataPacks,
  );
  return buildGameData(
    active.packs,
    save?.meta.chapter ?? 1,
    save?.meta.slot ?? 0,
  );
}

export const useGameData = create<GameData>(() => computeGameData());

useDataPacks.subscribe((state, previous) => {
  if (state.packs !== previous.packs) useGameData.setState(computeGameData());
});

useSave.subscribe((state, previous) => {
  const meta = state.save?.meta;
  const before = previous.save?.meta;
  if (
    meta?.chapter !== before?.chapter ||
    meta?.slot !== before?.slot ||
    meta?.dataPacks !== before?.dataPacks
  ) {
    useGameData.setState(computeGameData());
  }
});
