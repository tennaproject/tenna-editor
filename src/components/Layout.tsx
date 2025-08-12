import { useState } from 'react';
import { Editor } from '@features/editor';
import { ToastContainer } from '@components/Toast';

export const Layout = () => {
  const [saveFile, setSaveFile] = useState<File | null>(null);

  return (
    <div className="h-full bg-surface-1">
      <main className="h-full">
        <Editor />
      </main>
      <ToastContainer />
    </div>
  );
};
