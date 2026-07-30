const WIKI_BASE = 'https://deltarune.wiki/w/';

export const WIKI_ABILITIES_URL = `${WIKI_BASE}Equipment#Abilities`;

export function getWikiUrl(displayName: string) {
  return `${WIKI_BASE}${encodeURIComponent(displayName.trim().replace(/\s+/g, '_'))}`;
}
