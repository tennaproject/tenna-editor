import { Card, Heading, Section } from '@components';
import type { PropsWithChildren, ReactNode } from 'react';
import { mergeClass } from '@utils';

interface InventorySectionProps {
  id: string;
  title: string;
  description?: ReactNode;
  className?: string;
}

export function InventorySection({
  id,
  title,
  description,
  className,
  children,
}: PropsWithChildren<InventorySectionProps>) {
  return (
    <Section id={id} className={mergeClass('flex flex-col', className)}>
      <Card className="flex flex-col justify-between flex-1 px-6 py-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <Heading level={3}>{title}</Heading>
            {description ? (
              <div className="text-text-2">{description}</div>
            ) : null}
            {children}
          </div>
        </div>
      </Card>
    </Section>
  );
}
