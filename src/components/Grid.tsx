import { mergeClass } from '@utils';
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface GridProps {
  children?: ReactNode;
  container?: boolean;
  item?: boolean;
  size?: Size;
  spacing?: Spacing;
  className?: string;
}

const gapClass: Record<Spacing, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
};

const gapPX: Record<Spacing, string> = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
};

// nightmare fuel
const basisClass: Record<Size, string> = {
  1: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(8.333333%_-_var(--g))]',
  2: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(16.666667%_-_var(--g))]',
  3: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(25%_-_var(--g))]',
  4: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(33.333333%_-_var(--g))]',
  5: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(41.666667%_-_var(--g))]',
  6: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(50%_-_var(--g))]',
  7: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(58.333333%_-_var(--g))]',
  8: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(66.666667%_-_var(--g))]',
  9: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(75%_-_var(--g))]',
  10: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(83.333333%_-_var(--g))]',
  11: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(91.666667%_-_var(--g))]',
  12: 'basis-[calc(100%_-_var(--g))] md:basis-[calc(100%_-_var(--g))]',
};

export function Grid({
  children,
  container = false,
  item = false,
  size,
  spacing = 2,
  className,
}: GridProps) {
  if (container) {
    const containerClass = mergeClass(
      'flex flex-wrap items-stretch',
      gapClass[spacing],
      className,
    );

    const items = Children.map(children, (child) => {
      if (!isValidElement(child))
        return <div className="basis-[calc(100%_-_var(--g))]">{child}</div>;

      const el = child as ReactElement<GridProps>;

      if (el.type === Grid || el.props?.size != null) {
        return cloneElement(el, { item: true });
      }

      return <div className="basis-[calc(100%_-_var(--g))]">{el}</div>;
    });

    return (
      <div
        className={containerClass}
        style={{ ['--g' as string]: gapPX[spacing] }}
      >
        {items}
      </div>
    );
  }

  if (item) {
    const basis = size ? basisClass[size] : basisClass[12];
    const itemClass = mergeClass('shrink-0 grow-0 min-w-0', basis, className);
    return <div className={itemClass}>{children}</div>;
  }

  return <div className={className}>{children}</div>;
}
