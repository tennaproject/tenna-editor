import { useState } from 'react';
import { Editor } from './Editor';
import { Sidebar } from './sidebar';

export const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-tenna overflow-hidden ">
      <Editor />
    </div>
  );
};
