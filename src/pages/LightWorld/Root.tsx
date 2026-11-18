import {
  GlowBar,
  HealthBar,
  Heading,
  ItemField,
  LightWorldLoadoutField,
  LightWorldStatsField,
  Page,
  Section,
} from '@components';
import { mergeClass } from '@utils';
import DividerIcon from '@assets/icons/minus.svg?react';
import KrisIcon from '@assets/deltarune/characters/kris.svg?react';
import { useSave } from '@store';
import { useTranslation } from '../../i18n';

const THEME = {
  bg: 'bg-[#a6ab2f]',
  shadow: 'shadow-[#a6ab2f]',
  text: 'text-[#a6ab2f]',
} as const;

export function LightWorldRoot() {
  const { t } = useTranslation();
  const health = useSave((s) => s.save?.lightWorld.health) ?? 0;
  const maxHealth = useSave((s) => s.save?.lightWorld.maxHealth) ?? 0;

  return (
    <Page>
      <Page.TopBar title={t('ui.nav.lightWorld', 'Light World')} />
      <Page.Content>
        <div className="page xl:flex-initial xl:min-h-0 short:pb-6">
          <Section
            id="main"
            className="grid flex-1 gap-3 squeeze:min-h-0 lg:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[auto_repeat(4,auto_minmax(0.75rem,2.25rem))_1fr] xl:[@media(height<780px)]:grid-rows-[auto_repeat(4,auto_0.75rem)_1fr]"
          >
            <Section
              id="main-title"
              className="relative col-span-full flex flex-col items-center gap-4 border border-border shadow shadow-surface-1/50 px-6 py-4 lg:flex-row lg:gap-6 short:py-2"
            >
              <div className="flex flex-col items-center lg:flex-row lg:gap-4">
                <span
                  className={mergeClass(
                    'inline-flex h-22 w-22 short:h-15 short:w-15 shrink-0 items-center justify-center',
                    THEME.text,
                  )}
                  aria-hidden
                >
                  <KrisIcon className="h-full w-full" />
                </span>
                <Heading
                  level={2}
                  className={mergeClass(
                    'uppercase lg:text-[2.625rem] short:text-4xl',
                    THEME.text,
                  )}
                >
                  Kris
                </Heading>
              </div>
              <Heading level={5} className="whitespace-nowrap lg:text-xl">
                {t('ui.nav.lightWorld', 'Light World')}
              </Heading>
              <div className="absolute inset-x-0 bottom-0">
                <GlowBar bg={THEME.bg} shadow={THEME.shadow} />
              </div>
            </Section>
            <div className="grid gap-y-3 border border-border shadow shadow-surface-1/50 px-6 py-6 lg:row-span-4 lg:grid-rows-subgrid xl:row-span-9 xl:gap-y-0 xl:pt-4 xl:pb-4 xl:*:row-span-2 xl:*:self-start">
              <Heading level={4}>{t('ui.party.stats', 'Stats')}</Heading>
              <Section
                id="health"
                className="grid grid-cols-[1fr_1.25rem_1fr] items-end gap-x-3"
              >
                <LightWorldStatsField type="health" id="current-health" />
                <span className="mb-3 h-5 w-5 text-text-2">
                  <DividerIcon />
                </span>
                <LightWorldStatsField type="maxHealth" id="max-health" />
                <HealthBar
                  health={health}
                  maxHealth={maxHealth}
                  bg={THEME.bg}
                  className="col-span-3 mt-3"
                />
              </Section>
              <Section
                id="level-experience"
                className="grid grid-cols-[1fr_1.25rem_1fr] gap-x-3"
              >
                <LightWorldStatsField type="level" id="level" />
                <div className="col-start-3">
                  <LightWorldStatsField type="experience" id="experience" />
                </div>
              </Section>
              <Section
                id="stats"
                className="grid grid-cols-[1fr_1.25rem_1fr] gap-x-3"
              >
                <LightWorldStatsField type="attack" id="attack" />
                <div className="col-start-3">
                  <LightWorldStatsField type="defence" id="defence" />
                </div>
              </Section>
            </div>
            <Section
              id="loadout"
              className="grid gap-y-3 border border-border shadow shadow-surface-1/50 px-6 py-6 lg:row-span-4 lg:grid-rows-subgrid xl:row-span-9 xl:gap-y-0 xl:pt-4 xl:pb-4 xl:*:row-span-2 xl:*:self-start"
            >
              <Heading level={4}>
                {t('ui.party.equipment', 'Equipment')}
              </Heading>
              <LightWorldLoadoutField type="weapon" id="weapon" />
              <LightWorldLoadoutField type="armor" id="armor" />
            </Section>
            <div className="flex flex-col gap-3 lg:col-span-2 xl:row-span-9">
              <Section
                id="items"
                className="flex flex-1 flex-col gap-3 border border-border shadow shadow-surface-1/50 p-6"
              >
                <Heading level={4}>{t('ui.lightWorld.items', 'Items')}</Heading>
                <div className="grid w-full gap-4 lg:grid-cols-4">
                  {INVENTORY_SLOTS.map((slot) => (
                    <ItemField key={slot} slot={slot} type="lightWorldItem" />
                  ))}
                </div>
              </Section>
              <Section
                id="phone-contacts"
                className="flex flex-1 flex-col gap-3 border border-border shadow shadow-surface-1/50 p-6"
              >
                <Heading level={4}>
                  {t('ui.lightWorld.phoneContacts', 'Phone Contacts')}
                </Heading>
                <div className="grid w-full gap-4 lg:grid-cols-4">
                  {PHONE_CONTACT_SLOTS.map((slot) => (
                    <ItemField key={slot} slot={slot} type="phoneContact" />
                  ))}
                </div>
              </Section>
            </div>
          </Section>
        </div>
      </Page.Content>
    </Page>
  );
}

const INVENTORY_SLOTS = [0, 1, 2, 3, 4, 5, 6, 7];
const PHONE_CONTACT_SLOTS = [0, 1, 2, 3, 4, 5, 6, 7];
