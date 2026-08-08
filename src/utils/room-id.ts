import { CHAPTERS_META, type ChapterIndex, type RoomIndex } from '@data';

const LEGACY_ROOM_OFFSET_FLAG = 279;
const LEGACY_ROOM_OFFSET = 281;
const CHAPTER_4_COMPLETION_ROOM = 18;

// demo and survey_program releases have wrong room ids SOMETIMES
export function normalizeLegacyRoomId(
  roomId: number,
  chapter: ChapterIndex,
  flags: readonly unknown[] = [],
): RoomIndex {
  const originalRoomId = roomId as RoomIndex;
  if (!Number.isInteger(roomId) || roomId <= 0 || roomId >= 10_000) {
    return originalRoomId;
  }
  if (chapter === 4 && roomId === CHAPTER_4_COMPLETION_ROOM) {
    return originalRoomId;
  }

  const chapterRooms = CHAPTERS_META[chapter]?.content.rooms;
  if (!chapterRooms || chapterRooms.has(originalRoomId)) {
    return originalRoomId;
  }

  const suffixes: number[] = [];
  if (
    Number(flags[LEGACY_ROOM_OFFSET_FLAG] ?? 0) === 0 &&
    roomId < LEGACY_ROOM_OFFSET
  ) {
    suffixes.push(LEGACY_ROOM_OFFSET + roomId);
  }
  suffixes.push(roomId);

  for (const suffix of suffixes) {
    const canonicalRoomId = (chapter * 10_000 + suffix) as RoomIndex;
    if (chapterRooms.has(canonicalRoomId)) return canonicalRoomId;
  }

  return originalRoomId;
}
