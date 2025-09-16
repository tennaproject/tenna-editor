import {
  Card,
  GlowBar,
  Heading,
  ItemField,
  LightWorldLoadoutField,
  LightWorldStatsField,
  Page,
  Section,
} from '@components';
import { mergeClass } from '@utils';
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
                      id="health"
                      className="flex justify-between items-end w-full"
                    >
                      <LightWorldStatsField type="health" id="current-health" />
                      <span className="h-5 w-5 mb-3 mx-3 text-text-2">
                        <DividerIcon />
                      </span>
                      <LightWorldStatsField type="maxHealth" id="max-health" />
                    </Section>
                    <Section id="stats" className="grid grid-cols-2 gap-4">
                      <LightWorldStatsField type="level" id="level" />
                      <LightWorldStatsField type="experience" id="experience" />
                      <LightWorldStatsField type="attack" id="attack" />
                      <LightWorldStatsField type="defence" id="defence" />
                    </Section>

                    <div className="flex flex-col gap-4">
                      <LightWorldLoadoutField type="weapon" id="weapon" />
                      <LightWorldLoadoutField type="armor" id="armor" />
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
                        <ItemField key={i} slot={i} type="lightWorldItem" />
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
                        <ItemField key={i} slot={i} type="phoneContact" />
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
