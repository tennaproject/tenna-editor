import type { BaseProperties } from '@types';

export const PHONECONTACTS = {
  EMPTY: 0,
  CALL_HOME: 201,
  SANS: 202,
};

export type PhoneContactIndex =
  (typeof PHONECONTACTS)[keyof typeof PHONECONTACTS];
export type PhoneContactName = keyof typeof PHONECONTACTS;

export const PHONECONTACTS_META: Record<PhoneContactIndex, BaseProperties> = {
  [PHONECONTACTS.EMPTY]: { displayName: 'Empty' },
  [PHONECONTACTS.CALL_HOME]: { displayName: 'Call Home' },
  [PHONECONTACTS.SANS]: { displayName: "Sans's Number" },
};
