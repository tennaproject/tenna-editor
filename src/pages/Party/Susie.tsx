import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';
import { getCharacterColor, mergeClass } from '@utils';
import SusieIcon from '@assets/deltarune/characters/susie.svg?react';

export function PartySusie() {
  const allowAllElements = useUi((s) => s.ui.party.susie.allowAllElements);
  const updateUi = useUi((s) => s.updateUi);
  const color = getCharacterColor(CHARACTERS.SUSIE);

  return (
    <CharacterPage
      character={CHARACTERS.SUSIE}
      icon={
        <span
          className={mergeClass(
            'inline-flex h-24 w-24 shrink-0 items-center justify-center',
            color.text,
          )}
        >
          <SusieIcon className="h-full w-full" />
        </span>
      }
      allowAllElements={allowAllElements}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.susie.allowAllElements = value))
      }
    />
  );
}
