import type { ReactNode } from 'react';
import { mergeClass } from '@utils/merge-class';
import { Section } from './Section';
import { InlineGroup } from './InlineGroup';
import { TextLabel } from './TextLabel';
import { HelpTip } from './HelpTip';
import Markdown from 'react-markdown';

interface FieldWrapperProps {
  id?: string;
  title?: string;
  titleIcon?: ReactNode;
  description?: string;
  flag?: number;
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
  titleIcon,
  description,
  flag,
  className,
  children,
  inline = false,
  label = false,
}: FieldWrapperProps) {
  const flagTag =
    flag !== undefined ? (
      <span className="ui-mono-sm font-normal text-text-3">
        <span className="select-none">#</span>
        <span className="select-all">{flag}</span>
      </span>
    ) : undefined;

  return (
    <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
      <InlineGroup>
        {inline && <>{children}</>}
        {titleIcon}
        {label && (
          <TextLabel htmlFor={id}>
            {title && renderMaybeMarkdown(title)}
          </TextLabel>
        )}
        {description && (
          <HelpTip title={title} titleExtra={flagTag}>
            {renderMaybeMarkdown(description)}
          </HelpTip>
        )}
      </InlineGroup>

      {!inline && <>{children}</>}
    </Section>
  );
}
