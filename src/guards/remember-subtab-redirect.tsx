import { useSave } from '@store';
import { resolveLastSubtab, type SubtabTab } from '@utils';
import { Navigate, useLocation } from 'react-router-dom';

interface RememberSubtabRedirectProps {
  tab: SubtabTab;
}

export function RememberSubtabRedirect({ tab }: RememberSubtabRedirectProps) {
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const target = resolveLastSubtab(tab, chapter);
  const { hash } = useLocation();
  const sectionHash = hash.includes('=') ? '' : hash;

  return <Navigate to={`${target}${sectionHash}`} replace />;
}
