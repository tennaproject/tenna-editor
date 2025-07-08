import type { DeltaruneSave } from '../types/saveFile';
import type { ChapterIndex } from '../data/chapters';

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
  console.log(roomPrefix);
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
