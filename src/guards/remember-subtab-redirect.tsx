import { useSave } from '@store';
import { resolveLastSubtab, type SubtabTab } from '@utils';
import { Navigate } from 'react-router-dom';

interface RememberSubtabRedirectProps {
  tab: SubtabTab;
}

export function RememberSubtabRedirect({ tab }: RememberSubtabRedirectProps) {
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const target = resolveLastSubtab(tab, chapter);

  return <Navigate to={target} replace />;
}