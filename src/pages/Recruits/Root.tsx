import {
  Card,
  Checkbox,
  Heading,
  HelpTip,
  InlineGroup,
  Page,
  Section,
} from '@components';
import { useSave, useUi } from '@store';
import type { ChapterIndex } from '@data';
import { chapterHelpers, enemyHelpers } from '@utils';
import { RecruitField } from './components';

export function RecruitsRoot() {
  const showNonRecruitableEnemies = useUi(
    (s) => s.ui.recruits.showNonRecruitableEnemies,
  );
  const updateUi = useUi((s) => s.updateUi);

  const chapter = useSave((s) => s.save?.meta.chapter) as ChapterIndex;
  const enemies = chapterHelpers.getById(chapter).content.enemies;

  let recruitableEnemies = Array.from(enemies).filter(
    (enemy) => enemyHelpers.getById(enemy).recruitFlag,
  );

  if (!showNonRecruitableEnemies) {
    recruitableEnemies = recruitableEnemies.filter(
      (enemy) => enemyHelpers.getById(enemy).recruitable,
    );
  }

  return (
    <Page>
      <Page.TopBar title="Recruits" />
      <Page.Content>
        <div className="page">
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 ">
            <InlineGroup>
              <Checkbox
                onChange={(state) =>
                  updateUi(
                    (ui) => (ui.recruits.showNonRecruitableEnemies = state),
                  )
                }
                checked={showNonRecruitableEnemies}
                label="Show non-recruitable enemies"
              />
              <HelpTip title="Show non-recruitable enemies">
                <p>
                  All Chapter 1 and 2 enemies have their respective recruitment
                  flags.
                </p>
                <p>These do not affect anything but do exist.</p>
                <p>This option allows to set them as recruited.</p>
              </HelpTip>
            </InlineGroup>
          </div>
          <Section id="main">
            <Card className="flex flex-col justify-between flex-1 px-6 py-6">
              <div className="flex flex-col">
                <div className="flex flex-col gap-3">
                  <Heading level={3}>Recruits</Heading>
                  <div className="grid lg:grid-cols-4 gap-8 mt-3">
                    {recruitableEnemies.map((enemy) => (
                      <RecruitField
                        key={enemy}
                        id={`main-${enemyHelpers.getName(enemy).toLowerCase()}`}
                        enemy={enemy}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Section>
        </div>
      </Page.Content>
    </Page>
  );
}
