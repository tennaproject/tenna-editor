import type { DeltaruneSave } from '@types';
import type { ChapterIndex } from '@data';

export interface ChapterDetectionResult {
  chapter?: ChapterIndex;
  reason?: 'format' | 'room';
  supported: boolean;
}

export function detectChapter(save: DeltaruneSave): ChapterDetectionResult {
  if (save.format === 'v1') {
    return {
      chapter: 1,
      reason: 'format',
      supported: true,
    };
  }

  const roomPrefix = Number(String(save.room)[0]) as ChapterIndex;
  if (roomPrefix >= 1 && roomPrefix <= 4) {
    return {
      chapter: roomPrefix,
      reason: 'room',
      supported: true,
    };
  }

  return {
    supported: false,
  };
}
