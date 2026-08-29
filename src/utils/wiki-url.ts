const WIKI_BASE = 'https://deltarune.wiki/w/';

export const WIKI_ABILITIES_URL = `${WIKI_BASE}Equipment#Abilities`;

const NAMES_WITHOUT_WIKI_PAGES = new Set(['debug enemy']);

export function getWikiUrl(displayName: string) {
  const name = displayName.trim();
  if (!name || NAMES_WITHOUT_WIKI_PAGES.has(name.toLowerCase())) {
    return undefined;
  }

  return `${WIKI_BASE}${encodeURIComponent(name.replace(/\s+/g, '_'))}`;
}
