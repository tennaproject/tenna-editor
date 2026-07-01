import { useUi, type UiLocale } from '@store';
import {
  ARMORS,
  ARMORS_META,
  CHARACTERS,
  CHARACTERS_META,
  CHAPTERS,
  CHAPTERS_META,
  CONSUMABLES,
  CONSUMABLES_META,
  ENEMIES,
  ENEMIES_META,
  FLAG_BITFIELDS,
  FLAG_BITFIELDS_META,
  FLAGS,
  FLAGS_META,
  KEYITEMS,
  KEYITEMS_META,
  LIGHTWORLDITEMS,
  LIGHTWORLDITEMS_META,
  PHONECONTACTS,
  PHONECONTACTS_META,
  ROOMS,
  ROOMS_META,
  SPELLS,
  SPELLS_META,
  WEAPONS,
  WEAPONS_META,
} from '@data';
import ja from './locales/ja.json';
import ko from './locales/ko.json';

export const SUPPORTED_LOCALES = {
  en: {
    displayName: 'English',
    flag: 'us',
  },
  ja: {
    displayName: 'Japanese',
    flag: 'jp',
  },
  ko: {
    displayName: 'Korean',
    flag: 'kr',
  },
} as const;

export type Locale = UiLocale;

type TranslationDictionary = Record<string, string>;

const TRANSLATIONS: Record<Exclude<Locale, 'en'>, TranslationDictionary> = {
  ja,
  ko,
};

const FLAG_NAMES_BY_ID = Object.fromEntries(
  Object.entries(FLAGS).map(([name, id]) => [id, name]),
) as Record<number, string>;
const ARMOR_NAMES_BY_ID = getNamesById(ARMORS);
const CHARACTER_NAMES_BY_ID = getNamesById(CHARACTERS);
const CHAPTER_NAMES_BY_ID = getNamesById(CHAPTERS);
const CONSUMABLE_NAMES_BY_ID = getNamesById(CONSUMABLES);
const ENEMY_NAMES_BY_ID = getNamesById(ENEMIES);
const KEYITEM_NAMES_BY_ID = getNamesById(KEYITEMS);
const LIGHT_WORLD_ITEM_NAMES_BY_ID = getNamesById(LIGHTWORLDITEMS);
const PHONE_CONTACT_NAMES_BY_ID = getNamesById(PHONECONTACTS);
const ROOM_NAMES_BY_ID = getNamesById(ROOMS);
const SPELL_NAMES_BY_ID = getNamesById(SPELLS);
const WEAPON_NAMES_BY_ID = getNamesById(WEAPONS);

