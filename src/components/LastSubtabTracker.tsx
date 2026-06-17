import {
  getSubtabSegment,
  getSubtabTab,
  setLastSubtab,
} from '@utils/last-subtab';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function LastSubtabTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    const tab = getSubtabTab(pathname);
    if (!tab) return;

    const segment = getSubtabSegment(pathname);
    if (segment) setLastSubtab(tab, segment);
  }, [pathname]);

  return null;
}
