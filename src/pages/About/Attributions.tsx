import { Section, Card, Heading, Link } from '@components';

export function AboutAttributions() {
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
    { name: 'clsx', url: 'https://github.com/lukeed/clsx', license: 'MIT' },
    {
      name: 'color-convert',
      url: 'https://github.com/Qix-/color-convert',
      license: 'MIT',
    },
    {
      name: 'downshift',
      url: 'https://github.com/downshift-js/downshift',
      license: 'MIT',
    },
    {
      name: 'fast-glob',
      url: 'https://github.com/mrmlnc/fast-glob',
      license: 'MIT',
    },
    {
      name: 'idb',
      url: 'https://github.com/jakearchibald/idb',
      license: 'ISC',
    },
    { name: 'immer', url: 'https://github.com/immerjs/immer', license: 'MIT' },
    {
      name: 'react-markdown',
      url: 'https://github.com/remarkjs/react-markdown',
      license: 'MIT',
    },
    {
      name: 'tailwind-merge',
      url: 'https://github.com/dcastil/tailwind-merge',
      license: 'MIT',
    },
    {
      name: 'vite-plugin-pwa',
      url: 'https://github.com/vite-pwa/vite-plugin-pwa',
      license: 'MIT',
    },
    {
      name: 'zustand',
      url: 'https://github.com/pmndrs/zustand',
      license: 'MIT',
    },
    {
      name: 'zustand-debounce',
      url: 'https://github.com/AbianS/zustand-debounce',
      license: 'MIT',
    },
  ] as const;

  return (
    <div className="page">
      <Section id="special-thanks">
        <Card className="space-y-4 p-6">
          <Heading level={3}>Special Thanks</Heading>
          <ul className="list-disc pl-6 space-y-1 text-text-2">
            <li>
              Toby Fox and whole Team behind Deltarune - for creating the game.
            </li>
            <li>
              <Link href="https://saveeditor.spamton.com">Spamton Editor</Link>{' '}
              - for being direct inspiration.
            </li>
            <li>
              <Link href="https://crumblingstatue.github.io/FloweysTimeMachine">
                Flowey's Time Machine
              </Link>{' '}
              - for being another inspiration.
            </li>
            <li>
              <Link href="https://deltarune.wiki">Deltarune Wiki</Link> - for
              much useful information that sped up the process of building this
              project significantly.
            </li>
            <li>
              <Link href="https://github.com/UnderminersTeam/UndertaleModTool">
                Undertale Mod
              </Link>{' '}
              - for allowing me to mine through the game code and assets to
              understand how things work.
            </li>
          </ul>
        </Card>
      </Section>
      <Section id="fonts">
        <Card className="space-y-4 p-6">
          <Heading level={3}>Fonts</Heading>
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
        <Card className="space-y-4 p-6">
          <Heading level={3}>Icons</Heading>
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
        <Card className="space-y-4 p-6">
          <Heading level={3}>Dependencies</Heading>
          <div className="space-y-2">
            <div>
              <ul className="list-disc pl-6 space-y-1">
                {runtimeDeps.map((d) => (
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
}
