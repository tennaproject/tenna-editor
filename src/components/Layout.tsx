import { useState } from 'react';
import { Editor } from '@features/editor';
import { Entry } from './Entry';

export const Layout = () => {
  const [saveFile, setSaveFile] = useState<File | null>(null);

  return (
    <div className="h-full bg-surface-1">
      <main className="h-full">
        <Editor></Editor>
      </main>
    </div>
  );
};
