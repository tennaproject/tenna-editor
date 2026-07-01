import {
  Card,
  Checkbox,
  FlagField,
  Heading,
  HelpTip,
  InlineGroup,
  Page,
  RecruitField,
  Section,
} from '@components';
import { FLAGS } from '@data';
import type { ChapterIndex, EnemyIndex } from '@data';
import { useSave, useUi } from '@store';
import { chapterHelpers, enemyHelpers } from '@utils';
import { useTranslation } from '../../i18n';

const recruitableEnemiesCache = new Map<string, EnemyIndex[]>();
const CAFE_SEATS = [
  { id: 'cafe-top-left', flag: FLAGS.CAFE_TOP_LEFT_RECRUIT },
  { id: 'cafe-top-right', flag: FLAGS.CAFE_TOP_RIGHT_RECRUIT },
  { id: 'cafe-bottom-left', flag: FLAGS.CAFE_BOTTOM_LEFT_RECRUIT },
  { id: 'cafe-bottom-right', flag: FLAGS.CAFE_BOTTOM_RIGHT_RECRUIT },
] as const;

function getRecruitableEnemies(
  chapter: ChapterIndex,
  showNonRecruitableEnemies: boolean,
): EnemyIndex[] {
  const key = `${chapter}:${showNonRecruitableEnemies}`;
  const cached = recruitableEnemiesCache.get(key);
  if (cached) return cached;

  const enemies = chapterHelpers.getById(chapter).content.enemies;

  let recruitableEnemies = Array.from(enemies).filter(
    (enemy) => enemyHelpers.getById(enemy).recruitFlag,
  );

  if (!showNonRecruitableEnemies) {
    recruitableEnemies = recruitableEnemies.filter(
      (enemy) => enemyHelpers.getById(enemy).recruitable,
    );
  }

  recruitableEnemiesCache.set(key, recruitableEnemies);
  return recruitableEnemies;
}

export function RecruitsRoot() {
  const { t } = useTranslation();
  const showNonRecruitableEnemies = useUi(
    (s) => s.ui.recruits.showNonRecruitableEnemies,
  );
  const updateUi = useUi((s) => s.updateUi);

  const chapter = useSave((s) => s.save?.meta.chapter) as ChapterIndex;
  const recruitableEnemies = getRecruitableEnemies(
    chapter,
    showNonRecruitableEnemies,
  );

  return (
    <Page>
      <Page.TopBar title={t('ui.nav.recruits', 'Recruits')} />
      <Page.Content>
        <div className="page">
          <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:gap-5">
            <InlineGroup>
              <Checkbox
                onChange={(state) =>
                  updateUi(
                    (ui) => (ui.recruits.showNonRecruitableEnemies = state),
                  )
                }
                checked={showNonRecruitableEnemies}
                label={t(
                  'ui.recruits.showNonRecruitableEnemies',
                  'Show non-recruitable enemies',
                )}
              />
              <HelpTip
                title={t(
                  'ui.recruits.showNonRecruitableEnemies',
                  'Show non-recruitable enemies',
                )}
              >
                <p>
                  {t(
                    'ui.recruits.showNonRecruitableEnemiesDescription1',
                    'All Chapter 1 and 2 enemies have their respective recruitment flags.',
                  )}
                </p>
                <p>
                  {t(
                    'ui.recruits.showNonRecruitableEnemiesDescription2',
                    'These do not affect anything but do exist.',
                  )}
                </p>
                <p>
                  {t(
                    'ui.recruits.showNonRecruitableEnemiesDescription3',
                    'This option allows to set them as recruited.',
                  )}
                </p>
              </HelpTip>
            </InlineGroup>
          </div>

          <Section id="cafe" className="mb-4">
            <Card className="px-6 py-6">
              <div className="flex flex-col gap-3">
                <InlineGroup>
                  <Heading level={3}>{t('ui.recruits.cafe', 'Cafe')}</Heading>
                  <HelpTip title={t('ui.recruits.cafeSeating', 'Cafe seating')}>
                    <p>
                      {t(
                        'ui.recruits.cafeSeatingDescription',
                        'Choose which recruit sits at each table in the Cafe at Castle Town.',
                      )}
                    </p>
                  </HelpTip>
                </InlineGroup>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 mt-3">
                  {CAFE_SEATS.map((seat) => (
                    <FlagField key={seat.id} id={seat.id} flag={seat.flag} />
                  ))}
                </div>
              </div>
            </Card>
          </Section>

          <Section id="main">
            <Card className="flex flex-col justify-between flex-1 px-6 py-6">
              <div className="flex flex-col gap-3">
                <Heading level={3}>{t('ui.nav.recruits', 'Recruits')}</Heading>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
                  {recruitableEnemies.map((enemy) => (
                    <RecruitField
                      key={enemy}
                      id={`main-${enemyHelpers.getName(enemy).toLowerCase()}`}
                      enemy={enemy}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </Section>
        </div>
      </Page.Content>
    </Page>
  );
}
