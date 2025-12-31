import type { Save, SaveV1, SaveV2 } from '@types';

export function serializeNumber(value: number | string): string {
  if (typeof value === 'string') {
    return value;
  }
  if (value >= 1e6) {
    // Fix scientific notation format: e+6 -> e+06
    return value.toExponential().replace(/e\+(\d)$/, 'e+0$1');
  }
  return String(value);
}

function serializeSaveV1(save: SaveV1): string {
  const lines: string[] = [];

  lines.push(save.playerName);
  lines.push(save.vesselName);

  for (let i = 0; i < 5; i += 1) {
    lines.push('');
  }

  lines.push(serializeNumber(save.party[0]));
  lines.push(serializeNumber(save.party[1]));
  lines.push(serializeNumber(save.party[2]));

  lines.push(serializeNumber(save.money));
  lines.push(serializeNumber(save.xp));
  lines.push(serializeNumber(save.lv));
  lines.push(serializeNumber(save.inv));
  lines.push(serializeNumber(save.invc));
  lines.push(serializeNumber(save.inDarkWorld ? 1 : 0));

  for (const character of save.characters) {
    lines.push(serializeNumber(character.health));
    lines.push(serializeNumber(character.maxHealth));
    lines.push(serializeNumber(character.attack));
    lines.push(serializeNumber(character.defence));
    lines.push(serializeNumber(character.magic));
    lines.push(serializeNumber(character.guts));
    lines.push(serializeNumber(character.weapon));
    lines.push(serializeNumber(character.primaryArmor));
    lines.push(serializeNumber(character.secondaryArmor));
    lines.push(serializeNumber(character.weaponStyle));

    for (const weaponStat of character.weaponStats) {
      lines.push(serializeNumber(weaponStat.attack));
      lines.push(serializeNumber(weaponStat.defence));
      lines.push(serializeNumber(weaponStat.magic));
      lines.push(serializeNumber(weaponStat.bolts));
      lines.push(serializeNumber(weaponStat.grazeAmount));
      lines.push(serializeNumber(weaponStat.grazeSize));
      lines.push(serializeNumber(weaponStat.boltSpeed));
      lines.push(serializeNumber(weaponStat.special));
    }

    for (const spell of character.spells) {
      lines.push(serializeNumber(spell));
    }
  }

  lines.push(serializeNumber(save.battle.boltSpeed));
  lines.push(serializeNumber(save.battle.grazeAmount));
  lines.push(serializeNumber(save.battle.grazeSize));

  // Inventory stored in alternating pairs
  for (let i = 0; i < 13; i += 1) {
    lines.push(serializeNumber(save.inventory.consumables[i] || 0));
    lines.push(serializeNumber(save.inventory.keyItems[i] || 0));
    lines.push(serializeNumber(save.inventory.weapons[i] || 0));
    lines.push(serializeNumber(save.inventory.armors[i] || 0));
  }

  lines.push(serializeNumber(save.battle.tension));
  lines.push(serializeNumber(save.battle.maxTension));

  lines.push(serializeNumber(save.lightWorld.weapon));
  lines.push(serializeNumber(save.lightWorld.armor));
  lines.push(serializeNumber(save.lightWorld.experience));
  lines.push(serializeNumber(save.lightWorld.level));
  lines.push(serializeNumber(save.lightWorld.money));
  lines.push(serializeNumber(save.lightWorld.health));
  lines.push(serializeNumber(save.lightWorld.maxHealth));
  lines.push(serializeNumber(save.lightWorld.attack));
  lines.push(serializeNumber(save.lightWorld.defence));
  lines.push(serializeNumber(save.lightWorld.weaponStrength));
  lines.push(serializeNumber(save.lightWorld.armorDefence));

  for (let i = 0; i < 8; i += 1) {
    lines.push(serializeNumber(save.lightWorld.items[i] || 0));
    lines.push(serializeNumber(save.lightWorld.phone[i] || 0));
  }

  for (let i = 0; i < 9999; i += 1) {
    lines.push(serializeNumber(Number(save.flags[i]) || 0));
  }

  lines.push(serializeNumber(save.plot));
  lines.push(serializeNumber(save.room));
  lines.push(serializeNumber(save.time));

  // First 7 lines don't get trailing spaces
  const linesWithSpaces = lines.map((line, index) => {
    if (index >= 0 && index <= 6) {
      return line;
    }
    return line + ' ';
  });

  return linesWithSpaces.join('\n');
}

