import { Section, Card, Heading } from '@/components';

interface SwatchProps {
  label: string;
  bgClass: string;
  border?: boolean;
  className?: string;
}

function Swatch({
  label,
  bgClass,
  border = true,
  className = '',
}: SwatchProps) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className} w-20`}>
      <div
        title={label}
        aria-label={label}
        className={`w-14 h-14 ${bgClass} ${
          border ? 'border border-border' : ''
        } shadow-sm`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

interface ColorStateGroupProps {
  title: string;
  baseNames: readonly string[];
  stateSuffix: string;
  bgClasses: Record<string, string>;
}

function ColorStateGroup({
  title,
  baseNames,
  stateSuffix,
  bgClasses,
}: ColorStateGroupProps) {
  return (
    <div className="flex-1">
      <div className="text-xs text-text-2 font-bold uppercase tracking-wide mb-2">
        {title}
      </div>
      <div className="flex gap-2">
        {baseNames.map((baseName) => {
          const key = `${baseName}${stateSuffix ? `-${stateSuffix}` : ''}`;
          return <Swatch key={key} label={key} bgClass={bgClasses[key]} />;
        })}
      </div>
    </div>
  );
}

interface ColorFamilyProps {
  name: string;
  variants: readonly string[];
  bgClasses: Record<string, string>;
}

function ColorFamily({ name, variants, bgClasses }: ColorFamilyProps) {
  return (
    <div key={name} className="flex flex-col  gap-2">
      <div className="text-xs text-text-2 font-bold uppercase tracking-wide">
        {name}
      </div>
      <div className="flex gap-2">
        {variants.map((variant) => (
          <Swatch
            key={`${name}-${variant}`}
            label={variant === 'default' ? name : `${name}-${variant}`}
            bgClass={
              bgClasses[variant === 'default' ? name : `${name}-${variant}`]
            }
          />
        ))}
      </div>
    </div>
  );
}

const bgClasses: Record<string, string> = {
  'surface-1': 'bg-surface-1',
  'surface-2': 'bg-surface-2',
  'surface-3': 'bg-surface-3',
  'surface-4': 'bg-surface-4',
  'surface-1-hover': 'bg-surface-1-hover',
  'surface-2-hover': 'bg-surface-2-hover',
  'surface-3-hover': 'bg-surface-3-hover',
  'surface-4-hover': 'bg-surface-4-hover',
  'surface-1-active': 'bg-surface-1-active',
  'surface-2-active': 'bg-surface-2-active',
  'surface-3-active': 'bg-surface-3-active',
  'surface-4-active': 'bg-surface-4-active',

  red: 'bg-red',
  'red-hover': 'bg-red-hover',
  'red-active': 'bg-red-active',
  'red-soft': 'bg-red-soft',

  blue: 'bg-blue',
  'blue-hover': 'bg-blue-hover',
  'blue-active': 'bg-blue-active',
  'blue-soft': 'bg-blue-soft',

  pink: 'bg-pink',
  'pink-hover': 'bg-pink-hover',
  'pink-active': 'bg-pink-active',
  'pink-soft': 'bg-pink-soft',

  green: 'bg-green',
  'green-hover': 'bg-green-hover',
  'green-active': 'bg-green-active',
  'green-soft': 'bg-green-soft',

  yellow: 'bg-yellow',
  'yellow-hover': 'bg-yellow-hover',
  'yellow-active': 'bg-yellow-active',
  'yellow-soft': 'bg-yellow-soft',

  'tenna-950': 'bg-tenna-950',
  'tenna-900': 'bg-tenna-900',
  'tenna-800': 'bg-tenna-800',
  'tenna-700': 'bg-tenna-700',
  'tenna-600': 'bg-tenna-600',
  'tenna-500': 'bg-tenna-500',
  'tenna-400': 'bg-tenna-400',
  'tenna-300': 'bg-tenna-300',
  'tenna-200': 'bg-tenna-200',
  'tenna-100': 'bg-tenna-100',
  'tenna-50': 'bg-tenna-50',
};

const surfaceLevels = [
  'surface-1',
  'surface-2',
  'surface-3',
  'surface-4',
] as const;

const accentColors = ['red', 'blue', 'pink', 'green', 'yellow'] as const;
const accentVariants = ['default', 'hover', 'active', 'soft'] as const;

const tennaLevels = [
  950, 900, 800, 700, 600, 500, 400, 300, 200, 100, 50,
] as const;

export function Colors() {
  return (
    <div className="page">
      <Section>
        <Card>
          <Heading level={4}>Surface Colors</Heading>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <ColorStateGroup
                title="Default"
                baseNames={surfaceLevels}
                stateSuffix=""
                bgClasses={bgClasses}
              />
              <ColorStateGroup
                title="Hover"
                baseNames={surfaceLevels}
                stateSuffix="hover"
                bgClasses={bgClasses}
              />
              <ColorStateGroup
                title="Active"
                baseNames={surfaceLevels}
                stateSuffix="active"
                bgClasses={bgClasses}
              />
            </div>
          </div>
        </Card>
      </Section>

      <Section>
        <Card>
          <Heading level={4}>Accent Colors</Heading>
          <div className="flex flex-wrap gap-6">
            {accentColors.map((color) => (
              <ColorFamily
                key={color}
                name={color}
                variants={accentVariants}
                bgClasses={bgClasses}
              />
            ))}
          </div>
        </Card>
      </Section>

      <Section>
        <Card>
          <Heading level={4}>Tenna Scale</Heading>
          <div className="flex flex-wrap gap-6">
            {tennaLevels.map((v) => {
              const key = `tenna-${v}`;
              return <Swatch key={key} label={key} bgClass={bgClasses[key]} />;
            })}
          </div>
        </Card>
      </Section>

      <Section>
        <Card>
          <Heading level={4}>Text</Heading>
          <div className="p-3 bg-surface-1 border border-border flex justify-between">
            <div>
              <p className="text-text-1">text-1 — Primary text</p>
              <p className="text-text-2">text-2 — Secondary text</p>
              <p className="text-text-3">text-3 — Muted/disabled text</p>
            </div>
            <div className="font-bold">
              <p className="text-text-1">text-1 — Primary text</p>
              <p className="text-text-2">text-2 — Secondary text</p>
              <p className="text-text-3">text-3 — Muted/disabled text</p>
            </div>
            <div className="font-mono">
              <p className="text-text-1">text-1 — Primary text mono</p>
              <p className="text-text-2">text-2 — Secondary text mono</p>
              <p className="text-text-3">text-3 — Muted/disabled text mono</p>
            </div>
            <div className="font-mono font-bold">
              <p className="text-text-1">text-1 — Primary text mono</p>
              <p className="text-text-2">text-2 — Secondary text mono</p>
              <p className="text-text-3">text-3 — Muted/disabled text mono</p>
            </div>
          </div>
        </Card>
      </Section>

      <Section>
        <Card>
          <Heading level={4}>Border, Divider & Overlay</Heading>
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-surface-1">
              <div className="text-xs text-text-2 font-bold uppercase tracking-wide mb-2">
                Border
              </div>
              <div className="h-12 border border-border" />
            </div>
            <div className="p-3 bg-surface-1">
              <div className="text-xs text-text-2 font-bold uppercase tracking-wide mb-2">
                Divider
              </div>
              <div className="border-t border-divider" />
            </div>
            <div className="p-3 bg-surface-1">
              <div className="text-xs text-text-2 font-bold uppercase tracking-wide mb-2">
                Overlay
              </div>
              <div className="relative h-20 overflow-hidden border border-border">
                <div className="absolute inset-0 flex items-center justify-center text-text-2">
                  Background content
                </div>
                <div className="absolute inset-0 bg-overlay" />
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
