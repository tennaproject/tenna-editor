import type { Save } from '@types';
import { capEncoded, encodeSavePayload } from './save-share';
import { serializeSave } from './save-serializer';

export const DELTASAVER_SCHEME = 'deltasaver';
export const DELTASAVER_IMPORT_ACTION = 'import';
export const DELTASAVER_SCHEMA = 1;

const NAME_MAX_ENCODED = 128;
const AUTHOR_MAX_ENCODED = 96;

interface DeltasaverOptions {
  readonly author?: string;
}

export function createDeltasaverImportUrl(
  save: Save,
  options?: DeltasaverOptions,
): string {
  const params = new URLSearchParams();

  params.set('save', encodeSavePayload(serializeSave(save)));
  params.set('schema', String(DELTASAVER_SCHEMA));
  params.set('chapter', String(save.meta.chapter));
  params.set('slot', String(save.meta.slot));

  const name = capEncoded(save.meta.name, NAME_MAX_ENCODED);
  if (name) params.set('name', name);

  const author = capEncoded(options?.author, AUTHOR_MAX_ENCODED);
  if (author) params.set('author', author);

  return `${DELTASAVER_SCHEME}:${DELTASAVER_IMPORT_ACTION}?${params.toString()}`;
}
