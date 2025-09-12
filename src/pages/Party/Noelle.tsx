import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';

export function PartyNoelle() {
  const allowAllElements = useUi((s) => s.ui.party.noelle.allowAllElements);
  const updateUi = useUi((s) => s.updateUi);

  return (
    <CharacterPage
      character={CHARACTERS.NOELLE}
      allowAllElements={allowAllElements}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.noelle.allowAllElements = value))
      }
    />
  );
}
