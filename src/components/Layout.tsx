import { useState } from 'react';
import { Editor } from './Editor';
import { Entry } from './Entry';

export const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-base overflow-hidden ">
      <Editor />
    </div>
  );
};
