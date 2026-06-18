import type { Save } from '@types';
import { CHAPTERS_META, type ChapterIndex, type RoomIndex } from '@data';

export interface ChapterScore {
  chapter: ChapterIndex;
  weight: number;
  reason: string;
}

export interface DetectionSignal {
  name: string;
  scores: ChapterScore[];
  reliability: number;
}

export interface ChapterDetectionResult {
  chapter?: ChapterIndex;
  reason?: 'format' | 'room' | 'weighted';
  supported: boolean;
  confidence?: number;
  signals?: DetectionSignal[];
  needsConfirmation?: boolean;
}

const chapters: ChapterIndex[] = [1, 2, 3, 4, 5];
const exclusiveFlagsMap = new Map<ChapterIndex, Set<number>>();

for (let i = 0; i < chapters.length; i++) {
  const ch = chapters[i];
  const meta = CHAPTERS_META[ch];
  if (!meta) continue;

  const currentFlags = meta.content.flags;
  const exclusive = new Set<number>();

  for (const flag of currentFlags) {
    let isExclusive = true;
    for (let j = 0; j < i; j++) {
      const prevCh = chapters[j];
      const prevMeta = CHAPTERS_META[prevCh];
      if (prevMeta && prevMeta.content.flags.has(flag)) {
        isExclusive = false;
        break;
      }
    }
    if (isExclusive) {
      exclusive.add(flag);
    }
  }
  exclusiveFlagsMap.set(ch, exclusive);
}

function detectByFormat(save: Save): DetectionSignal {
  const scores: ChapterScore[] = [
    { chapter: 1, weight: 0, reason: 'Format mismatch' },
    { chapter: 2, weight: 0, reason: 'Format mismatch' },
    { chapter: 3, weight: 0, reason: 'Format mismatch' },
    { chapter: 4, weight: 0, reason: 'Format mismatch' },
    { chapter: 5, weight: 0, reason: 'Format mismatch' },
  ];

  const format = save.meta?.format;
  if (format === 1) {
    scores[0].weight = 100;
    scores[0].reason = 'Save is format 1 (exclusive to Chapter 1)';
    return {
      name: 'format',
      scores,
      reliability: 1.0,
    };
  } else if (format === 2) {
    for (let i = 1; i < scores.length; i++) {
      scores[i].weight = 25;
      scores[i].reason = 'Save is format 2 (used by Chapters 2-5)';
    }
    return {
      name: 'format',
      scores,
      reliability: 0.3,
    };
  }

  return {
    name: 'format',
    scores,
    reliability: 0,
  };
}

function detectByRoom(save: Save): DetectionSignal {
  const scores: ChapterScore[] = [
    { chapter: 1, weight: 0, reason: 'Room not in chapter' },
    { chapter: 2, weight: 0, reason: 'Room not in chapter' },
    { chapter: 3, weight: 0, reason: 'Room not in chapter' },
    { chapter: 4, weight: 0, reason: 'Room not in chapter' },
    { chapter: 5, weight: 0, reason: 'Room not in chapter' },
  ];

  const room = save.room as number;
  if (room === undefined || room === null) {
    return { name: 'room', scores, reliability: 0 };
  }

  // Chapter 4 completion edge case
  if (room === 18) {
    return {
      name: 'room',
      scores: [
        { chapter: 1, weight: 0, reason: 'Room 18 is not in Chapter 1' },
        { chapter: 2, weight: 0, reason: 'Room 18 is not in Chapter 2' },
        { chapter: 3, weight: 0, reason: 'Room 18 is not in Chapter 3' },
        {
          chapter: 4,
          weight: 100,
          reason: 'Room 18 is a known Chapter 4 completion room',
        },
        { chapter: 5, weight: 80, reason: 'Room 18 is not in Chapter 5' },
      ],
      reliability: 0.95,
    };
  }

  let matchedChaptersCount = 0;
  for (const score of scores) {
    const meta = CHAPTERS_META[score.chapter];
    if (meta && meta.content.rooms.has(room as RoomIndex)) {
      score.weight = 80;
      score.reason = `Room ${room} is explicitly defined in Chapter ${score.chapter} rooms list`;
      matchedChaptersCount++;
    }
  }

  // Fallback to room prefix
  if (matchedChaptersCount === 0) {
    const roomPrefix = Number(String(room)[0]);
    if (roomPrefix >= 1 && roomPrefix <= 5) {
      const targetCh = roomPrefix as ChapterIndex;
      for (const score of scores) {
        if (score.chapter === targetCh) {
          score.weight = 60;
          score.reason = `Fallback: Room prefix ${roomPrefix} matches Chapter ${targetCh}`;
        } else if (targetCh === 4 && score.chapter === 5) {
          score.weight = 60;
          score.reason = `Fallback: Room prefix 4 matches Chapter 4 or 5`;
        }
      }
    }
  }

  const isDebugRoom = room >= 20001 && room <= 20026;
  const reliability = isDebugRoom ? 0.5 : 0.85;

  return {
    name: 'room',
    scores,
    reliability,
  };
}

