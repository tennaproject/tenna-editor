import { toast } from '@services';
import { useUi } from '@store';
import { type ReactElement, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { translate } from '../i18n';

interface RequireDevmodeProps {
  children: ReactElement;
  navigateTo?: string;
}

export function RequireDevmode({
  children,
  navigateTo = '/',
}: RequireDevmodeProps) {
  const devmode = useUi((s) => s.ui.devmode);
  const shownRef = useRef(false);

  useEffect(() => {
    if (!devmode && !shownRef.current) {
      toast(
        translate(
          'ui.guard.developerModeDisabled',
          'Developer mode is not enabled',
        ),
        'error',
      );
      shownRef.current = true;
    }

    if (devmode) {
      shownRef.current = false;
    }
  }, [devmode]);

  if (!devmode) {
    return <Navigate to={navigateTo} replace />;
  }

  return children;
}
