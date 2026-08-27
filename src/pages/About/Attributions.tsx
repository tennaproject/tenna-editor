import { Section, Card, Heading, Link } from '@components';
import { formatTranslation, useTranslation } from '../../i18n';

export function AboutAttributions() {
  const { t } = useTranslation();
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
          <Heading level={3}>
            {t('ui.about.specialThanks', 'Special Thanks')}
          </Heading>
          <ul className="list-disc pl-6 space-y-1 text-text-2">
            <li>
              {t(
                'ui.about.specialThanksToby',
                'Toby Fox and whole Team behind DELTARUNE - for creating the game.',
              )}
            </li>
            <li>
              <Link href="https://saveeditor.spamton.com">Spamton Editor</Link>{' '}
              {t(
                'ui.about.specialThanksSpamtonSuffix',
                ' - for being direct inspiration.',
              )}
            </li>
            <li>
              <Link href="https://crumblingstatue.github.io/FloweysTimeMachine">
                Flowey's Time Machine
              </Link>{' '}
              {t(
                'ui.about.specialThanksFloweySuffix',
                ' - for being another inspiration.',
              )}
            </li>
            <li>
              <Link href="https://github.com/Jacky720/FloweysTimeMachine/tree/deltarune">
                Jacky720's "Flowey's Time Machine" fork
              </Link>{' '}
              {t(
                'ui.about.specialThanksJackySuffix',
                " - for save data research and references that helped with a lot of Tenna Editor's data mapping.",
              )}
            </li>
            <li>
              <Link href="https://deltarune.wiki">DELTARUNE Wiki</Link>
              {t(
                'ui.about.specialThanksWikiSuffix',
                ' - for much useful information that sped up the process of building this project significantly.',
              )}
            </li>
            <li>
              <Link href="https://github.com/UnderminersTeam/UndertaleModTool">
                Undertale Mod Tool
              </Link>{' '}
              {t(
                'ui.about.specialThanksUmtSuffix',
                ' - for allowing me to mine through the game code and assets to understand how things work.',
              )}
            </li>
          </ul>
        </Card>
      </Section>
      <Section id="fonts">
        <Card className="space-y-4 p-6">
          <Heading level={3}>{t('ui.about.fonts', 'Fonts')}</Heading>
          <ul className="list-disc pl-6 space-y-1">
            <li className="text-text-2">
              {t(
                'ui.about.pixelOperatorLicensePrefix',
                'Pixel Operator by Jayvee Enaguas (HarvettFox96) — License:',
              )}{' '}
              <Link href="https://creativecommons.org/publicdomain/zero/1.0/">
                CC0 1.0
              </Link>
              . {t('ui.about.sourcePrefix', 'Source:')}{' '}
              <Link href="https://www.dafont.com/pixel-operator.font">
                dafont.com/pixel-operator
              </Link>
            </li>
          </ul>
        </Card>
      </Section>
      <Section id="icons">
        <Card className="space-y-4 p-6">
          <Heading level={3}>{t('ui.about.icons', 'Icons')}</Heading>
          <ul className="list-disc pl-6 space-y-1">
            <li className="text-text-2">
              {t(
                'ui.about.pixelarticonsLicensePrefix',
                'Pixelarticons by Gerrit Halfmann — License:',
              )}{' '}
              <Link href="https://github.com/halfmage/pixelarticons/blob/main/LICENSE">
                MIT
              </Link>
              . {t('ui.about.websitePrefix', 'Website:')}{' '}
              <Link href="https://pixelarticons.com/">pixelarticons.com</Link>
            </li>
          </ul>
        </Card>
      </Section>
      <Section id="dependencies">
        <Card className="space-y-4 p-6">
          <Heading level={3}>
            {t('ui.about.dependencies', 'Dependencies')}
          </Heading>
          <div className="space-y-2">
            <div>
              <ul className="list-disc pl-6 space-y-1">
                {runtimeDeps.map((d) => (
                  <li key={d.name} className="text-text-2">
                    <Link href={d.url}>{d.name}</Link> —{' '}
                    {formatTranslation(
                      t('ui.about.licenseLabel', 'License: {license}'),
                      { license: d.license },
                    )}
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
