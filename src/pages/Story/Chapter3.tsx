import { Section, Card, Heading, FlagField } from '@components';
import { FLAGS } from '@data';

function DarkWorldSection() {
  return (
    <Section id="dark-world" className="flex-1 flex">
      <Card className="flex-1 flex flex-col gap-3 p-6">
        <Heading level={3}>Dark World</Heading>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="got-moss" flag={FLAGS.GOT_MOSS_CH3} />
            <FlagField id="got-egg" flag={FLAGS.EGG_CH3} />
            <FlagField id="skipped-intro" flag={FLAGS.SKIPPED_INTRO_CH3} />
            <FlagField id="got-golden-tenna" flag={FLAGS.GOT_GOLDEN_TENNA} />
            <FlagField id="entered-1225-room" flag={FLAGS.ENTERED_1225_ROOM} />
            <FlagField id="starwalker" flag={FLAGS.STARWALKER_CH3} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="susie-heal-count" flag={FLAGS.SUSIE_HEAL_COUNT} />
            <FlagField id="knight-fight" flag={FLAGS.KNIGHT_FIGHT} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="sword-progress" flag={FLAGS.SWORD_PROGRESS} />
            <FlagField id="bibliox-progress" flag={FLAGS.BIBLIOX_PROGRESS} />
          </div>
          <div className="flex-1 flex flex-col gap-3"></div>
        </div>
      </Card>
    </Section>
  );
}

function GameshowSection() {
  return (
    <Section id="gameshow" className="flex-1 flex">
      <Card className="flex-1 flex flex-col gap-3 p-6">
        <Heading level={3}>Gameshow</Heading>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <FlagField
              id="unlocked-susiezilla"
              flag={FLAGS.UNLOCKED_SUSIEZILLA}
            />
            <FlagField id="first-letter" flag={FLAGS.GAMESHOW_LETTER_FIRST} />
            <FlagField id="second-letter" flag={FLAGS.GAMESHOW_LETTER_SECOND} />
            <FlagField id="third-letter" flag={FLAGS.GAMESHOW_LETTER_THIRD} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="rank-board-1" flag={FLAGS.RANK_BOARD_1} />
            <FlagField id="rank-board-2" flag={FLAGS.RANK_BOARD_2} />
            <FlagField id="score-cooking" flag={FLAGS.SCORE_COOKING} />
            <FlagField id="rank-cooking" flag={FLAGS.RANK_COOKING} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField
              id="score-lightners-live"
              flag={FLAGS.SCORE_LIGHTNERS_LIVE}
            />
            <FlagField
              id="rank-lightners-live"
              flag={FLAGS.RANK_LIGHTNERS_LIVE}
            />
            <FlagField id="score-susiezilla" flag={FLAGS.SCORE_SUSIEZILLA} />
            <FlagField id="rank-susiezilla" flag={FLAGS.RANK_SUSIEZILLA} />
          </div>
        </div>
      </Card>
    </Section>
  );
}

export function StoryChapter3() {
  return (
    <article className="page flex flex-col gap-3">
      <Section id="progress" className="flex flex-col gap-3">
        <GameshowSection />
        <DarkWorldSection />
      </Section>
    </article>
  );
}