const UI_FALLBACKS: TranslationDictionary = {
  'ui.settings.title': 'Settings',
  'ui.settings.general': 'General',
  'ui.settings.enableDeveloperMode': 'Enable developer mode',
  'ui.settings.backupRestore': 'Backup & Restore',
  'ui.settings.backupRestoreDescription':
    'Export all your save data into a JSON file, or import it back from a backup.',
  'ui.settings.exportAllSaves': 'Export All Saves',
  'ui.settings.importSaves': 'Import Saves',
  'ui.settings.language': 'Language',
  'ui.settings.languageDescription':
    'Choose which language the editor uses. Missing translations fall back to English.',
  'ui.settings.languagePlaceholder': 'Select language...',
  'ui.settings.exportFailed': 'Failed to export saves',
  'ui.settings.importSuccess':
    'Successfully imported {imported} save(s) (skipped {skipped})',
  'ui.settings.importFailedGeneric': 'Failed to import backup file',
  'ui.flag.numberPlaceholder': 'Enter number...',
  'ui.flag.mapPlaceholder': 'Select value...',
  'ui.nav.about': 'About',
  'ui.nav.armors': 'Armors',
  'ui.nav.attributions': 'Attributions',
  'ui.nav.changelog': 'Changelog',
  'ui.nav.chapter1': 'Chapter 1',
  'ui.nav.chapter2': 'Chapter 2',
  'ui.nav.chapter3': 'Chapter 3',
  'ui.nav.chapter4': 'Chapter 4',
  'ui.nav.chapter5': 'Chapter 5',
  'ui.nav.consumables': 'Consumables',
  'ui.nav.devtools': 'Devtools',
  'ui.nav.flags': 'Flags',
  'ui.nav.home': 'Home',
  'ui.nav.inventory': 'Inventory',
  'ui.nav.keyItems': 'Key Items',
  'ui.nav.kris': 'Kris',
  'ui.nav.license': 'License',
  'ui.nav.lightWorld': 'Light World',
  'ui.nav.noelle': 'Noelle',
  'ui.nav.overview': 'Overview',
  'ui.nav.party': 'Party',
  'ui.nav.ralsei': 'Ralsei',
  'ui.nav.recruits': 'Recruits',
  'ui.nav.settings': 'Settings',
  'ui.nav.story': 'Story',
  'ui.nav.susie': 'Susie',
  'ui.nav.weapons': 'Weapons',
  'ui.nav.welcome': 'Welcome',
  'ui.common.noOptionsFound': 'No options found',
  'ui.common.unknown': 'Unknown',
  'ui.guard.developerModeDisabled': 'Developer mode is not enabled',
  'ui.guard.noSaveLoaded': 'There is no save loaded',
  'ui.guard.wrongChapter': 'This page is not available in this chapter',
  'ui.header.downloadSave': 'Download save',
  'ui.header.redo': 'Redo',
  'ui.header.toggleSidebar': 'Toggle sidebar',
  'ui.header.toggleSidebarRetraction': 'Toggle sidebar retraction',
  'ui.header.undo': 'Undo',
  'ui.header.uploadSave': 'Upload save',
  'ui.download.baseDrIni': 'Base dr.ini',
  'ui.download.changesSinceBaseline': 'Changes since last upload or download',
  'ui.download.clearBase': 'Clear base',
  'ui.download.downloadExportSet': 'Download export set',
  'ui.download.downloadSave': 'Download Save',
  'ui.download.downloadSaveFile': 'Download save file',
  'ui.download.exportAs': 'Export as',
  'ui.download.exportSaveSet': 'Export Save Set',
  'ui.download.exportSet': 'Export set',
  'ui.download.inGameSlot': 'In-game slot',
  'ui.download.pcSaveFile': 'PC save file',
  'ui.download.savePlaceholder': 'Save',
  'ui.download.saveSlots': 'Save slots',
  'ui.download.savesAs': 'Saves as',
  'ui.download.selectExportType': 'Select export type',
  'ui.download.selectAtLeastOneSwitchSave':
    'Select at least one save for Switch export.',
  'ui.download.selectAtLeastOneSwitchSaveForSet':
    'Select at least one save for Switch export set',
  'ui.download.switchContainer': 'Switch container',
  'ui.download.noSaveLoadedCurrently': 'There is no save loaded currently',
  'ui.upload.chapter': 'Chapter',
  'ui.upload.chapter5Experimental':
    'Chapter 5 support is experimental. Basic data like recruits, rooms, items, weapons, and armors are in place. Flags and plot points will come later.',
  'ui.upload.chooseSwitchSave': 'Choose Switch Save',
  'ui.upload.confirmChapter': 'Confirm Chapter',
  'ui.upload.containedSave': 'Contained save',
  'ui.upload.correctChapterQuestion': 'Is this the correct chapter?',
  'ui.upload.saveSettings': 'Save Settings',
  'ui.upload.selectChapter': 'Select chapter',
  'ui.upload.selectSave': 'Select save',
  'ui.upload.switchContainerChooseEntry':
    'This Switch container includes multiple save entries. Choose one to edit.',
  'ui.upload.switchSupportWarning':
    'Switch support expects an already-exported save payload. Tenna Editor cannot extract or restore saves on hardware.',
  'ui.upload.uploadFailed': 'Upload Failed',
  'ui.upload.uploadSave': 'Upload Save',
  'ui.upload.unsupportedChapterOrFormat':
    'Unsupported chapter or save format detected. Please upload a DELTARUNE Chapter 1-5 PC, Mac, Linux, or already-exported save container.',
  'ui.upload.chapterCannotChangeAfterUpload':
    'This cannot be changed after the save is uploaded.',
  'ui.common.back': 'Back',
  'ui.common.next': 'Next',
  'ui.common.tryAgain': 'Try again',
  'ui.common.cancel': 'Cancel',
  'ui.common.close': 'Close',
  'ui.common.delete': 'Delete',
  'ui.common.gotIt': 'Got it',
  'ui.common.noSaves': 'No saves...',
  'ui.common.uploadFile': 'Upload file',
  'ui.common.dropFileHere': 'Drop your file here!',
  'ui.common.dragDropFileHere': 'Drag & drop a file here',
  'ui.common.clickToSelectFile': 'or click to select a file',
  'ui.common.editorLoading': 'Editor is loading...',
  'ui.common.loadingHeadline': 'MIKE, the BOARD, please!',
  'ui.common.increase': 'Increase',
  'ui.common.increaseValue': 'Increase value',
  'ui.common.decrease': 'Decrease',
  'ui.common.decreaseValue': 'Decrease value',
  'ui.upload.confirmUpload': 'Confirm upload',
  'ui.chapter5.infoButton': 'Chapter 5 info',
  'ui.chapter5.infoAria': 'Chapter 5 information',
  'ui.chapter5.infoTitle': 'Chapter 5 Info',
  'ui.chapter5.supportAvailable':
    'Chapter 5 support is available in Tenna Editor.',
  'ui.chapter5.new': 'NEW',
  'ui.chapter5.basicFeatures':
    'Basic features like recruits, rooms, items, weapons, and armors are in place.',
  'ui.chapter5.flagsLater': 'Flags and plot points will come later.',
  'ui.home.chapter': 'Chapter',
  'ui.home.createdAt': 'Created at: {date}',
  'ui.home.deleteSave': 'Delete Save',
  'ui.home.deleteSaveConfirm':
    'Are you sure you want to delete the current save from the editor?',
  'ui.home.general': 'General',
  'ui.home.meta': 'Meta',
  'ui.home.modifiedAt': 'Modified at: {date}',
  'ui.home.noSaveLoaded': 'No save loaded',
  'ui.home.saveDeleted': 'Save deleted.',
  'ui.home.showDogcheckedRooms': 'Show dogchecked rooms',
  'ui.home.showRoomsWithoutSavePoint': 'Show rooms without save point',
  'ui.home.source': 'Source:',
  'ui.home.unreversible': 'This action cannot be reversed!',
  'ui.lightWorld.items': 'Items',
  'ui.lightWorld.itemsDescription': 'This inventory applies to Light World only.',
  'ui.lightWorld.phoneContacts': 'Phone Contacts',
  'ui.party.allowNonStandardParty': 'Allow non-standard party combinations',
  'ui.party.allowNonStandardPartyDescription':
    'Enabling this allows you to set every character at every slot.',
  'ui.party.member': 'MEMBER',
  'ui.recruits.cafe': 'Cafe',
  'ui.recruits.cafeSeating': 'Cafe seating',
  'ui.recruits.cafeSeatingDescription':
    'Choose which recruit sits at each table in the Cafe at Castle Town.',
  'ui.recruits.showNonRecruitableEnemies': 'Show non-recruitable enemies',
  'ui.recruits.showNonRecruitableEnemiesDescription1':
    'All Chapter 1 and 2 enemies have their respective recruitment flags.',
  'ui.recruits.showNonRecruitableEnemiesDescription2':
    'These do not affect anything but do exist.',
  'ui.recruits.showNonRecruitableEnemiesDescription3':
    'This option allows to set them as recruited.',
  'ui.story.searchFields': 'Search fields',
  'ui.story.searchPlaceholder': 'Search story fields...',
  'ui.story.vessel': 'Vessel',
  'ui.story.thrashMachine': 'Thrash Machine',
  'ui.story.thrashFit': 'Thrash Fit',
  'ui.story.chapter5Wip': 'Chapter 5 support is a work in progress.',
  'ui.story.chapter5UncategorizedWarning':
    'For now, all flag fields are uncategorized, descriptions may be incomplete, and everything here is subject to change.',
  'ui.field.armorI': 'Armor I',
  'ui.field.armorII': 'Armor II',
  'ui.field.armor': 'Armor',
  'ui.field.completionSave': 'Completion save',
  'ui.field.currentRoom': 'Current Room',
  'ui.field.inDarkWorld': 'Currently in Dark World',
  'ui.field.inGameSlot': 'In-game slot',
  'ui.field.money': 'Money (D$)',
  'ui.field.name': 'Name',
  'ui.field.playerName': 'Player Name',
  'ui.field.playtime': 'Playtime',
  'ui.field.plotPoint': 'Plot Point',
  'ui.field.recruited': 'Recruited',
  'ui.field.recruitCount': 'Recruit count',
  'ui.field.saveName': 'Save name',
  'ui.field.selectArmor': 'Select an armor...',
  'ui.field.selectConsumable': 'Select a consumable...',
  'ui.field.selectItem': 'Select an item...',
  'ui.field.selectKeyItem': 'Select a key item...',
  'ui.field.selectMoney': 'Enter money amount...',
  'ui.field.selectPlayerName': 'Enter player name...',
  'ui.field.selectPlotPoint': 'Select a plot point...',
  'ui.field.selectRoom': 'Select a room...',
  'ui.field.selectSlot': 'Select slot',
  'ui.field.selectSpell': 'Select a spell...',
  'ui.field.selectStorageItem': 'Select a storage item...',
  'ui.field.selectWeapon': 'Select a weapon...',
  'ui.field.selectVesselName': 'Enter vessel name...',
  'ui.field.slot': 'Slot',
  'ui.field.spell': 'Spell',
  'ui.field.status': 'Status',
  'ui.field.weapon': 'Weapon',
  'ui.flags.advancedWarning':
    'This feature is intended for advanced users only who want more control over specific flags.',
  'ui.flags.alreadyCoveredWarning':
    'Some of the flags are already covered by other parts of the editor.',
  'ui.flags.corruptionWarning':
    'Modifying flags incorrectly may corrupt your save file.',
  'ui.flags.descriptionColumn': 'Description',
  'ui.flags.enterValue': 'Enter value...',
  'ui.flags.flagColumn': 'Flag',
  'ui.flags.flagsPerPage': 'Flags per page',
  'ui.flags.flagsTotal': '{count} flags total',
  'ui.flags.idColumn': 'Id',
  'ui.flags.invalidNumber': 'Invalid number.',
  'ui.flags.knownValues': 'Known values:',
  'ui.flags.manualEdit': 'Manual edit',
  'ui.flags.namesWorkInProgress':
    'NOTE: Flag names are work in progress and may be changed with future updates.',
  'ui.flags.noFlagsFound': 'No flags found.',
  'ui.flags.paginationFirst': 'First page',
  'ui.flags.paginationLast': 'Last page',
  'ui.flags.paginationNext': 'Next page',
  'ui.flags.paginationPrevious': 'Previous page',
  'ui.flags.searchPlaceholder': 'Search flags...',
  'ui.flags.valueColumn': 'Value',
  'ui.flags.apply': 'Apply',
  'ui.flags.applied': 'Applied',
  'ui.flags.bitfield': 'Bitfield',
  'ui.flags.bitfieldIndex': 'Bitfield index',
  'ui.flags.enterFlagId': 'Enter a flag id to inspect.',
  'ui.flags.fieldIndex': 'Field index',
  'ui.flags.flagId': 'Flag id',
  'ui.flags.manualFlagId': 'Manual flag id',
  'ui.flags.manualFlagValue': 'Manual flag value',
  'ui.flags.pendingChange': 'Pending change',
  'ui.flags.thisFlagHasKnownBitfields': 'This flag has known bitfields.',
  'ui.flags.unlistedFlag': "This flag isn't listed.",
  'ui.flags.useBitfieldValue': 'Use Bitfield value',
  'ui.flags.width': 'Width',
  'ui.inventory.storage': 'Storage',
  'ui.party.allowNonCharacterEquipment': "Allow non-{name}'s weapons, armors and spells",
  'ui.party.spells': 'Spells',
  'ui.party.unobtainableSpellsWarning':
    'Some of the spells are unobtainable in game. They are often unfinished, broken and can cause issues.',
  'ui.recruits.lost': 'Lost',
  'ui.recruits.notRecruited': 'Not recruited',
  'ui.recruits.recruited': 'Recruited',
  'ui.recruits.unused': 'Unused',
  'ui.backup.noSavesToExport': 'No saves to export',
  'ui.backup.exportedSaves': 'Exported {count} save(s)',
  'ui.backup.invalidBackupNotJson': 'Invalid backup file: not valid JSON',
  'ui.backup.invalidBackupNoSaves': 'Invalid backup file: no saves found',
  'ui.save.switchedTo': 'Switched to save "{name}"',
  'ui.save.switchError': 'Error occured while switching to new save',
  'ui.storage.loadFailed': 'Failed to load save data',
  'ui.storage.saveFailed': 'Failed to save data',
  'ui.storage.removeFailed': 'Failed to remove save data',
  'ui.storage.loadAllFailed': 'Failed to load saves',
  'ui.storage.migrateFailed': 'Failed to migrate save data',
  'ui.sw.updating': 'Editor is updating...',
  'ui.sw.updated': 'Editor was updated to version {version}',
  'ui.sw.checkChangelog': 'Check out changelog in the About page',
  'ui.sw.registrationFailed': 'Failed to register service worker',
  'ui.flags.manualIntro':
    'Target a flag by id and write a direct value or a bitfield value.',
  'ui.flags.directValue': 'Direct value',
  'ui.flags.bitfieldValueTab': 'Bitfield value',
  'ui.flags.flagIdRange': 'Flag id must be between 0 and {max}.',
  'ui.flags.valueMustBeFinite': 'Value must be a finite number.',
  'ui.flags.fieldIndexMustBeNonNegative':
    'Field index must be a non-negative integer.',
  'ui.flags.widthMustBePositive': 'Width must be a positive integer.',
  'ui.flags.valueMustBeNonNegative': 'Value must be a non-negative integer.',
  'ui.flags.valueRange': 'Value must be between 0 and {max}.',
};

