import { Card, Heading, Section } from '@components';
import { mergeClass } from '@utils';
import type { ReactNode } from 'react';

interface StorySectionProps {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}

export function StorySection({
  id,
  title,
  className,
  children,
}: StorySectionProps) {
  return (
    <Section id={id} className={mergeClass('flex-1 flex', className)}>
      <Card className="flex-1 flex flex-col gap-4 p-6">
        <Heading level={3} className="border-b border-border/40 pb-3">
          {title}
        </Heading>
        {children}
      </Card>
    </Section>
  );
}
