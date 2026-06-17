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

function needsMarkdown(text: string) {
  return /[*_`[\]]/.test(text);
}

function renderMaybeMarkdown(text: string) {
  return needsMarkdown(text) ? <Markdown>{text}</Markdown> : text;
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
          <TextLabel htmlFor={id}>
            {title && renderMaybeMarkdown(title)}
          </TextLabel>
        )}
        {description && (
          <HelpTip title={title}>{renderMaybeMarkdown(description)}</HelpTip>
        )}
      </InlineGroup>

      {!inline && <>{children}</>}
    </Section>
  );
}
