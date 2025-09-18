import { CharacterPage } from '@components';
import { useUi } from '@store';
import { CHARACTERS } from '@data';

export function PartySusie() {
  const allowAllElements = useUi((s) => s.ui.party.susie.allowAllElements);
  const updateUi = useUi((s) => s.updateUi);

  return (
    <CharacterPage
      character={CHARACTERS.SUSIE}
      allowAllElements={allowAllElements}
      setAllowAllElements={(value) =>
        updateUi((ui) => (ui.party.susie.allowAllElements = value))
      }
    />
  );
}
