import {
  Checkbox,
  InlineGroup,
  NumberInput,
  Section,
  TextLabel,
} from '@components';
import type { EnemyIndex, FlagIndex } from '@data';
import { useSave } from '@store';
import { enemyHelpers } from '@utils';

interface RecruitFieldProps {
  id: string;
  enemy: EnemyIndex;
}

export function RecruitField({ id, enemy }: RecruitFieldProps) {
  const updateSave = useSave((s) => s.updateSave);
  const meta = enemyHelpers.getById(enemy);
  const flag =
    (useSave((s) => s.save?.flags[meta.recruitFlag as FlagIndex]) as number) ??
    (0 as number);

  /* Flag values:
    -1 for lost,
    0 when no one is recruited,
    1 when everyone is recruited,
    fractions of 1 when only some are recruited,
  */
  const recruitCount = meta.recruitCount ?? 1;
  let currentlyRecruited = flag;
  if (recruitCount > 1) {
    if (flag !== 0 && flag !== -1) {
      currentlyRecruited = flag * recruitCount;
    }
  }

  return (
    <Section id={id}>
      <InlineGroup>
        <div className="flex flex-col">
          <div className="pl-0.5 flex-1 flex gap-4.5">
            <p className="text-xs text-text-2">Recruited</p>
            <p className="text-xs text-text-2">Recruit count</p>
          </div>
          <InlineGroup className="mt-1">
            <Checkbox
              checked={currentlyRecruited === recruitCount}
              onChange={(state) => {
                updateSave(
                  (save) =>
                    (save.flags[meta.recruitFlag as FlagIndex] = state ? 1 : 0),
                );
              }}
              className="pl-4 pr-2"
            />
            <NumberInput
              min={-1}
              max={recruitCount}
              value={currentlyRecruited}
              onChange={(value) => {
                let newValue = value;
                if (recruitCount > 1) {
                  if (newValue !== 0 && newValue !== -1) {
                    newValue = value / recruitCount;
                  }
                }

                updateSave(
                  (save) =>
                    (save.flags[meta.recruitFlag as FlagIndex] = newValue),
                );
              }}
              className="w-20"
            />
            <TextLabel className="ml-1">{meta.displayName}</TextLabel>
          </InlineGroup>
        </div>
      </InlineGroup>
    </Section>
  );
}
