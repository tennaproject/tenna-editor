import { Card, Heading, Section, Upload } from '@components';
import { useState } from 'react';

export function HomeWelcome() {
  const [isUploadOpen, setUploadOpen] = useState(false);

  return (
    <Section className="page select-text">
      <Card className="p-6 flex flex-col gap-4">
        <Section id="heading" className="flex flex-col gap-3">
          <Heading level={3}>Welcome</Heading>
          <div className="text-text-2">
            <p>
              Tenna Editor is a powerful tool for editing DELTARUNE save files.
            </p>
            <p>
              To get started, click the area below or click the upload button in
              far right corner.
            </p>
            <p className="text-red font-bold">
              Remember to always back up your saves before editing them!
            </p>
          </div>
        </Section>

        <Section id="upload">
          <button
            className="h-45 w-full border-border bg-surface-3 hover:bg-surface-3-hover motion-reduce:transition-none transition-colors duration-200"
            onClick={() => setUploadOpen(true)}
          >
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-lg md:text-xl">
                Click here to upload save
              </h1>
              <p className="text-text-2">
                or click upload button in right corner
              </p>
            </div>
          </button>
          <Upload isOpen={isUploadOpen} setOpen={setUploadOpen} />
        </Section>
        <Section id="filelocation" className="flex flex-col gap-1">
          <Heading level={4}>Where to find saves?</Heading>
          <div className="text-text-2">
            <p>
              Your DELTARUNE save files are typically located in the following
              directories:
            </p>
            <ul className="list-disc pl-5 break-words">
              <li>
                Windows:{' '}
                <span className="font-mono">
                  C:\Users\your-user-name\AppData\Local\DELTARUNE
                </span>
              </li>
              <li>
                Mac:{' '}
                <span className="font-mono">
                  ~/Library/Application Support/com.tobyfox.deltarune/
                </span>
              </li>
              <li>
                Linux:{' '}
                <span className="font-mono">
                  ~/.steam/steam/steamapps/compatdata/1690940/pfx/drive_c/users/steamuser/AppData/Local/DELTARUNE/
                </span>
              </li>
            </ul>
          </div>
        </Section>
        <Section id="compatibility" className="flex flex-col gap-1">
          <Heading level={4}>Compatibility</Heading>
          <div className="text-text-2">
            <p>
              Tenna Editor is compatible with DELTARUNE Chapter 1-4 save files
              from the following platforms:
            </p>
            <ul className="list-disc pl-5">
              <li>PC (Windows)</li>
              <li>Mac</li>
              <li>Linux (through Steam Proton)</li>
            </ul>
            <p>
              Console versions{' '}
              <strong className="text-text-1">are not supported</strong> at the
              moment.
            </p>
          </div>
        </Section>
      </Card>
    </Section>
  );
}
