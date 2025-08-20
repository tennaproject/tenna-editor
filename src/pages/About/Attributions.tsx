import { Section, Card, Heading } from '@components';
import type { ReactNode } from 'react';

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-red hover:text-red-hover underline font-bold">
    {children}
  </a>
);

export const Attributions = () => {
  const runtimeDeps = [
    { name: 'React', url: 'https://react.dev', license: 'MIT' },
    { name: 'react-dom', url: 'https://react.dev', license: 'MIT' },
    {
      name: 'React Router',
      url: 'https://reactrouter.com',
      license: 'MIT',
    },
    {
      name: 'Framer Motion',
      url: 'https://www.framer.com/motion/',
      license: 'MIT',
    },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com', license: 'MIT' },
    {
      name: '@tailwindcss/vite',
      url: 'https://www.npmjs.com/package/@tailwindcss/vite',
      license: 'MIT',
    },
  ] as const;
  const devDeps = [
    { name: 'Vite', url: 'https://vitejs.dev', license: 'MIT' },
    {
      name: '@vitejs/plugin-react-swc',
      url: 'https://www.npmjs.com/package/@vitejs/plugin-react-swc',
      license: 'MIT',
    },
    {
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org',
      license: 'Apache-2.0',
    },
    { name: 'ESLint', url: 'https://eslint.org', license: 'MIT' },
    {
      name: '@eslint/js',
      url: 'https://www.npmjs.com/package/@eslint/js',
      license: 'MIT',
    },
    {
      name: 'eslint-config-prettier',
      url: 'https://github.com/prettier/eslint-config-prettier',
      license: 'MIT',
    },
    {
      name: 'eslint-plugin-react',
      url: 'https://github.com/jsx-eslint/eslint-plugin-react',
      license: 'MIT',
    },
    {
      name: 'eslint-plugin-react-hooks',
      url: 'https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks',
      license: 'MIT',
    },
    {
      name: 'eslint-plugin-react-refresh',
      url: 'https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-refresh',
      license: 'MIT',
    },
    {
      name: 'globals',
      url: 'https://github.com/sindresorhus/globals',
      license: 'MIT',
    },
    { name: 'Prettier', url: 'https://prettier.io', license: 'MIT' },
    {
      name: 'typescript-eslint',
      url: 'https://typescript-eslint.io',
      license: 'MIT',
    },
    {
      name: 'vite-plugin-svgr',
      url: 'https://github.com/pd4d10/vite-plugin-svgr',
      license: 'MIT',
    },
    {
      name: 'vite-tsconfig-paths',
      url: 'https://github.com/aleclarson/vite-tsconfig-paths',
      license: 'MIT',
    },
  ] as const;

  return (
    <div className="page">
      <Section id="fonts">
        <Card className="space-y-4">
          <Heading level={5}>Fonts</Heading>
          <ul className="list-disc pl-6 space-y-1">
            <li className="text-text-2">
              Pixel Operator and Pixel Operator Mono — License: SIL Open Font
              License 1.1 (<Link href="https://scripts.sil.org/OFL">OFL</Link>
              ). Source:{' '}
              <Link href="https://www.dafont.com/pixel-operator.font">
                dafont.com/pixel-operator
              </Link>
            </li>
          </ul>
        </Card>
      </Section>
      <Section id="icons">
        <Card className="space-y-4">
          <Heading level={5}>Icons</Heading>
          <ul className="list-disc pl-6 space-y-1">
            <li className="text-text-2">
              Pixelarticons by Gerrit Halfmann — License:{' '}
              <Link href="https://github.com/halfmage/pixelarticons/blob/main/LICENSE">
                MIT
              </Link>
              . Website:{' '}
              <Link href="https://pixelarticons.com/">pixelarticons.com</Link>
            </li>
          </ul>
        </Card>
      </Section>
      <Section id="dependencies">
        <Card className="space-y-4">
          <Heading level={5}>Dependencies</Heading>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-text-1 mb-2">
                Runtime Dependencies
              </p>
              <ul className="list-disc pl-6 space-y-1">
                {runtimeDeps.map((d) => (
                  <li key={d.name} className="text-text-2">
                    <Link href={d.url}>{d.name}</Link> — License: {d.license}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-text-1 mb-2">
                Development Dependencies
              </p>
              <ul className="list-disc pl-6 space-y-1">
                {devDeps.map((d) => (
                  <li key={d.name} className="text-text-2">
                    <Link href={d.url}>{d.name}</Link> — License: {d.license}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
};
