import {
  Card,
  Checkbox,
  GlowBar,
  Heading,
  InlineGroup,
  Section,
} from '@components';
import { getCharacterColor } from '@utils';
import { HpField } from './components/HpField';
import { useUi } from '@store';
import { StatsField } from './components/StatsField';
import { TitleField } from './components/TitleField';
import { KitField } from './components/KitField';
import { CHARACTERS } from '@data';
import { SpellField } from './components/SpellField';

export const Ralsei = () => {
  const allowRalseiAllElements = useUi((s) => s.allowRalseiAllElements);
  const setAllowRalseiAllElements = useUi((s) => s.setAllowRalseiAllElements);

  const color = getCharacterColor(CHARACTERS.RALSEI);
  return (
    <div className="page lg:h-full">
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 ">
        <InlineGroup>
          <Checkbox
            onChange={setAllowRalseiAllElements}
            checked={allowRalseiAllElements}
            label="Allow non-Ralsei's weapons, armors and spells"
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
              <TitleField character={CHARACTERS.RALSEI} />
              <div className="flex flex-col gap-6 px-6 py-6">
                <HpField character={CHARACTERS.RALSEI} />
                <StatsField character={CHARACTERS.RALSEI} />
                <KitField
                  character={CHARACTERS.RALSEI}
                  allowAllElements={allowRalseiAllElements}
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
                  character={CHARACTERS.RALSEI}
                  allowAllItems={allowRalseiAllElements}
                />
              ))}
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
};
