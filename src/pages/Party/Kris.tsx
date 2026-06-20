import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';
import { getCharacterColor, mergeClass } from '@utils';
import KrisIcon from '@assets/deltarune/characters/kris.svg?react';

export function PartyKris() {
  const allowAllElements = useUi((s) => s.ui.party.kris.allowAllElements);
  const updateUi = useUi((s) => s.updateUi);
  const color = getCharacterColor(CHARACTERS.KRIS);

  return (
    <CharacterPage
      character={CHARACTERS.KRIS}
      icon={
        <span
          className={mergeClass(
            'inline-flex h-24 w-24 shrink-0 items-center justify-center',
            color.text,
          )}
        >
          <KrisIcon className="h-full w-full" />
        </span>
      }
      allowAllElements={allowAllElements}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.kris.allowAllElements = value))
      }
    />
  );
}
