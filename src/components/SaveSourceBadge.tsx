import type { Save } from '@types';
import { Badge } from './Badge';
import { useTranslation } from '../i18n';

interface SaveSourceBadgeProps {
  save?: Save | null;
  className?: string;
}

export function SaveSourceBadge({ save, className }: SaveSourceBadgeProps) {
  const { t } = useTranslation();
  const platform = save?.meta.source?.platform;
  if (!platform) return null;

  const isConsole = platform === 'console';

  return (
    <Badge
      tone={isConsole ? 'red' : 'neutral'}
      className={className}
      title={
        isConsole
          ? t(
              'ui.saveSource.importedConsole',
              'Imported from an already-exported save container',
            )
          : t('ui.saveSource.importedPc', 'Imported from a PC save file')
      }
    >
      {isConsole
        ? t('ui.saveSource.console', 'CONSOLE')
        : t('ui.saveSource.pc', 'PC')}
    </Badge>
  );
}
