import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';

export function PartyRalsei() {
  const allowAllElements = useUi((s) => s.ui.party.ralsei.allowAllElements);
  const updateUi = useUi((s) => s.updateUi);

  return (
    <CharacterPage
      character={CHARACTERS.RALSEI}
      allowAllElements={allowAllElements}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.ralsei.allowAllElements = value))
      }
    />
  );
}
