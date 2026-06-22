import { readFile } from 'fs/promises';
import { resolve } from 'path';

type ChangelogScope = 'added' | 'changed' | 'fixed' | 'removed';

export interface ChangelogEntry {
  version: string | null;
  date: string | null;
  description: string | null;
  scopes: Record<ChangelogScope, string[]>;
}

function getEntryBoilerplate(): ChangelogEntry {
  return {
    version: null,
    date: null,
    description: null,
    scopes: { added: [], changed: [], fixed: [], removed: [] },
  };
}

export async function getChangelog() {
  try {
    const entries: ChangelogEntry[] = [];
    const file = resolve(resolve(), 'CHANGELOG.md');
    const content = await readFile(file, 'utf8');

    let entry: ChangelogEntry = getEntryBoilerplate();
    let scope: ChangelogScope | null = null;
    let descriptionLines: string[] = [];

    const finishEntry = () => {
      entry.description = descriptionLines.join(' ').trim() || null;
      descriptionLines = [];
      entries.push(entry);
    };

    content.split('\n').forEach((line) => {
      if (line.startsWith('## ')) {
        // This indicates that it's not first entry
        if (entry.version) {
          finishEntry();
          entry = getEntryBoilerplate();
        }
        scope = null;

        const [version, date] = line
          .replaceAll(/#\s*|- |[[\]]/g, '')
          .split(' ');

        entry.version = version ?? null;
        entry.date = date ?? null;
      } else if (line.startsWith('### ')) {
        scope = line.split(' ')[1].toLocaleLowerCase() as ChangelogScope;
      } else if (line.startsWith('- ')) {
        if (scope) {
          entry.scopes[scope].push(line.split('- ')[1]);
        }
      } else if (entry.version && !scope && line.trim()) {
        descriptionLines.push(line.trim());
      }
    });
    finishEntry();

    return entries;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
