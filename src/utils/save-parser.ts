import {
  SAVE_SCHEMA,
  type Save,
  type SaveFormat,
  type SaveV1,
  type SaveV2,
} from '@types';
import type {
  ArmorIndex,
  CharacterIndex,
  ConsumableIndex,
  KeyItemIndex,
  RoomIndex,
  SpellIndex,
  WeaponIndex,
} from '../data';
import { LineCursor } from './line-cursor';

export const SAVE_META = {
  V1: {
    TOTAL_LINES: 10_318,
    FLAG_COUNT: 9999,
  },
  V2: {
    TOTAL_LINES: 3055,
    FLAG_COUNT: 2500,
  },
} as const;

export const SUPPORTED_FORMATS = Object.keys(
  SAVE_META,
) as (keyof typeof SAVE_META)[];

function detectSaveFormat(count: number): SaveFormat | null {
  if (
    count >= SAVE_META.V1.TOTAL_LINES &&
    count <= SAVE_META.V1.TOTAL_LINES + 10
  ) {
    return 1;
  }

  if (
    count >= SAVE_META.V2.TOTAL_LINES &&
    count <= SAVE_META.V2.TOTAL_LINES + 10
  ) {
    return 2;
  }

  return null;
}

function parseSaveV1(cursor: LineCursor): SaveV1 {
  const playerName = cursor.nextString();
  const vesselName = cursor.nextString();
  cursor.skip(5);

  const party = [cursor.nextNumber(), cursor.nextNumber(), cursor.nextNumber()];
  const money = cursor.nextNumber();

  const xp = cursor.nextNumber();
  const lv = cursor.nextNumber();
  const inv = cursor.nextNumber();
  const invc = cursor.nextNumber();

  const inDarkWorld = !!cursor.nextNumber();

  const characters = [];
  for (let i = 0; i < 4; i += 1) {
    const health = cursor.nextNumber();
    const maxHealth = cursor.nextNumber();
    const attack = cursor.nextNumber();
    const defence = cursor.nextNumber();
    const magic = cursor.nextNumber();
    const guts = cursor.nextNumber();
    const weapon = cursor.nextNumber() as WeaponIndex;
    const primaryArmor = cursor.nextNumber() as ArmorIndex;
    const secondaryArmor = cursor.nextNumber() as ArmorIndex;
    let weaponStyle = cursor.nextString();

    // Handle nan values from old demo versions
    if (weaponStyle.trim() === 'nan') {
      weaponStyle = 'Normal';
    }

    const weaponStats = [];
    for (let j = 0; j < 4; j += 1) {
      const attack = cursor.nextNumber();
      const defence = cursor.nextNumber();
      const magic = cursor.nextNumber();
      const bolts = cursor.nextNumber();
      const grazeAmount = cursor.nextNumber();
      const grazeSize = cursor.nextNumber();
      const boltSpeed = cursor.nextNumber();
      const special = cursor.nextNumber();

      weaponStats.push({
        attack,
        defence,
        magic,
        bolts,
        grazeAmount,
        grazeSize,
        boltSpeed,
        special,
      });
    }

    const spells: SpellIndex[] = [];
    for (let k = 0; k < 12; k += 1) {
      spells.push(cursor.nextNumber() as SpellIndex);
    }

    characters.push({
      health,
      maxHealth,
      attack,
      defence,
      magic,
      guts,
      weapon,
      primaryArmor,
      secondaryArmor,
      weaponStyle,
      weaponStats,
      spells,
    });
  }

  const boltSpeed = cursor.nextNumber();
  const grazeAmount = cursor.nextNumber();
  const grazeSize = cursor.nextNumber();

  // Inventory stored in alternating pairs
  const inventory = {
    consumables: [] as ConsumableIndex[],
    keyItems: [] as KeyItemIndex[],
    weapons: [] as WeaponIndex[],
    armors: [] as ArmorIndex[],
  };

  for (let i = 0; i < 13; i += 1) {
    inventory.consumables.push(cursor.nextNumber() as ConsumableIndex);
    inventory.keyItems.push(cursor.nextNumber() as KeyItemIndex);
    inventory.weapons.push(cursor.nextNumber() as WeaponIndex);
    inventory.armors.push(cursor.nextNumber() as ArmorIndex);
  }

  const tension = cursor.nextNumber();
  const maxTension = cursor.nextNumber();

  const lightWorld = {
    weapon: cursor.nextNumber(),
    armor: cursor.nextNumber(),
    experience: cursor.nextNumber(),
    level: cursor.nextNumber(),
    money: cursor.nextNumber(),
    health: cursor.nextNumber(),
    maxHealth: cursor.nextNumber(),
    attack: cursor.nextNumber(),
    defence: cursor.nextNumber(),
    weaponStrength: cursor.nextNumber(),
    armorDefence: cursor.nextNumber(),
    items: [] as number[],
    phone: [] as number[],
  };

  for (let i = 0; i < 8; i += 1) {
    lightWorld.items.push(cursor.nextNumber());
    lightWorld.phone.push(cursor.nextNumber());
  }

  const flags: unknown[] = [];
  for (let i = 0; i < 9999; i += 1) {
    flags.push(cursor.nextNumber() as unknown);
  }

  const plot = cursor.nextNumber();
  const room = cursor.nextNumber() as RoomIndex;
  const time = cursor.nextNumber();

  const now = new Date();
  return {
    meta: {
      id: crypto.randomUUID(),
      format: 1,
      createdAt: now,
      modifiedAt: now,
      schema: SAVE_SCHEMA,
      chapter: 1,
      slot: 0,
      isCompletionSave: false,
      name: '',
    },
    playerName,
    vesselName,
    party: party as [CharacterIndex, CharacterIndex, CharacterIndex],
    money,
    xp,
    lv,
    inv,
    invc,
    inDarkWorld,
    characters,
    battle: {
      boltSpeed,
      grazeAmount,
      grazeSize,
      tension,
      maxTension,
    },
    inventory,
    lightWorld,
    flags,
    plot,
    room,
    time,
  };
}

