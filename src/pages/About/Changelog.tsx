import { Card, Heading, Link, Section } from '@components';
import Markdown from 'react-markdown';

type ChangelogScope = 'added' | 'changed' | 'fixed' | 'removed';

export interface ChangelogEntry {
  version: string | null;
  date: string | null;
  description: string | null;
  scopes: Record<ChangelogScope, string[]>;
}

export function AboutChangelog() {
  const changelog = __CHANGELOG__ as ChangelogEntry[];

  return (
    <article className="page">
      {changelog.map((entry) => {
        if (!entry.version) return;
        return (
          <Section key={entry.version} id={entry.version}>
            <Card className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b pb-1 border-divider">
                <Heading level={3}>{entry.version}</Heading>
                {entry && (
                  <p className="text-text-2 leading-none text-xl font-mono">
                    {entry.date}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {entry.description && (
                  <div className="text-text-2">
                    <Markdown components={{ a: Link }}>
                      {entry.description}
                    </Markdown>
                  </div>
                )}
                {Object.entries(entry.scopes).map(
                  ([scope, elements]) => {
                    if (elements.length <= 0) return;
                    return (
                      <Section
                        key={scope}
                        id={`${entry.version}-${scope}`}
                        className="flex flex-col gap-2"
                      >
                        <Heading level={5}>
                          {scope.at(0)?.toUpperCase() + scope.slice(1)}
                        </Heading>
                        <div className="text-text-2">
                          {elements.map((element) => {
                            return (
                              <div key={element} className="flex gap-1">
                                -{' '}
                                <Markdown components={{ a: Link }}>
                                  {element}
                                </Markdown>
                              </div>
                            );
                          })}
                        </div>
                      </Section>
                    );
                  },
                )}
              </div>
            </Card>
          </Section>
        );
      })}
    </article>
  );
}
