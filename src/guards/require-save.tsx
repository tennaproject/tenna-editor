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
  const saveFile = useSave.getState().saveFile;
  const shownRef = useRef(false);

  useEffect(() => {
    if (!saveFile && !shownRef.current) {
      toast('There is no save loaded', 'error');
      shownRef.current = true;
    }

    if (saveFile) {
      shownRef.current = false;
    }
  }, [saveFile]);

  if (!saveFile) {
    return <Navigate to={navigateTo} replace />;
  }
  return children;
}
