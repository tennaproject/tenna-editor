import { Heading } from './Heading';
import { useTranslation } from '../i18n';

/** In-tab loading state — keeps the page shell visible. */
export function PageContentSpinner() {
  const { t } = useTranslation();
  return (
    <div className="flex h-[88%] flex-col justify-center items-center">
      <Heading level={2}>
        {t('ui.common.loadingHeadline', 'MIKE, the BOARD, please!')}
      </Heading>
      <p className="text-text-2">
        {t('ui.common.editorLoading', 'Editor is loading...')}
      </p>
      <div className="animate-spin rounded-full h-20 w-20 border-12 border-surface-2 border-t-surface-4 mt-6" />
    </div>
  );
}