const SOURCE_TRANSLATIONS = {
  ...UI_FALLBACKS,
  ...getMetaSourceTranslations('flags', FLAGS_META, FLAG_NAMES_BY_ID),
  ...getMetaSourceTranslations('flagBitfields', FLAG_BITFIELDS_META),
  ...getMetaSourceTranslations('items.armors', ARMORS_META, ARMOR_NAMES_BY_ID),
  ...getMetaSourceTranslations(
    'items.consumables',
    CONSUMABLES_META,
    CONSUMABLE_NAMES_BY_ID,
  ),
  ...getMetaSourceTranslations(
    'items.keyItems',
    KEYITEMS_META,
    KEYITEM_NAMES_BY_ID,
  ),
  ...getMetaSourceTranslations(
    'items.lightWorldItems',
    LIGHTWORLDITEMS_META,
    LIGHT_WORLD_ITEM_NAMES_BY_ID,
  ),
  ...getMetaSourceTranslations(
    'items.phoneContacts',
    PHONECONTACTS_META,
    PHONE_CONTACT_NAMES_BY_ID,
  ),
  ...getMetaSourceTranslations('items.weapons', WEAPONS_META, WEAPON_NAMES_BY_ID),
  ...getMetaSourceTranslations('characters', CHARACTERS_META, CHARACTER_NAMES_BY_ID),
  ...getMetaSourceTranslations('chapters', CHAPTERS_META, CHAPTER_NAMES_BY_ID),
  ...getMetaSourceTranslations('enemies', ENEMIES_META, ENEMY_NAMES_BY_ID),
  ...getMetaSourceTranslations('rooms', ROOMS_META, ROOM_NAMES_BY_ID),
  ...getMetaSourceTranslations('spells', SPELLS_META, SPELL_NAMES_BY_ID),
};

