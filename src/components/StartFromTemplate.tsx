import { CHAPTERS, type ChapterIndex } from '@data';
import { saveStorage, toast } from '@services';
import { useSave } from '@store';
import { createTemplateSave } from '@utils';
import { useState } from 'react';
import { formatTranslation, useTranslation } from '../i18n';
import { Button } from './Button';

const TEMPLATE_CHAPTERS = Object.values(CHAPTERS) as ChapterIndex[];

interface StartFromTemplateProps {
  onCreated?: () => void;
  className?: string;
}

export function StartFromTemplate({
  onCreated,
  className,
}: StartFromTemplateProps) {
  const { t } = useTranslation();
  const setSave = useSave((state) => state.setSave);
  const [isCreating, setIsCreating] = useState(false);

  async function createFromTemplate(chapter: ChapterIndex) {
    if (isCreating) return;
    setIsCreating(true);

    try {
      const save = createTemplateSave(chapter);
      save.meta.name = formatTranslation(
        t('ui.template.defaultName', 'CH{chapter} New Game'),
        { chapter },
      );

      await saveStorage.set(save.meta.id, save);
      setSave(save);

      toast(t('ui.template.created', 'New game save created.'), 'success');
      onCreated?.();
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className={className}>
      {TEMPLATE_CHAPTERS.map((chapter) => (
        <Button
          key={chapter}
          variant="secondary"
          onClick={() => void createFromTemplate(chapter)}
          disabled={isCreating}
        >
          {t(`ui.nav.chapter${chapter}`, `Chapter ${chapter}`)}
        </Button>
      ))}
    </div>
  );
}
