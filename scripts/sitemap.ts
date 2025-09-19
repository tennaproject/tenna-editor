import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const ROUTES: string[] = [
  '/',
  '/welcome',
  '/inventory',
  '/inventory/consumables',
  '/inventory/key-items',
  '/inventory/weapons',
  '/inventory/armors',
  '/party',
  '/party/overview',
  '/party/kris',
  '/party/susie',
  '/party/ralsei',
  '/party/noelle',
  '/light-world',
  '/story',
  '/story/chapter1',
  '/story/chapter2',
  '/story/chapter3',
  '/story/chapter4',
  '/recruits',
  '/about',
  '/about/overview',
  '/about/changelog',
  '/about/license',
  '/about/attributions',
] as const;

const DOMAIN = 'tennaproject.com';

function getRoute(route: string) {
  return `  <url>
    <loc>https://${DOMAIN}${route}</loc>
  </url>
`;
}

export async function generateSitemap() {
  let content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (let i = 0; i < ROUTES.length; i += 1) {
    content += getRoute(ROUTES[i]);
  }

  content += '</urlset>';

  try {
    await writeFile(resolve(resolve(), 'public/sitemap.xml'), content);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
