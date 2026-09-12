import CrystalIcon from '@assets/deltarune/ui/shadow-crystal.svg?react';
import CrystalSlotIcon from '@assets/deltarune/ui/shadow-crystal-slot.svg?react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { mergeClass } from '@utils/merge-class';
import { useTranslation } from '../i18n';
import { TextLabel } from './TextLabel';
import { ResponsiveTable, ResponsiveTableRow } from './ResponsiveTable';
import type { ChapterIndex } from '@data';
import type { SaveSlot } from '@types';

const CHAPTERS: ChapterIndex[] = [1, 2, 3, 4, 5];
const SLOTS: SaveSlot[] = [0, 1, 2];
const MENU_POSITIONS: Record<ChapterIndex, string> = {
  1: 'left-0',
  2: '-left-8',
  3: '-left-16',
  4: '-right-8',
  5: 'right-0',
};

interface Outcome {
  value: number;
  key: string;
  fallback: string;
}

const NONE: Outcome = {
  value: 0,
  key: 'ui.download.historyNone',
  fallback: 'No recorded result',
};

const OUTCOMES: Record<ChapterIndex, Outcome[]> = {
  1: [
    NONE,
    {
      value: 1,
      key: 'ui.download.historyDefeatedByFighting',
      fallback: 'Defeated by fighting',
    },
    { value: 2, key: 'ui.download.historySpared', fallback: 'Spared' },
    {
      value: 3,
      key: 'ui.download.historyBoth',
      fallback: 'Both recorded outcomes',
    },
  ],
  2: [
    NONE,
    {
      value: 1,
      key: 'ui.download.historyDefeatedByFighting',
      fallback: 'Defeated by fighting',
    },
    { value: 2, key: 'ui.download.historySpared', fallback: 'Spared' },
    {
      value: 3,
      key: 'ui.download.historyBoth',
      fallback: 'Both recorded outcomes',
    },
  ],
  3: [
    NONE,
    { value: 1, key: 'ui.download.historyWon', fallback: 'Won' },
    { value: 2, key: 'ui.download.historyLost', fallback: 'Lost' },
    {
      value: 3,
      key: 'ui.download.historyBoth',
      fallback: 'Both recorded outcomes',
    },
  ],
  4: [
    NONE,
    { value: 1, key: 'ui.download.historyDefeated', fallback: 'Defeated' },
    {
      value: 2,
      key: 'ui.download.historyCompletedMigrated',
      fallback: 'Completed (migrated)',
    },
    {
      value: 3,
      key: 'ui.download.historyBoth',
      fallback: 'Both recorded outcomes',
    },
  ],
  5: [NONE, { value: 2, key: 'ui.download.historySpared', fallback: 'Spared' }],
};

function showsShadowCrystal(chapter: number, outcome: number): boolean {
  return outcome > 0 && !(chapter === 3 && outcome === 2);
}

function outcomesFor(
  chapter: ChapterIndex,
  current: number,
  unknownLabel: string,
): Outcome[] {
  const listed = OUTCOMES[chapter];
  if (listed.some((outcome) => outcome.value === current)) return listed;
  return [
    ...listed,
    {
      value: current,
      key: 'ui.download.historyUnknown',
      fallback: `${unknownLabel} ${current}`,
    },
  ];
}

function OutcomeIcon({
  chapter,
  outcome,
  className,
}: {
  chapter: ChapterIndex;
  outcome: number;
  className?: string;
}) {
  const isCrystal = showsShadowCrystal(chapter, outcome);
  const Icon = isCrystal ? CrystalIcon : CrystalSlotIcon;
  return (
    <span
      className={mergeClass(
        'flex size-5 shrink-0 items-center justify-center',
        className,
      )}
      aria-hidden
    >
      <Icon
        className={mergeClass(
          'block',
          isCrystal
            ? 'h-[14px] w-[11px] text-text-1'
            : 'h-1.5 w-1.5 text-text-2',
        )}
      />
    </span>
  );
}

export interface ShadowCrystalGridProps {
  history: Record<string, number>;
  overrides: Record<string, number>;
  onHistoryChange: (
    chapter: ChapterIndex,
    slot: number,
    outcome: number | undefined,
  ) => void;
  className?: string;
}

