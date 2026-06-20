import type { ChapterIndex } from '@data';
import {
  PLOT_META_BY_CHAPTER,
  type PlotPointProperties,
} from '@data/plot-points';
import { chapterHelpers } from './data-helpers';

export function getChapterPlotPointMeta(
  chapter: ChapterIndex,
  value: number,
): PlotPointProperties | undefined {
  const chapterMeta = PLOT_META_BY_CHAPTER[
    chapter as keyof typeof PLOT_META_BY_CHAPTER
  ] as Record<number, PlotPointProperties> | undefined;

  return chapterMeta?.[value];
}

export function formatPlotPointLabel(
  value: number,
  meta: PlotPointProperties | undefined,
): string {
  if (!meta) return String(value);
  const suffix = meta.unused ? ' (unused)' : '';
  return `${meta.displayName}${suffix}`;
}

export function getPlotPointLabel(
  chapter: ChapterIndex,
  value: number,
): string {
  return formatPlotPointLabel(value, getChapterPlotPointMeta(chapter, value));
}

export function getChapterPlotPointValues(chapter: ChapterIndex): number[] {
  const plotPoints = chapterHelpers.getById(chapter).content.plotPoints;
  return Array.from(plotPoints).sort((a, b) => a - b);
}