export function isSupportedLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(SUPPORTED_LOCALES, value)
  );
}

function getMetaSourceTranslations(
  namespace: string,
  entries: Record<string | number, {
    displayName: string;
    description?: string;
    valueRules?: {
      map?: Record<number, string>;
    };
  } | undefined>,
  namesById?: Record<number, string>,
) {
  const source: TranslationDictionary = {};

  Object.entries(entries).forEach(([rawId, meta]) => {
    if (!meta) return;
    const name = namesById?.[Number(rawId)] ?? rawId;
    const keyPrefix = `${namespace}.${name}`;

    source[`${keyPrefix}.displayName`] = meta.displayName;
    if (meta.description) {
      source[`${keyPrefix}.description`] = meta.description;
    }
    Object.entries(meta.valueRules?.map ?? {}).forEach(([value, label]) => {
      source[`${keyPrefix}.map.${value}`] = label;
    });
  });

  return source;
}

function getNamesById<TName extends string, TId extends number>(
  registry: Record<TName, TId>,
) {
  return Object.fromEntries(
    Object.entries(registry).map(([name, id]) => [id, name]),
  ) as Record<number, string>;
}

export function translate(
  key: string,
  fallback: string,
  locale: Locale = useUi.getState().ui.locale,
) {
  if (locale === 'en') return fallback;
  return TRANSLATIONS[locale][key] ?? fallback;
}