export function ShadowCrystalGrid({
  history,
  overrides,
  onHistoryChange,
  className,
}: ShadowCrystalGridProps) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openKey) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpenKey(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenKey(null);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openKey]);

  const unknownLabel = t('ui.download.historyUnknown', 'Unknown value');
  const title = t('ui.download.historyTitle', 'Shadow crystals');
  const automaticLabel = t('ui.download.historyAutomatic', 'Automatic');
  const manualLabel = t('ui.download.historyManual', 'Manual');

  return (
    <div
      ref={rootRef}
      className={mergeClass('flex h-full flex-col', className)}
    >
      <div className="flex items-center justify-between gap-2">
        <TextLabel>{title}</TextLabel>
        {Object.keys(overrides).length > 0 && (
          <span className="text-xs text-tenna">* {manualLabel}</span>
        )}
      </div>
      <ResponsiveTable
        layout="shadow-crystals"
        className="min-h-0 flex-1"
        headers={CHAPTERS.map((chapter) => ({
          id: String(chapter),
          content: String(chapter),
          align: 'center' as const,
        }))}
      >
        {SLOTS.map((slot) => (
          <ResponsiveTableRow
            key={slot}
            className="hover:bg-transparent focus-within:bg-transparent"
          >
            {CHAPTERS.map((chapter) => {
              const key = `${chapter}_${slot}`;
              const value = history[key] ?? 0;
              const options = outcomesFor(chapter, value, unknownLabel);
              const isOpen = openKey === key;
              const isManual = Object.hasOwn(overrides, key);

              return (
                <div key={key} className="relative flex min-h-8 min-w-8">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    title={isManual ? manualLabel : automaticLabel}
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    className={mergeClass(
                      'flex min-h-8 min-w-8 flex-1 items-center justify-center',
                      'hover:bg-surface-3/40 focus-visible:outline-1 focus-visible:outline-text-1',
                      isOpen && 'bg-surface-3/40',
                    )}
                  >
                    <OutcomeIcon chapter={chapter} outcome={value} />
                    {isManual && (
                      <span className="absolute right-1 top-0 text-xs text-tenna">
                        *
                      </span>
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        role="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        transition={{ duration: reducedMotion ? 0 : 0.1 }}
                        className={mergeClass(
                          'absolute top-full z-50 mt-1 w-40 border border-border bg-surface-3 py-1 shadow-lg',
                          MENU_POSITIONS[chapter],
                        )}
                      >
                        <button
                          type="button"
                          role="menuitemradio"
                          aria-checked={!isManual}
                          onClick={() => {
                            onHistoryChange(chapter, slot, undefined);
                            setOpenKey(null);
                          }}
                          className={mergeClass(
                            'flex w-full items-center gap-2 px-3 py-2 text-left text-sm leading-none text-text-1 hover:bg-surface-3-hover outline-none focus:bg-surface-3-hover',
                            !isManual && 'bg-surface-4-active',
                          )}
                        >
                          {automaticLabel}
                        </button>
                        {options.map((outcome) => {
                          const chosen = isManual && outcome.value === value;
                          return (
                            <button
                              key={outcome.value}
                              type="button"
                              role="menuitemradio"
                              aria-checked={chosen}
                              onClick={() => {
                                onHistoryChange(chapter, slot, outcome.value);
                                setOpenKey(null);
                              }}
                              className={mergeClass(
                                'flex w-full items-center gap-2 px-3 py-2 text-left text-sm leading-none text-text-1',
                                'motion-reduce:transition-none transition-colors hover:bg-surface-3-hover',
                                'outline-none focus:bg-surface-3-hover',
                                chosen && 'bg-surface-4-active',
                              )}
                            >
                              <OutcomeIcon
                                chapter={chapter}
                                outcome={outcome.value}
                                className="justify-start"
                              />
                              {outcome.key === 'ui.download.historyUnknown'
                                ? `${unknownLabel} ${outcome.value}`
                                : t(outcome.key, outcome.fallback)}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </ResponsiveTableRow>
        ))}
      </ResponsiveTable>
    </div>
  );
}
