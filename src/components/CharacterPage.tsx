import type { ReactNode } from 'react';
import { type CharacterIndex } from '@data';
import DividerIcon from '@assets/icons/minus.svg?react';
import { characterHelpers } from '@utils/data-helpers';
import { getCharacterColor } from '@utils/get-character-color';
import {
  Card,
  Button,
  Checkbox,
  GlowBar,
  Heading,
  HelpTip,
  InlineGroup,
  Section,
  CharacterHeader,
  SpellField,
  StatsField,
  LoadoutField,
} from '@components';
import {
  formatTranslation,
  getCharacterTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { useSave } from '@store';
import { resetCharacterCoreStats } from '@utils';

interface CharacterPageProps {
  character: CharacterIndex;
  icon?: ReactNode;
  allowAllElements: boolean;
  setAllowAllElements: (value: boolean) => void;
  preserveCustomStats: boolean;
  setPreserveCustomStats: (value: boolean) => void;
}

export function CharacterPage({
  character,
  icon,
  allowAllElements,
  setAllowAllElements,
  preserveCustomStats,
  setPreserveCustomStats,
}: CharacterPageProps) {
  const { t } = useTranslation();
  const color = getCharacterColor(character);
  const name = translateMeta(
    getCharacterTranslationKeyPrefix(character),
    characterHelpers.getById(character),
    t,
  ).displayName;
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const updateSave = useSave((s) => s.updateSave);

  function resetStats() {
    updateSave((save) => {
      resetCharacterCoreStats(save.characters[character], character, chapter);
    });
  }

  return (
    <div className="page lg:h-full">
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 ">
        <InlineGroup>
          <Checkbox
            onChange={setAllowAllElements}
            checked={allowAllElements}
            label={formatTranslation(
              t(
                'ui.party.allowNonCharacterEquipment',
                "Allow non-{name}'s weapons, armors and spells",
              ),
              { name },
            )}
          />
        </InlineGroup>
        <InlineGroup>
          <Checkbox
            onChange={setPreserveCustomStats}
            checked={preserveCustomStats}
            label={t(
              'ui.party.preserveCustomStats',
              'Keep custom stats when changing equipment',
            )}
          />
          <HelpTip
            title={t(
              'ui.party.preserveCustomStats',
              'Keep custom stats when changing equipment',
            )}
          >
            <p>
              {t(
                'ui.party.preserveCustomStatsDescription',
                'When enabled, changing a weapon or armor keeps the existing AT, DF and MAG instead of recalculating them for the new equipment.',
              )}
            </p>
            <p>
              {t(
                'ui.party.resetStatsDescription',
                'Reset stats restores the normal AT, DF and MAG for this chapter and the currently equipped items.',
              )}
            </p>
          </HelpTip>
        </InlineGroup>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <Section id="main" className="flex min-h-175 flex-1 flex-col">
          <Card className="flex flex-col justify-between flex-1">
            <div className="flex flex-col">
              <CharacterHeader character={character} icon={icon} />
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
                <Section id="stats" className="flex w-full flex-col gap-3">
                  <div className="flex w-full items-end justify-between gap-3">
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
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={resetStats} size="sm">
                      {t('ui.party.resetStats', 'Reset stats')}
                    </Button>
                  </div>
                </Section>
                <Section id="loadout" className="flex flex-col gap-3">
                  <LoadoutField
                    id="weapon"
                    character={character}
                    allowAllElements={allowAllElements}
                    recalculateStats={!preserveCustomStats}
                    type="weapon"
                  />
                  <LoadoutField
                    id="primary-armor"
                    character={character}
                    allowAllElements={allowAllElements}
                    recalculateStats={!preserveCustomStats}
                    type="primaryArmor"
                  />
                  <LoadoutField
                    id="secondary-armor"
                    character={character}
                    allowAllElements={allowAllElements}
                    recalculateStats={!preserveCustomStats}
                    type="secondaryArmor"
                  />
                </Section>
              </div>
            </div>

            <GlowBar bg={color.bg} shadow={color.shadow} />
          </Card>
        </Section>

        <Section
          id="spells"
          className="flex min-h-175 flex-7/16 lg:min-h-175"
        >
          <Card className="flex flex-1 flex-col gap-3 p-6">
            <Heading level={3}>{t('ui.party.spells', 'Spells')}</Heading>
            <div className="text-text-2">
              <p>
                {t(
                  'ui.party.unobtainableSpellsWarning',
                  'Some of the spells are unobtainable in game. They are often unfinished, broken and can cause issues.',
                )}
              </p>
            </div>

            <div className="w-full grid lg:grid-cols-2 gap-4 lg:px-6 mt-8">
              {SPELL_SLOTS.map((slot) => (
                <SpellField
                  id={`spell-slot${slot}`}
                  key={slot}
                  slot={slot}
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

const SPELL_SLOTS = [0, 1, 2, 3, 4, 5];