function parseSaveV2(cursor: LineCursor): SaveV2 {
  const playerName = cursor.nextString();
  const vesselName = cursor.nextString();
  cursor.skip(5);

  const party = [cursor.nextNumber(), cursor.nextNumber(), cursor.nextNumber()];
  const money = cursor.nextNumber();

  const xp = cursor.nextNumber();
  const lv = cursor.nextNumber();
  const inv = cursor.nextNumber();
  const invc = cursor.nextNumber();

  const inDarkWorld = !!cursor.nextNumber();

  const characters = [];
  for (let i = 0; i < 5; i += 1) {
    const health = cursor.nextNumber();
    const maxHealth = cursor.nextNumber();
    const attack = cursor.nextNumber();
    const defence = cursor.nextNumber();
    const magic = cursor.nextNumber();
    const guts = cursor.nextNumber();
    const weapon = cursor.nextNumber() as WeaponIndex;
    const primaryArmor = cursor.nextNumber() as ArmorIndex;
    const secondaryArmor = cursor.nextNumber() as ArmorIndex;
    const weaponStyle = cursor.nextNumber();

    const weaponStats = [];
    for (let j = 0; j < 4; j += 1) {
      const attack = cursor.nextNumber();
      const defence = cursor.nextNumber();
      const magic = cursor.nextNumber();
      const bolts = cursor.nextNumber();
      const grazeAmount = cursor.nextNumber();
      const grazeSize = cursor.nextNumber();
      const boltSpeed = cursor.nextNumber();
      const special = cursor.nextNumber();
      const element = cursor.nextNumber();
      const elementAmount = cursor.nextNumber();

      weaponStats.push({
        attack,
        defence,
        magic,
        bolts,
        grazeAmount,
        grazeSize,
        boltSpeed,
        special,
        element,
        elementAmount,
      });
    }

    const spells: SpellIndex[] = [];
    for (let k = 0; k < 12; k += 1) {
      spells.push(cursor.nextNumber() as SpellIndex);
    }

    characters.push({
      health,
      maxHealth,
      attack,
      defence,
      magic,
      guts,
      weapon,
      primaryArmor,
      secondaryArmor,
      weaponStyle,
      weaponStats,
      spells,
    });
  }

  const boltSpeed = cursor.nextNumber();
  const grazeAmount = cursor.nextNumber();
  const grazeSize = cursor.nextNumber();

  // Inventory stored in alternating pairs
  const inventory = {
    consumables: [] as ConsumableIndex[],
    keyItems: [] as KeyItemIndex[],
    weapons: [] as WeaponIndex[],
    armors: [] as ArmorIndex[],
    storage: [] as ConsumableIndex[],
  };

  for (let i = 0; i < 13; i += 1) {
    inventory.consumables.push(cursor.nextNumber() as ConsumableIndex);
    inventory.keyItems.push(cursor.nextNumber() as KeyItemIndex);
  }

  for (let i = 0; i < 48; i += 1) {
    inventory.weapons.push(cursor.nextNumber() as WeaponIndex);
    inventory.armors.push(cursor.nextNumber() as ArmorIndex);
  }

  for (let i = 0; i < 72; i += 1) {
    inventory.storage.push(cursor.nextNumber() as ConsumableIndex);
  }

  const tension = cursor.nextNumber();
  const maxTension = cursor.nextNumber();

  const lightWorld = {
    weapon: cursor.nextNumber(),
    armor: cursor.nextNumber(),
    experience: cursor.nextNumber(),
    level: cursor.nextNumber(),
    money: cursor.nextNumber(),
    health: cursor.nextNumber(),
    maxHealth: cursor.nextNumber(),
    attack: cursor.nextNumber(),
    defence: cursor.nextNumber(),
    weaponStrength: cursor.nextNumber(),
    armorDefence: cursor.nextNumber(),
    items: [] as number[],
    phone: [] as number[],
  };

  for (let i = 0; i < 8; i += 1) {
    lightWorld.items.push(cursor.nextNumber());
    lightWorld.phone.push(cursor.nextNumber());
  }

  const flags: unknown[] = [];
  for (let i = 0; i < 2500; i += 1) {
    flags.push(cursor.nextNumber());
  }

  const plot = cursor.nextNumber();
  const room = cursor.nextNumber() as RoomIndex;
  const time = cursor.nextNumber();

  const now = new Date();
  return {
    meta: {
      id: crypto.randomUUID(),
      format: 2,
      createdAt: now,
      modifiedAt: now,
      schema: SAVE_SCHEMA,
      chapter: 2,
      slot: 0,
      isCompletionSave: false,
      name: 'Cool save',
    },
    playerName,
    vesselName,
    party: party as [CharacterIndex, CharacterIndex, CharacterIndex],
    money,
    xp,
    lv,
    inv,
    invc,
    inDarkWorld,
    characters,
    battle: {
      boltSpeed,
      grazeAmount,
      grazeSize,
      tension,
      maxTension,
    },
    inventory,
    lightWorld,
    flags,
    plot,
    room,
    time,
  };
}

export class ParseError extends Error {
  line?: number;
  details?: string;

  constructor(message: string, line?: number, details?: string) {
    super(message);
    this.name = 'ParseError';
    this.line = line;
    this.details = details;
  }
}

export function parseSave(content: string): Save {
  const cursor = new LineCursor(content);

  const format = detectSaveFormat(cursor.totalLines);
  if (format == 1) {
    return parseSaveV1(cursor);
  } else if (format == 2) {
    return parseSaveV2(cursor);
  }

  throw new ParseError(
    `Unrecognized save format (${cursor.totalLines} lines)`,
    undefined,
    `Expected ${SAVE_META.V1.TOTAL_LINES} lines for Chapter 1 or ${SAVE_META.V2.TOTAL_LINES} lines for Chapter 2+`,
  );
}
