import { Section, Card, Heading } from '@components';

const LICENSE = `zlib License

Copyright (c) 2025 jjezewski

This software is provided 'as-is', without any express or implied
warranty.  In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
` as const;

export function AboutLicense() {
  return (
    <div className="page">
      <Section>
        <Card className="p-6">
          <Heading level={4}>License</Heading>
          <code className="px-6 py-6 block">
            <pre className="font-mono whitespace-pre-wrap text-text-2">
              {LICENSE}
            </pre>
          </code>
        </Card>
      </Section>
    </div>
  );
}
