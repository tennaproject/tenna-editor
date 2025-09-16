import { Card, Heading, ItemField, Section, type ItemType } from '@components';
import { mergeClass } from '@utils';

const COLS_CLASSES: Record<1 | 2 | 3 | 4, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

interface InventoryPageProps {
  id: string;
  title: string;
  slots: number;
  type: ItemType;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export function InventoryPage({
  id,
  title,
  slots,
  type,
  cols = 1,
  className,
}: InventoryPageProps) {
  return (
    <Section id={id} className={mergeClass('flex flex-col', className)}>
      <Card className="flex flex-col justify-between flex-1 px-6 py-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <Heading level={3}>{title}</Heading>
            <div
              className={mergeClass(
                'w-full grid gap-4 mt-2',
                COLS_CLASSES[cols],
              )}
            >
              {Array.from({ length: slots }).map((_, i) => (
                <ItemField key={i} type={type} slot={i} />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
