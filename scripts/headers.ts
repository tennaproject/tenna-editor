import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const HEADERS = {
  main: '',

  dev: `/*
  X-Robots-Tag: noindex, nofollow
`,
} as const;

export async function generateHeaders(branch: string) {
  const content =
    branch in HEADERS ? HEADERS[branch as keyof typeof HEADERS] : HEADERS.dev;

  try {
    await writeFile(resolve(resolve(), 'public/_headers'), content);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
