import { useState } from 'react';
import { Editor } from '@features/editor';
import { Entry } from './Entry';

export const Layout = () => {
  const [saveFile, setSaveFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen flex bg-base ">
      <Editor />
    </div>
  );
};
