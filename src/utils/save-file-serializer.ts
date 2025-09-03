import type { DeltaruneSave, V1Save, V2Save } from '@types';

export function serializeSaveTime(time: number): string {
  if (time >= 1e6) {
    // Fix scientific notation format: e+6 -> e+06
    return time.toExponential().replace(/e\+(\d)$/, 'e+0$1');
  }
  return String(time);
}

function serializeV1Save(save: V1Save): string {
  const lines: string[] = [];

  lines.push(save.playerName);
  lines.push(save.characterName);

  for (let i = 0; i < 5; i += 1) {
    lines.push('');
  }

  lines.push(String(save.party[0]));
  lines.push(String(save.party[1]));
  lines.push(String(save.party[2]));

  lines.push(String(save.money));
  lines.push(String(save.xp));
  lines.push(String(save.lv));
  lines.push(String(save.inv));
  lines.push(String(save.invc));
  lines.push(String(save.inDarkWorld ? 1 : 0));

  for (const character of save.characters) {
    lines.push(String(character.health));
    lines.push(String(character.maxHealth));
    lines.push(String(character.attack));
    lines.push(String(character.defence));
    lines.push(String(character.magic));
    lines.push(String(character.guts));
    lines.push(String(character.weapon));
    lines.push(String(character.primaryArmor));
    lines.push(String(character.secondaryArmor));
    lines.push(String(character.weaponStyle));

    for (const weaponStat of character.weaponStats) {
      lines.push(String(weaponStat.attack));
      lines.push(String(weaponStat.defence));
      lines.push(String(weaponStat.magic));
      lines.push(String(weaponStat.bolts));
      lines.push(String(weaponStat.grazeAmount));
      lines.push(String(weaponStat.grazeSize));
      lines.push(String(weaponStat.boltSpeed));
      lines.push(String(weaponStat.special));
    }

    for (const spell of character.spells) {
      lines.push(String(spell));
    }
  }

  lines.push(String(save.battle.boltSpeed));
  lines.push(String(save.battle.grazeAmount));
  lines.push(String(save.battle.grazeSize));

  // Inventory stored in alternating pairs
  for (let i = 0; i < 13; i += 1) {
    lines.push(String(save.inventory.consumables[i] || 0));
    lines.push(String(save.inventory.keyItems[i] || 0));
    lines.push(String(save.inventory.weapons[i] || 0));
    lines.push(String(save.inventory.armors[i] || 0));
  }

  lines.push(String(save.battle.tension));
  lines.push(String(save.battle.maxTension));

  lines.push(String(save.lightWorld.weapon));
  lines.push(String(save.lightWorld.armor));
  lines.push(String(save.lightWorld.experience));
  lines.push(String(save.lightWorld.level));
  lines.push(String(save.lightWorld.money));
  lines.push(String(save.lightWorld.health));
  lines.push(String(save.lightWorld.maxHealth));
  lines.push(String(save.lightWorld.attack));
  lines.push(String(save.lightWorld.defence));
  lines.push(String(save.lightWorld.weaponStrength));
  lines.push(String(save.lightWorld.armorDefence));

  for (let i = 0; i < 8; i += 1) {
    lines.push(String(save.lightWorld.items[i] || 0));
    lines.push(String(save.lightWorld.phone[i] || 0));
  }

  for (let i = 0; i < 9999; i += 1) {
    lines.push(String(save.flags[i] || 0));
  }

  lines.push(String(save.plot));
  lines.push(String(save.room));
  lines.push(serializeSaveTime(save.time));

  // First 7 lines don't get trailing spaces
  const linesWithSpaces = lines.map((line, index) => {
    if (index >= 0 && index <= 6) {
      return line;
    }
    return line + ' ';
  });

  return linesWithSpaces.join('\n');
}

