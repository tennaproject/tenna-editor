import { Card, GlowBar, Heading, Page, Section } from '@components';
import { mergeClass } from '@utils';
import { ItemField, KitField, StatField } from './components';
import DividerIcon from '@assets/icons/minus.svg?react';

const THEME = {
  bg: 'bg-[#a6ab2f]',
  shadow: 'shadow-[#a6ab2f]',
  text: 'text-[#a6ab2f]',
} as const;

export function LightWorldRoot() {
  return (
    <Page>
      <Page.TopBar title="Light World" />
      <Page.Content>
        <div className="page lg:h-full">
          <div className="flex flex-col lg:flex-row gap-3 lg:h-full lg:max-h-[900px]">
            <Section
              id="main"
              className="flex flex-col flex-1 lg:min-h-[700px] min-h-[700px]"
            >
              <Card className="flex flex-col justify-between flex-1">
                <div className="flex flex-col">
                  <Section
                    id="main-title"
                    className="flex flex-col items-center border-b border-divider px-2 py-4"
                  >
                    <Heading level={4} className="uppercase my-1">
                      Light World
                    </Heading>
                    <Heading
                      level={2}
                      className={mergeClass('uppercase', THEME.text)}
                    >
                      Kris
                    </Heading>
                  </Section>
                  <div className="flex flex-col gap-12 px-6 py-6">
                    <Section
                      id="main-hp"
                      className="flex justify-between items-end w-full"
                    >
                      <StatField
                        kind="health"
                        label="Current HP"
                        id="main-hp-current"
                      />
                      <span className="h-5 w-5 mb-3 mx-3 text-text-2">
                        <DividerIcon />
                      </span>
                      <StatField
                        kind="maxHealth"
                        label="Max HP"
                        id="main-hp-max"
                      />
                    </Section>
                    <div className="grid grid-cols-2 gap-4">
                      <StatField
                        kind="level"
                        label="Level"
                        id="main-stats-level"
                      />
                      <StatField
                        kind="experience"
                        label="Experience"
                        id="main-stats-experience"
                      />
                      <StatField
                        kind="attack"
                        label="Attack"
                        id="main-stats-attack"
                      />
                      <StatField
                        kind="defence"
                        label="Defence"
                        id="main-stats-defence"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <KitField kind="weapon" label="Weapon" id="main-weapon" />
                      <KitField kind="armor" label="Armor" id="main-armor" />
                    </div>
                  </div>
                </div>
                <GlowBar bg={THEME.bg} shadow={THEME.shadow} />
              </Card>
            </Section>
            <div className="flex flex-col flex-7/16 gap-3 lg:min-h-[700px] min-h-[700px]">
              <Section id="items" className="flex flex-1">
                <Card className="flex-1 p-6 flex gap-3 flex-col">
                  <Section>
                    <Heading level={4}>Items</Heading>
                    <div className="text-text-2">
                      <p>This inventory applies to Light World only.</p>
                    </div>

                    <div className="w-full grid lg:grid-cols-4 gap-4 mt-8">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <ItemField
                          key={i}
                          slot={i}
                          kind="item"
                          id={`items-slot${i}`}
                        />
                      ))}
                    </div>
                  </Section>
                </Card>
              </Section>{' '}
              <Section id="phone-contacts" className="flex flex-1">
                <Card className="flex-1 p-6 flex gap-3 flex-col">
                  <Section>
                    <Heading level={4}>Phone Contacts</Heading>
                    <div className="w-full grid lg:grid-cols-4 gap-4 mt-8">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <ItemField
                          key={i}
                          slot={i}
                          kind="phoneContact"
                          id={`phoneContacts-slot${i}`}
                        />
                      ))}
                    </div>
                  </Section>
                </Card>
              </Section>
            </div>
          </div>
        </div>
      </Page.Content>
    </Page>
  );
}
