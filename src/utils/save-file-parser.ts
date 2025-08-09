import type { DeltaruneSave, SaveFileFormat, V1Save, V2Save } from '@types';
import type {
  ArmorIndex,
  ConsumableIndex,
  FlagIndex,
  KeyItemIndex,
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

export const SUPPORTED_FORMATS = Object.keys(SAVE_META) as Array<
  keyof typeof SAVE_META
>;

function detectSaveFormat(count: number): SaveFileFormat {
  if (count == SAVE_META.V1.TOTAL_LINES) {
    return 'v1';
  }

  if (count == SAVE_META.V2.TOTAL_LINES) {
    return 'v2';
  }

  return 'unknown';
}

function parseV1Save(_cursor: LineCursor): V1Save {
  // TODO: Implement V1 save parsing
  return {} as V1Save;
}

function parseV2Save(cursor: LineCursor): V2Save {
  const playerName = cursor.nextString();
  const characterName = cursor.nextString();
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
    const weapon = cursor.nextNumber();
    const primaryArmor = cursor.nextNumber();
    const secondaryArmor = cursor.nextNumber();
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

    const spells = [];
    for (let k = 0; k < 12; k += 1) {
      spells.push(cursor.nextNumber());
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

  const flags: FlagIndex[] = [];
  for (let i = 0; i < 2500; i += 1) {
    flags.push(cursor.nextNumber() as FlagIndex);
  }

  const plot = cursor.nextNumber();
  const room = cursor.nextNumber();
  const time = cursor.nextNumber();

  return {
    format: 'v2',
    chapter: 0,
    playerName,
    characterName,
    party: party as [number, number, number],
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

export function parseSaveFile(content: string): DeltaruneSave | null {
  const cursor = new LineCursor(content);

  const format = detectSaveFormat(cursor.totalLines);
  if (format == 'v1') {
    return parseV1Save(cursor);
  } else if (format == 'v2') {
    return parseV2Save(cursor);
  } else {
    return null;
  }
}
