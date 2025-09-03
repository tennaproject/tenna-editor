import { toast } from '@services';
import { useSave } from '@store';
import { type ReactElement, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface RequireSaveProps {
  children: ReactElement;
  navigateTo?: string;
}

export function RequireSave({
  children,
  navigateTo = '/home',
}: RequireSaveProps) {
  const save = useSave.getState().save;
  const shownRef = useRef(false);

  useEffect(() => {
    if (!save && !shownRef.current) {
      toast('There is no save loaded', 'error');
      shownRef.current = true;
    }

    if (save) {
      shownRef.current = false;
    }
  }, [save]);

  if (!save) {
    return <Navigate to={navigateTo} replace />;
  }
  return children;
}