export function useTranslation() {
  const locale = useUi((s) => s.ui.locale);

  return {
    locale,
    t: (key: string, fallback: string) => translate(key, fallback, locale),
  };
}

function getNamedKeyPrefix(
  namespace: string,
  id: number,
  namesById: Record<number, string>,
) {
  const name = namesById[id];
  return name ? `${namespace}.${name}` : undefined;
}

export function getFlagTranslationKeyPrefix(id: number) {
  const flagName = FLAG_NAMES_BY_ID[id];
  return flagName ? `flags.${flagName}` : undefined;
}

export function getFlagBitfieldTranslationKeyPrefix(
  id: (typeof FLAG_BITFIELDS)[keyof typeof FLAG_BITFIELDS],
) {
  return `flagBitfields.${id}`;
}

export function getArmorTranslationKeyPrefix(id: number) {
  return getNamedKeyPrefix('items.armors', id, ARMOR_NAMES_BY_ID);
}

export function getCharacterTranslationKeyPrefix(id: number) {
  return getNamedKeyPrefix('characters', id, CHARACTER_NAMES_BY_ID);
}

export function getChapterTranslationKeyPrefix(id: number) {
  return getNamedKeyPrefix('chapters', id, CHAPTER_NAMES_BY_ID);
}

export function getConsumableTranslationKeyPrefix(id: number) {
  return getNamedKeyPrefix('items.consumables', id, CONSUMABLE_NAMES_BY_ID);
}

