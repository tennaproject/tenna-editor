import { readFile } from 'fs/promises';
import { resolve } from 'path';

type ChangelogScope = 'added' | 'changed' | 'fixed' | 'removed';

export interface ChangelogEntry {
  version: string | null;
  date: string | null;
  scopes: Record<ChangelogScope, string[]>;
}

function getEntryBoilerplate(): ChangelogEntry {
  return {
    version: null,
    date: null,
    scopes: { added: [], changed: [], fixed: [], removed: [] },
  };
}

export async function getChangelog() {
  try {
    const entries: ChangelogEntry[] = [];
    const file = resolve(resolve(), 'CHANGELOG.md');
    const content = await readFile(file, 'utf8');

    let entry: ChangelogEntry = getEntryBoilerplate();
    let scope: ChangelogScope = 'added';

    content.split('\n').forEach((line) => {
      if (line.startsWith('## ')) {
        // This indicates that it's not first entry
        if (entry.version) {
          entries.push(entry);
          entry = getEntryBoilerplate();
        }

        const [version, date] = line
          .replaceAll(/#\s*|- |[[\]]/g, '')
          .split(' ');

        entry.version = version ?? null;
        entry.date = date ?? null;
      } else if (line.startsWith('### ')) {
        scope = line.split(' ')[1].toLocaleLowerCase() as ChangelogScope;
      } else if (line.startsWith('- ')) {
        entry.scopes[scope].push(line.split('- ')[1]);
      }
    });
    entries.push(entry);

    return entries;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
