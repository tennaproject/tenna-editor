import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';

export function PartyKris() {
  const allowAllElements = useUi((s) => s.ui.party.kris.allowAllElements);
  const updateUi = useUi((s) => s.updateUi);

  return (
    <CharacterPage
      character={CHARACTERS.KRIS}
      allowAllElements={allowAllElements}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.kris.allowAllElements = value))
      }
    />
  );
}
