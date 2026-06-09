import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';
import { getCharacterColor, mergeClass } from '@utils';
import NoelleIcon from '@assets/deltarune/characters/noelle.svg?react';

export function PartyNoelle() {
  const allowAllElements = useUi((s) => s.ui.party.noelle.allowAllElements);
  const updateUi = useUi((s) => s.updateUi);
  const color = getCharacterColor(CHARACTERS.NOELLE);

  return (
    <CharacterPage
      character={CHARACTERS.NOELLE}
      icon={
        <span
          className={mergeClass(
            'inline-flex h-24 w-24 shrink-0 items-center justify-center',
            color.text,
          )}
        >
          <NoelleIcon className="h-full w-full" />
        </span>
      }
      allowAllElements={allowAllElements}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.noelle.allowAllElements = value))
      }
    />
  );
}