function serializeV2Save(save: V2Save): string {
  const lines: string[] = [];

  lines.push(save.playerName);
  lines.push(save.characterName);

  for (let i = 0; i < 5; i += 1) {
    lines.push('');
  }

  lines.push(String(save.party[0]));
  lines.push(String(save.party[1]));
  lines.push(String(save.party[2]));

  lines.push(String(save.money));
  lines.push(String(save.xp));
  lines.push(String(save.lv));
  lines.push(String(save.inv));
  lines.push(String(save.invc));
  lines.push(String(save.inDarkWorld ? 1 : 0));

  for (const character of save.characters) {
    lines.push(String(character.health));
    lines.push(String(character.maxHealth));
    lines.push(String(character.attack));
    lines.push(String(character.defence));
    lines.push(String(character.magic));
    lines.push(String(character.guts));
    lines.push(String(character.weapon));
    lines.push(String(character.primaryArmor));
    lines.push(String(character.secondaryArmor));
    lines.push(String(character.weaponStyle));

    for (const weaponStat of character.weaponStats) {
      lines.push(String(weaponStat.attack));
      lines.push(String(weaponStat.defence));
      lines.push(String(weaponStat.magic));
      lines.push(String(weaponStat.bolts));
      lines.push(String(weaponStat.grazeAmount));
      lines.push(String(weaponStat.grazeSize));
      lines.push(String(weaponStat.boltSpeed));
      lines.push(String(weaponStat.special));
      lines.push(String(weaponStat.element));
      lines.push(String(weaponStat.elementAmount));
    }

    for (const spell of character.spells) {
      lines.push(String(spell));
    }
  }

  lines.push(String(save.battle.boltSpeed));
  lines.push(String(save.battle.grazeAmount));
  lines.push(String(save.battle.grazeSize));

  // Inventory stored in alternating pairs
  for (let i = 0; i < 13; i += 1) {
    lines.push(String(save.inventory.consumables[i] || 0));
    lines.push(String(save.inventory.keyItems[i] || 0));
  }

  for (let i = 0; i < 48; i += 1) {
    lines.push(String(save.inventory.weapons[i] || 0));
    lines.push(String(save.inventory.armors[i] || 0));
  }

  for (let i = 0; i < 72; i += 1) {
    lines.push(String(save.inventory.storage[i] || 0));
  }

  lines.push(String(save.battle.tension));
  lines.push(String(save.battle.maxTension));

  lines.push(String(save.lightWorld.weapon));
  lines.push(String(save.lightWorld.armor));
  lines.push(String(save.lightWorld.experience));
  lines.push(String(save.lightWorld.level));
  lines.push(String(save.lightWorld.money));
  lines.push(String(save.lightWorld.health));
  lines.push(String(save.lightWorld.maxHealth));
  lines.push(String(save.lightWorld.attack));
  lines.push(String(save.lightWorld.defence));
  lines.push(String(save.lightWorld.weaponStrength));
  lines.push(String(save.lightWorld.armorDefence));

  for (let i = 0; i < 8; i += 1) {
    lines.push(String(save.lightWorld.items[i] || 0));
    lines.push(String(save.lightWorld.phone[i] || 0));
  }

  for (let i = 0; i < 2500; i += 1) {
    lines.push(String(save.flags[i] || 0));
  }

  lines.push(String(save.plot));
  lines.push(String(save.room));
  lines.push(serializeSaveTime(save.time));

  // First 7 lines don't get trailing spaces
  const linesWithSpaces = lines.map((line, index) => {
    if (index >= 0 && index <= 6) {
      return line;
    }
    return line + ' ';
  });

  return linesWithSpaces.join('\n');
}

export function serializeSaveFile(save: DeltaruneSave): string {
  if (save.meta.format === 'v1') {
    return serializeV1Save(save as V1Save);
  } else if (save.meta.format === 'v2') {
    return serializeV2Save(save as V2Save);
  } else {
    throw new Error('Unsupported save format');
  }
}
