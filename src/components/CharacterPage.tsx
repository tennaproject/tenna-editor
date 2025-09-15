import { type CharacterIndex } from '@data';
import { KitField } from '@pages/Party/components';
import DividerIcon from '@assets/icons/minus.svg?react';
import { characterHelpers, getCharacterColor } from '@utils';
import {
  Card,
  Checkbox,
  GlowBar,
  Heading,
  InlineGroup,
  Section,
  CharacterHeader,
  SpellField,
  StatsField,
} from '@components';

interface CharacterPageProps {
  character: CharacterIndex;
  allowAllElements: boolean;
  setAllowAllElements: (value: boolean) => void;
}

export function CharacterPage({
  character,
  allowAllElements,
  setAllowAllElements,
}: CharacterPageProps) {
  const color = getCharacterColor(character);
  const name = characterHelpers.getById(character).displayName;

  return (
    <div className="page lg:h-full">
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 ">
        <InlineGroup>
          <Checkbox
            onChange={setAllowAllElements}
            checked={allowAllElements}
            label={`Allow non-${name}'s weapons, armors and spells`}
          />
        </InlineGroup>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:h-[90%] lg:max-h-[900px]">
        <Section
          id="main"
          className="flex flex-col flex-1 lg:min-h-[700px] min-h-[700px]"
        >
          <Card className="flex flex-col justify-between flex-1">
            <div className="flex flex-col">
              <CharacterHeader character={character} />
              <div className="flex flex-col gap-6 px-6 py-6">
                <Section
                  id="health"
                  className="flex justify-between items-end w-full"
                >
                  <StatsField
                    id="current-health"
                    character={character}
                    type="health"
                  />
                  <span className="h-5 w-5 mb-3 mx-3 text-text-2">
                    <DividerIcon />
                  </span>
                  <StatsField
                    id="max-health"
                    character={character}
                    type="maxHealth"
                  />
                </Section>
                <Section
                  id="stats"
                  className="flex justify-between items-end w-full gap-3"
                >
                  <StatsField
                    id={'stats-attack'}
                    character={character}
                    type="attack"
                  />
                  <StatsField
                    id={'stats-defence'}
                    character={character}
                    type="defence"
                  />
                  <StatsField
                    id={'stats-magic'}
                    character={character}
                    type="magic"
                  />
                </Section>
                <KitField
                  character={character}
                  allowAllElements={allowAllElements}
                />
              </div>
            </div>

            <GlowBar bg={color.bg} shadow={color.shadow} />
          </Card>
        </Section>

        <Section
          id="spells"
          className="flex flex-7/16 lg:min-h-[700px] min-h-[800px]"
        >
          <Card className="flex-1 p-6 flex gap-3 flex-col">
            <Heading level={3}>Spells</Heading>
            <div className="text-text-2">
              <p>
                Some of the spells are unobtainable in game. They are often
                unfinished, broken and can cause issues.
              </p>
            </div>

            <div className="w-full grid lg:grid-cols-2 gap-4 lg:px-6 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SpellField
                  key={i}
                  slot={i}
                  character={character}
                  allowAllItems={allowAllElements}
                />
              ))}
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}