function serializeSaveV2(save: SaveV2): string {
  const lines: string[] = [];

  lines.push(save.playerName);
  lines.push(save.vesselName);

  for (let i = 0; i < 5; i += 1) {
    lines.push('');
  }

  lines.push(serializeNumber(save.party[0]));
  lines.push(serializeNumber(save.party[1]));
  lines.push(serializeNumber(save.party[2]));

  lines.push(serializeNumber(save.money));
  lines.push(serializeNumber(save.xp));
  lines.push(serializeNumber(save.lv));
  lines.push(serializeNumber(save.inv));
  lines.push(serializeNumber(save.invc));
  lines.push(serializeNumber(save.inDarkWorld ? 1 : 0));

  for (const character of save.characters) {
    lines.push(serializeNumber(character.health));
    lines.push(serializeNumber(character.maxHealth));
    lines.push(serializeNumber(character.attack));
    lines.push(serializeNumber(character.defence));
    lines.push(serializeNumber(character.magic));
    lines.push(serializeNumber(character.guts));
    lines.push(serializeNumber(character.weapon));
    lines.push(serializeNumber(character.primaryArmor));
    lines.push(serializeNumber(character.secondaryArmor));
    lines.push(serializeNumber(character.weaponStyle));

    for (const weaponStat of character.weaponStats) {
      lines.push(serializeNumber(weaponStat.attack));
      lines.push(serializeNumber(weaponStat.defence));
      lines.push(serializeNumber(weaponStat.magic));
      lines.push(serializeNumber(weaponStat.bolts));
      lines.push(serializeNumber(weaponStat.grazeAmount));
      lines.push(serializeNumber(weaponStat.grazeSize));
      lines.push(serializeNumber(weaponStat.boltSpeed));
      lines.push(serializeNumber(weaponStat.special));
      lines.push(serializeNumber(weaponStat.element));
      lines.push(serializeNumber(weaponStat.elementAmount));
    }

    for (const spell of character.spells) {
      lines.push(serializeNumber(spell));
    }
  }

  lines.push(serializeNumber(save.battle.boltSpeed));
  lines.push(serializeNumber(save.battle.grazeAmount));
  lines.push(serializeNumber(save.battle.grazeSize));

  // Inventory stored in alternating pairs
  for (let i = 0; i < 13; i += 1) {
    lines.push(serializeNumber(save.inventory.consumables[i] || 0));
    lines.push(serializeNumber(save.inventory.keyItems[i] || 0));
  }

  for (let i = 0; i < 48; i += 1) {
    lines.push(serializeNumber(save.inventory.weapons[i] || 0));
    lines.push(serializeNumber(save.inventory.armors[i] || 0));
  }

  for (let i = 0; i < 72; i += 1) {
    lines.push(serializeNumber(save.inventory.storage[i] || 0));
  }

  lines.push(serializeNumber(save.battle.tension));
  lines.push(serializeNumber(save.battle.maxTension));

  lines.push(serializeNumber(save.lightWorld.weapon));
  lines.push(serializeNumber(save.lightWorld.armor));
  lines.push(serializeNumber(save.lightWorld.experience));
  lines.push(serializeNumber(save.lightWorld.level));
  lines.push(serializeNumber(save.lightWorld.money));
  lines.push(serializeNumber(save.lightWorld.health));
  lines.push(serializeNumber(save.lightWorld.maxHealth));
  lines.push(serializeNumber(save.lightWorld.attack));
  lines.push(serializeNumber(save.lightWorld.defence));
  lines.push(serializeNumber(save.lightWorld.weaponStrength));
  lines.push(serializeNumber(save.lightWorld.armorDefence));

  for (let i = 0; i < 8; i += 1) {
    lines.push(serializeNumber(save.lightWorld.items[i] || 0));
    lines.push(serializeNumber(save.lightWorld.phone[i] || 0));
  }

  for (let i = 0; i < 2500; i += 1) {
    lines.push(serializeNumber(Number(save.flags[i]) || 0));
  }

  lines.push(serializeNumber(save.plot));
  lines.push(serializeNumber(save.room));
  lines.push(serializeNumber(save.time));

  // First 7 lines don't get trailing spaces
  const linesWithSpaces = lines.map((line, index) => {
    if (index >= 0 && index <= 6) {
      return line;
    }
    return line + ' ';
  });

  return linesWithSpaces.join('\n');
}

export function serializeSave(save: Save): string {
  if (save.meta.format === 1) {
    return serializeSaveV1(save as SaveV1);
  } else if (save.meta.format === 2) {
    return serializeSaveV2(save as SaveV2);
  } else {
    throw new Error('Unsupported save format');
  }
}
