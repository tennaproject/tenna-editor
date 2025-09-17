import { Card, Heading, Section } from '@components';

type ChangelogScope = 'added' | 'changed' | 'fixed' | 'removed';

export interface ChangelogEntry {
  version: string | null;
  date: string | null;
  scopes: Record<ChangelogScope, string[]>;
}

export function AboutChangelog() {
  const changelog = __CHANGELOG__ as ChangelogEntry[];

  return (
    <article className="page">
      {changelog.map((entry, index) => {
        if (!entry.version) return;
        return (
          <Section key={index} id={entry.version}>
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
                {Object.entries(entry.scopes).map(
                  ([scope, elements], index) => {
                    if (elements.length <= 0) return;
                    return (
                      <Section key={index} id={`${entry.version}-${scope}`}>
                        <Heading level={5}>
                          {scope.at(0)?.toUpperCase() + scope.slice(1)}
                        </Heading>
                        <div className="text-text-2">
                          {elements.map((element, index) => {
                            return <p key={index}>- {element}</p>;
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