export function getEnemyTranslationKeyPrefix(id: number) {
  return getNamedKeyPrefix('enemies', id, ENEMY_NAMES_BY_ID);
}

export function getItemTranslationKeyPrefix(
  kind:
    | 'armor'
    | 'consumable'
    | 'keyItem'
    | 'lightWorldItem'
    | 'phoneContact'
    | 'storage'
    | 'weapon',
  id: number,
) {
  switch (kind) {
    case 'armor':
      return getArmorTranslationKeyPrefix(id);
    case 'consumable':
    case 'storage':
      return getConsumableTranslationKeyPrefix(id);
    case 'keyItem':
      return getNamedKeyPrefix('items.keyItems', id, KEYITEM_NAMES_BY_ID);
    case 'lightWorldItem':
      return getNamedKeyPrefix(
        'items.lightWorldItems',
        id,
        LIGHT_WORLD_ITEM_NAMES_BY_ID,
      );
    case 'phoneContact':
      return getNamedKeyPrefix(
        'items.phoneContacts',
        id,
        PHONE_CONTACT_NAMES_BY_ID,
      );
    case 'weapon':
      return getWeaponTranslationKeyPrefix(id);
  }
}

export function getRoomTranslationKeyPrefix(id: number) {
  return getNamedKeyPrefix('rooms', id, ROOM_NAMES_BY_ID);
}

export function getSpellTranslationKeyPrefix(id: number) {
  return getNamedKeyPrefix('spells', id, SPELL_NAMES_BY_ID);
}

export function getWeaponTranslationKeyPrefix(id: number) {
  return getNamedKeyPrefix('items.weapons', id, WEAPON_NAMES_BY_ID);
}

export function getLocaleTranslationStats(locale: Locale) {
  const total = Object.keys(SOURCE_TRANSLATIONS).length;
  if (locale === 'en') return { translated: total, total, percentage: 100 };

  const dictionary = TRANSLATIONS[locale];
  const translated = Object.entries(SOURCE_TRANSLATIONS).filter(
    ([key, fallback]) =>
      dictionary[key] !== undefined &&
      dictionary[key].trim() !== '' &&
      dictionary[key] !== fallback,
  ).length;

  return {
    translated,
    total,
    percentage: total > 0 ? Math.round((translated / total) * 100) : 100,
  };
}

export function translateMeta<
  T extends {
    displayName: string;
    description?: string;
    valueRules?: {
      map?: Record<number, string>;
    };
  },
>(
  keyPrefix: string | undefined,
  meta: T,
  t: (key: string, fallback: string) => string,
): T {
  const translateWithPrefixes = (field: string, fallback: string) => {
    if (!keyPrefix) return fallback;
    return t(`${keyPrefix}.${field}`, fallback);
  };
  const translatedMap = meta.valueRules?.map
    ? Object.fromEntries(
        Object.entries(meta.valueRules.map).map(([value, label]) => [
          value,
          translateWithPrefixes(`map.${value}`, label),
        ]),
      ) as Record<number, string>
    : undefined;

  return {
    ...meta,
    displayName: translateWithPrefixes('displayName', meta.displayName),
    description: meta.description
      ? translateWithPrefixes('description', meta.description)
      : undefined,
    valueRules: translatedMap
      ? {
          ...meta.valueRules,
          map: translatedMap,
        }
      : meta.valueRules,
  } as T;
}