function detectByFilename(filename?: string): DetectionSignal {
  const scores: ChapterScore[] = [
    {
      chapter: 1,
      weight: 0,
      reason: 'Filename does not match chapter pattern',
    },
    {
      chapter: 2,
      weight: 0,
      reason: 'Filename does not match chapter pattern',
    },
    {
      chapter: 3,
      weight: 0,
      reason: 'Filename does not match chapter pattern',
    },
    {
      chapter: 4,
      weight: 0,
      reason: 'Filename does not match chapter pattern',
    },
    {
      chapter: 5,
      weight: 0,
      reason: 'Filename does not match chapter pattern',
    },
  ];

  if (!filename) {
    return { name: 'filename', scores, reliability: 0 };
  }

  const match = filename.match(/filech([1-5])(?:_|$)/i);
  if (match) {
    const chNum = parseInt(match[1]) as ChapterIndex;
    for (const score of scores) {
      if (score.chapter === chNum) {
        score.weight = 70;
        score.reason = `Filename "${filename}" matches Chapter ${chNum} pattern`;
      }
    }
    return {
      name: 'filename',
      scores,
      reliability: 0.95,
    };
  }

  return {
    name: 'filename',
    scores,
    reliability: 0,
  };
}

function detectByFlags(save: Save): DetectionSignal {
  const scores: ChapterScore[] = [
    { chapter: 1, weight: 0, reason: 'No chapter 1 flags set' },
    { chapter: 2, weight: 0, reason: 'No chapter 2 flags set' },
    { chapter: 3, weight: 0, reason: 'No chapter 3 flags set' },
    { chapter: 4, weight: 0, reason: 'No chapter 4 flags set' },
    { chapter: 5, weight: 0, reason: 'No chapter 5 flags set' },
  ];

  if (!save.flags || save.flags.length === 0) {
    return { name: 'flags', scores, reliability: 0 };
  }

  const counts: Record<ChapterIndex, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const ch of [1, 2, 3, 4, 5] as ChapterIndex[]) {
    const exclusive = exclusiveFlagsMap.get(ch);
    if (!exclusive) continue;

    for (const flagIndex of exclusive) {
      const val = save.flags[flagIndex];
      if (val !== undefined && val !== null && val !== 0) {
        counts[ch]++;
      }
    }
  }

  let maxActiveChapter: ChapterIndex = 1;
  for (const ch of [1, 2, 3, 4, 5] as ChapterIndex[]) {
    if (counts[ch] > 0) {
      maxActiveChapter = ch;
    }
  }

  const totalActiveFlags = Object.values(counts).reduce((a, b) => a + b, 0);
  if (totalActiveFlags === 0) {
    return { name: 'flags', scores, reliability: 0 };
  }

  for (const score of scores) {
    if (score.chapter === maxActiveChapter) {
      score.weight = 80;
      score.reason = `Highest chapter with active exclusive flags (count: ${counts[maxActiveChapter]})`;
    } else if (maxActiveChapter === 4 && score.chapter === 5) {
      score.weight = 80;
      score.reason = `Chapter 5 shares all flags with Chapter 4 (active exclusive flags count: ${counts[4]})`;
    } else if (score.chapter < maxActiveChapter) {
      score.weight = 20;
      score.reason = `Prior chapter to active flags in Chapter ${maxActiveChapter}`;
    } else {
      score.weight = 0;
      score.reason = `No active flags for Chapter ${score.chapter} while Chapter ${maxActiveChapter} has active flags`;
    }
  }

  return {
    name: 'flags',
    scores,
    reliability: 0.8,
  };
}

export function detectChapter(
  save: Save,
  filename?: string,
): ChapterDetectionResult {
  const formatSignal = detectByFormat(save);
  const roomSignal = detectByRoom(save);
  const filenameSignal = detectByFilename(filename);
  const flagsSignal = detectByFlags(save);

  const signals = [formatSignal, roomSignal, filenameSignal, flagsSignal];

  const totalScore: Record<ChapterIndex, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let sumScore = 0;

  for (const signal of signals) {
    if (signal.reliability === 0) continue;
    for (const score of signal.scores) {
      const weightedVal = score.weight * signal.reliability;
      totalScore[score.chapter] += weightedVal;
      sumScore += weightedVal;
    }
  }

  if (sumScore === 0) {
    return {
      supported: false,
    };
  }

  let maxScore = -1;
  let detectedChapter: ChapterIndex = 1;

  for (const ch of [1, 2, 3, 4, 5] as ChapterIndex[]) {
    if (totalScore[ch] > maxScore) {
      maxScore = totalScore[ch];
      detectedChapter = ch;
    }
  }

  const confidence = maxScore / sumScore;
  const needsConfirmation = confidence < 0.7;

  let bestReason: 'format' | 'room' | 'weighted' = 'weighted';
  if (
    formatSignal.reliability === 1.0 &&
    formatSignal.scores[0].weight === 100
  ) {
    bestReason = 'format';
  } else if (
    roomSignal.reliability > 0.8 &&
    roomSignal.scores.some(
      (s) => s.chapter === detectedChapter && s.weight >= 80,
    )
  ) {
    bestReason = 'room';
  }

  return {
    chapter: detectedChapter,
    reason: bestReason,
    supported: true,
    confidence,
    signals,
    needsConfirmation,
  };
}
