import { Section } from '@components';
import { KitArmor1Field } from './KitArmor1Field';
import { KitArmor2Field } from './KitArmor2Field';
import { KitWeaponField } from './KitWeaponField';
import type { CharacterIndex } from '@data';

interface KitFieldProps {
  character: CharacterIndex;
  allowAllElements: boolean;
}

export function KitField({ character, allowAllElements }: KitFieldProps) {
  return (
    <Section id="main-kit" className="flex flex-col gap-3">
      <KitWeaponField
        character={character}
        allowAllElements={allowAllElements}
      />
      <KitArmor1Field
        character={character}
        allowAllElements={allowAllElements}
      />
      <KitArmor2Field
        character={character}
        allowAllElements={allowAllElements}
      />
    </Section>
  );
}
