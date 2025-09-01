import type { ChapterIndex } from '@data';
import { toast } from '@services';
import { useSave } from '@store';
import { useEffect, useRef, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface RequireChapterProps {
  children: ReactElement;
  requiredChapter: ChapterIndex;
  navigateTo?: string;
}

export function RequireChapter({
  children,
  requiredChapter,
  navigateTo = '/home',
}: RequireChapterProps) {
  const chapter = useSave((s) => s.save?.meta.chapter) || 0;
  const shownRef = useRef(false);

  const pass = chapter >= requiredChapter;
  useEffect(() => {
    if (!pass && !shownRef.current) {
      toast('This page is not available in this chapter', 'error');
      shownRef.current = true;
    }

    if (pass) {
      shownRef.current = false;
    }
  }, [pass]);

  if (!pass) {
    return <Navigate to={navigateTo} replace />;
  }

  return children;
}
