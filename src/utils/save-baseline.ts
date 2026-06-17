import type { BaselineSource, Save, SaveBaseline, SaveGamePayload } from '@types';

export function extractGamePayload(save: Save): SaveGamePayload {
  const { meta: _meta, ...payload } = save;
  return structuredClone(payload) as SaveGamePayload;
}

export function createBaseline(save: Save, source: BaselineSource): SaveBaseline {
  return {
    capturedAt: new Date(),
    source,
    payload: extractGamePayload(save),
  };
}

export function setSaveBaseline(save: Save, source: BaselineSource): void {
  save.meta.baseline = createBaseline(save, source);
}