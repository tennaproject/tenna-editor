export type SubtabTab =
  | 'home'
  | 'about'
  | 'inventory'
  | 'party'
  | 'story'
  | 'devtools';

const STORAGE_KEY = 'tenna-last-subtabs';

const DEFAULT_SUBTABS: Record<SubtabTab, string> = {
  home: 'overview',
  about: 'overview',
  inventory: 'consumables',
  party: 'overview',
  story: 'chapter1',
  devtools: 'colors',
};

const VALID_SUBTABS: Record<SubtabTab, readonly string[]> = {
  home: ['overview', 'welcome'],
  about: ['overview', 'changelog', 'license', 'attributions'],
  inventory: ['consumables', 'key-items', 'weapons', 'armors'],
  party: ['overview', 'kris', 'susie', 'ralsei', 'noelle'],
  story: ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'],
  devtools: ['colors'],
};

export function getSubtabTab(pathname: string): SubtabTab | null {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return 'home';
  if (segment in DEFAULT_SUBTABS) return segment as SubtabTab;
  return null;
}

export function getSubtabSegment(pathname: string): string | null {
  const tab = getSubtabTab(pathname);
  if (!tab) return null;

  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2) {
    return tab === 'home' ? 'overview' : null;
  }

  return parts[1];
}

export function getDefaultSubtab(tab: SubtabTab): string {
  return DEFAULT_SUBTABS[tab];
}

function readStored(): Partial<Record<SubtabTab, string>> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Record<SubtabTab, string>>;
  } catch {
    return {};
  }
}

export function getLastSubtab(tab: SubtabTab): string {
  return readStored()[tab] ?? DEFAULT_SUBTABS[tab];
}

export function setLastSubtab(tab: SubtabTab, subtab: string) {
  try {
    const stored = readStored();
    stored[tab] = subtab;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // ignore storage errors
  }
}

export function isSubtabAllowed(
  tab: SubtabTab,
  subtab: string,
  saveChapter: number,
): boolean {
  if (!VALID_SUBTABS[tab].includes(subtab)) return false;

  if (tab === 'party' && subtab === 'noelle') {
    return saveChapter >= 2;
  }

  if (tab === 'story') {
    const chapterNumber = Number(subtab.replace('chapter', ''));
    return chapterNumber >= 1 && chapterNumber <= saveChapter;
  }

  return true;
}

export function resolveLastSubtab(tab: SubtabTab, saveChapter: number): string {
  const last = getLastSubtab(tab);
  if (isSubtabAllowed(tab, last, saveChapter)) return last;
  return DEFAULT_SUBTABS[tab];
}