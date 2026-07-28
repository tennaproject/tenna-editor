import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';
import { getCharacterColor, mergeClass } from '@utils';
import NoelleIcon from '@assets/deltarune/characters/noelle.svg?react';

export function PartyNoelle() {
  const allowAllElements = useUi((s) => s.ui.party.noelle.allowAllElements);
  const preserveCustomStats = useUi(
    (s) => s.ui.party.noelle.preserveCustomStats,
  );
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
      preserveCustomStats={preserveCustomStats}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.noelle.allowAllElements = value))
      }
      setPreserveCustomStats={(value) =>
        updateUi((ui) => (ui.party.noelle.preserveCustomStats = value))
      }
    />
  );
}
