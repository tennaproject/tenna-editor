import { Section, Card, Heading, Link } from '@components';

export function AboutOverview() {
  return (
    <article className="page">
      <Section id="legal">
        <Card className="flex flex-col gap-3 p-6">
          <Heading level={3}>Legal Info</Heading>
          <div className="flex flex-col text-text-2">
            <p>This is fan made project.</p>
            <p>
              This project is not affiliated with, endorsed by, or in any way
              associated with Toby Fox or any related entities.
            </p>
            <p>DELTARUNE™ is a registered trademark of Royal Sciences, LLC</p>
            <p>
              The assets used in this project from the DELTARUNE™ are
              copyrighted by Toby Fox and included under the fair use for
              non-commercial, transformative purposes. No endorsement is
              implied.
            </p>
          </div>
        </Card>
      </Section>

      <Section id="privacy">
        <Card className="flex flex-col gap-3 p-6">
          <Heading level={3}>Privacy</Heading>
          <div className="flex flex-col text-text-2 gap-2">
            <p>
              We don’t collect or store anything about you. All data is
              processed on-device and never sent anywhere.
            </p>
            <div>
              <p>
                Tenna Editor is hosted on Cloudflare, which may collect some of
                your personal data.
              </p>
              <Link href="https://www.cloudflare.com/trust-hub/privacy-and-data-protection">
                Click here to read Cloudflare's privacy policy and GDPR/HIPAA
                compliance info.
              </Link>
            </div>
          </div>
        </Card>
      </Section>

      <Section id="source">
        <Card className="flex flex-col gap-3 p-6">
          <Heading level={3}>Source Code</Heading>
          <p className="text-text-2">
            The source code of Tenna Editor is available on{' '}
            <Link href="https://github.com/tennaproject/tenna-editor">
              GitHub
            </Link>
          </p>
        </Card>
      </Section>

      <Section id="build">
        <Card className="flex flex-col gap-3 p-6">
          <Heading level={3}>Build Info</Heading>
          <div className="text-text-2">
            <p>ID: {__COMMIT_HASH__}</p>
            <p>Version: {__VERSION__}</p>
            <p>Type: {__BRANCH__}</p>
            <p>Timestamp: {__BUILD_TIMESTAMP__}</p>
          </div>
        </Card>
      </Section>
    </article>
  );
}
