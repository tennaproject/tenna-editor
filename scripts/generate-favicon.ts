import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import {
  generateFavicon,
  generateTransparentAsset,
} from '@vite-pwa/assets-generator/api';

const size = 96;
const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
const logoPath = new URL('../public/logo.svg', import.meta.url);
const logo = await readFile(logoPath, 'utf8');

const squareBackground =
  '<rect x="0" y="0" width="512" height="512" style="fill:rgb(31,30,42);"/>';
const circularBackground =
  '<circle cx="256" cy="256" r="256" style="fill:rgb(31,30,42);"/>';
const circularLogo = logo.replace(squareBackground, circularBackground);

if (circularLogo === logo) {
  throw new Error('could not locate the logo background shape');
}

const png = await (
  await generateTransparentAsset('png', Buffer.from(circularLogo), size, {
    padding: 0,
    resizeOptions: { fit: 'contain' },
    outputOptions: { compressionLevel: 9 },
  })
).toBuffer();

await Promise.all([
  writeFile(`${publicDirectory}favicon-${size}x${size}.png`, png),
  writeFile(`${publicDirectory}favicon.ico`, await generateFavicon('png', png)),
]);
