import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const DOMAIN = 'tennaproject.com';

const ROBOTS = {
  main: `User-agent: *
Allow: /

Sitemap: https://${DOMAIN}/sitemap.xml`,

  dev: `User-agent: *
Disallow: /`,
} as const;

export async function generateRobots(branch: string) {
  let content = ``;
  if (branch in ROBOTS) {
    content = ROBOTS[branch as keyof typeof ROBOTS];
  } else {
    content = ROBOTS.dev;
  }

  try {
    await writeFile(resolve(resolve(), 'public/robots.txt'), content);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
