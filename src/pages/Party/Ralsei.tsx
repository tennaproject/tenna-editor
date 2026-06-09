import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';
import { getCharacterColor, mergeClass } from '@utils';
import RalseiIcon from '@assets/deltarune/characters/ralsei.svg?react';

export function PartyRalsei() {
  const allowAllElements = useUi((s) => s.ui.party.ralsei.allowAllElements);
  const updateUi = useUi((s) => s.updateUi);
  const color = getCharacterColor(CHARACTERS.RALSEI);

  return (
    <CharacterPage
      character={CHARACTERS.RALSEI}
      icon={
        <span
          className={mergeClass(
            'inline-flex h-24 w-24 shrink-0 items-center justify-center',
            color.text,
          )}
        >
          <RalseiIcon className="h-full w-full" />
        </span>
      }
      allowAllElements={allowAllElements}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.ralsei.allowAllElements = value))
      }
    />
  );
}