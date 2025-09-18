import type { ReactNode } from 'react';
import { Section } from './Section';
import { InlineGroup } from './InlineGroup';
import { TextLabel } from './TextLabel';
import { HelpTip } from './HelpTip';
import Markdown from 'react-markdown';

interface FieldWrapperProps {
  id?: string;
  title?: string;
  description?: string;
  className?: string | undefined;
  inline?: boolean;
  label?: boolean;
  children?: ReactNode;
}

export function FieldWrapper({
  id,
  title,
  description,
  className,
  children,
  inline = false,
  label = false,
}: FieldWrapperProps) {
  return (
    <Section id={id} className={className}>
      <InlineGroup>
        {inline && <>{children}</>}
        {label && (
          <TextLabel>
            <Markdown>{title}</Markdown>
          </TextLabel>
        )}
        {description && (
          <HelpTip title={title}>
            <Markdown>{description}</Markdown>
          </HelpTip>
        )}
      </InlineGroup>

      {!inline && <>{children}</>}
    </Section>
  );
}
