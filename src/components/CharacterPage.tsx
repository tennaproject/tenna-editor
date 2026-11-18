import type { ReactNode } from 'react';
import ResetIcon from '@assets/icons/reload.svg?react';
import DividerIcon from '@assets/icons/minus.svg?react';
import { type CharacterIndex } from '@data';
import { characterHelpers } from '@utils/data-helpers';
import { getCharacterColor } from '@utils/get-character-color';
import {
  Button,
  Checkbox,
  Heading,
  HealthBar,
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
import { useGameData, useSave } from '@store';
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
  const health = useSave((s) => s.save?.characters[character].health) ?? 0;
  const maxHealth =
    useSave((s) => s.save?.characters[character].maxHealth) ?? 0;
  const updateSave = useSave((s) => s.updateSave);
  const weapons = useGameData((state) => state.weapons.byId);
  const armors = useGameData((state) => state.armors.byId);
  const equipmentLookup = { weapons, armors };

  function resetStats() {
    updateSave((save) => {
      resetCharacterCoreStats(
        save.characters[character],
        character,
        chapter,
        equipmentLookup,
      );
    });
  }

  return (
    <div className="page xl:flex-initial xl:min-h-0 short:pb-6">
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

      <Section id="main" className="flex flex-col xl:flex-1 squeeze:min-h-0">
        <div className="grid flex-1 gap-3 squeeze:min-h-0 lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-[auto_repeat(4,auto_minmax(0.75rem,2.25rem))] xl:[@media(height<780px)]:grid-rows-[auto_repeat(4,auto_0.75rem)]">
          <CharacterHeader character={character} icon={icon} />
          <div className="grid gap-y-3 border border-border shadow shadow-surface-1/50 px-6 py-6 lg:row-span-4 lg:grid-rows-subgrid xl:row-span-8 xl:gap-y-0 xl:pt-4 xl:pb-4">
            <div className="flex items-center justify-between self-start xl:row-span-2">
              <Heading level={4}>{t('ui.party.stats', 'Stats')}</Heading>
              <Button onClick={resetStats} size="sm" icon={<ResetIcon />}>
                {t('ui.party.resetStats', 'Reset stats')}
              </Button>
            </div>
            <Section
              id="health"
              className="grid grid-cols-[1fr_1.25rem_1fr] items-end gap-x-3 self-start xl:row-span-2"
            >
              <StatsField
                id="current-health"
                character={character}
                type="health"
              />
              <span className="mb-3 h-5 w-5 text-text-2">
                <DividerIcon />
              </span>
              <StatsField
                id="max-health"
                character={character}
                type="maxHealth"
              />
              <HealthBar
                health={health}
                maxHealth={maxHealth}
                bg={color.bg}
                className="col-span-3 mt-3"
              />
            </Section>
            <Section
              id="stats"
              className="grid grid-cols-3 gap-x-3 self-start xl:row-span-2"
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
          </div>
          <Section
            id="loadout"
            className="grid gap-y-3 border border-border shadow shadow-surface-1/50 px-6 py-6 lg:row-span-4 lg:grid-rows-subgrid xl:row-span-8 xl:gap-y-0 xl:pt-4 xl:pb-4 xl:*:row-span-2 xl:*:self-start"
          >
            <Heading level={4}>{t('ui.party.equipment', 'Equipment')}</Heading>
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
          <Section
            id="spells"
            className="grid gap-x-4 gap-y-3 border border-border shadow shadow-surface-1/50 px-6 py-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:row-span-8 xl:grid-rows-subgrid xl:gap-y-0 xl:pt-4 xl:pb-4 xl:*:row-span-2 xl:*:self-start"
          >
            <InlineGroup className="lg:col-span-2">
              <Heading level={4}>{t('ui.party.spells', 'Spells')}</Heading>
              <HelpTip title={t('ui.party.spells', 'Spells')} variant="warning">
                <p>
                  {t(
                    'ui.party.unobtainableSpellsWarning',
                    'Some of the spells are unobtainable in game. They are often unfinished, broken and can cause issues.',
                  )}
                </p>
              </HelpTip>
            </InlineGroup>
            {SPELL_SLOTS.map((slot) => (
              <SpellField
                id={`spell-slot${slot}`}
                key={slot}
                slot={slot}
                character={character}
                allowAllItems={allowAllElements}
              />
            ))}
          </Section>
        </div>
      </Section>
    </div>
  );
}

const SPELL_SLOTS = [0, 1, 2, 3, 4, 5];
