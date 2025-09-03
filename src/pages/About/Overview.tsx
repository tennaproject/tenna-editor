import { Section, Card, Heading } from '@components';

export function AboutOverview() {
  return (
    <div className="page">
      <Section>
        <Card className="space-y-4 p-6">
          <Heading level={3}>Legal Info</Heading>
          <div className="space-y-2 text-text-2">
            <p>This is fan made project.</p>
            <p>
              This project is not affiliated with, endorsed by, or in any way
              associated with Toby Fox or any related entities.
            </p>
            <p>DELTARUNE™ is a registered trademark of Royal Sciences, LLC</p>
          </div>
        </Card>
      </Section>

      <Section>
        <Card className="space-y-4 p-6">
          <Heading level={3}>Source Code</Heading>
          <p className="mb-2 text-text-2">
            The source code for Tenna Editor is available on{' '}
            <a
              href="https://github.com/tennaproject/tenna-editor"
              className="text-red hover:text-red-hover underline font-bold"
            >
              GitHub
            </a>
          </p>
        </Card>
      </Section>

      <Section>
        <Card className="space-y-4 p-6">
          <Heading level={3}>Build Info</Heading>
          <div className="text-text-2">
            <p>ID: {__COMMIT_HASH__}</p>
            <p>Version: {__VERSION__}</p>
            <p>Type: {__BRANCH__}</p>
          </div>
        </Card>
      </Section>
    </div>
  );
}
