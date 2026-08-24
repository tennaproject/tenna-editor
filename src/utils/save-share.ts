import type { Save, SaveSlot } from '@types';
import type { ChapterIndex } from '@data';
import { base64UrlToBytes, bytesToBase64Url, serializeSave } from '@utils';
import { deflateSync, inflateSync } from 'fflate';

const SHARE_SCHEMA = 1;

const NAME_MAX_ENCODED = 128;
const AUTHOR_MAX_ENCODED = 96;
const DESCRIPTION_MAX_ENCODED = 320;

export class ShareError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShareError';
  }
}

interface ShareOptions {
  readonly author?: string;
  readonly description?: string;
}

export interface ShareMeta extends ShareOptions {
  readonly schema: number;
  readonly sharedAt: string;
  readonly name?: string;
  readonly isCompletionSave: boolean;
  readonly chapter: ChapterIndex;
  readonly slot: SaveSlot;
}

// deflate-raw format
export function encodeSavePayload(saveText: string): string {
  const compressed = deflateSync(new TextEncoder().encode(saveText), {
    level: 9,
  });
  return bytesToBase64Url(compressed);
}

export function decodeSavePayload(payload: string): string {
  try {
    return new TextDecoder().decode(inflateSync(base64UrlToBytes(payload)));
  } catch {
    throw new ShareError('Save payload is malformed');
  }
}

function capEncoded(
  value: string | undefined,
  max: number,
): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  let result = '';
  let length = 0;

  for (const character of trimmed) {
    const size = encodeURIComponent(character).length;
    if (length + size > max) break;
    result += character;
    length += size;
  }

  return result || undefined;
}

function setOptional(
  params: URLSearchParams,
  key: string,
  value: string | undefined,
) {
  if (value) params.set(key, value);
}

export function createShareUrl(save: Save, options?: ShareOptions): string {
  const params = new URLSearchParams();

  params.set('save', encodeSavePayload(serializeSave(save)));
  params.set('schema', String(SHARE_SCHEMA));
  params.set('sharedAt', new Date().toISOString());
  params.set('chapter', String(save.meta.chapter));
  params.set('slot', String(save.meta.slot));
  if (save.meta.isCompletionSave) params.set('isCompletionSave', 'true');

  setOptional(params, 'name', capEncoded(save.meta.name, NAME_MAX_ENCODED));
  setOptional(
    params,
    'author',
    capEncoded(options?.author, AUTHOR_MAX_ENCODED),
  );
  setOptional(
    params,
    'description',
    capEncoded(options?.description, DESCRIPTION_MAX_ENCODED),
  );

  return `${location.origin}/share#${params.toString()}`;
}

function readIndex(value: string | null): number | null {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function readShareMeta(params: URLSearchParams): ShareMeta | undefined {
  if (readIndex(params.get('schema')) !== SHARE_SCHEMA) return undefined;

  const chapter = readIndex(params.get('chapter'));
  const slot = readIndex(params.get('slot'));
  if (chapter === null || slot === null) return undefined;
  if (slot < 0 || slot > 2) return undefined;

  return {
    schema: SHARE_SCHEMA,
    sharedAt: params.get('sharedAt') ?? '',
    name: params.get('name') ?? undefined,
    isCompletionSave: params.get('isCompletionSave') === 'true',
    chapter: chapter as ChapterIndex,
    slot: slot as SaveSlot,
    author: params.get('author') ?? undefined,
    description: params.get('description') ?? undefined,
  };
}

export function parseShareUrl(hash: string): {
  saveText: string;
  meta?: ShareMeta;
} {
  const params = new URLSearchParams(
    hash.startsWith('#') ? hash.slice(1) : hash,
  );

  const save = params.get('save');
  if (!save) {
    throw new ShareError('Link does not contain a save');
  }

  return {
    saveText: decodeSavePayload(save),
    meta: readShareMeta(params),
  };
}
