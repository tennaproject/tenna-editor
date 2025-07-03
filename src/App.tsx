import { useState, useEffect } from 'react';
import tenna from './assets/tennahurt.webp';
import { parseSaveFile, serializeSaveFile } from './utils';
import { debugSave } from './assets/debugSave';
import type { DeltaruneSave } from './types';

function App() {
  const [parseResult, setParseResult] = useState<DeltaruneSave | null>(null);
  const [uploadedSaveContent, setUploadedSaveContent] = useState<string | null>(
    null,
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadDate, setUploadDate] = useState<Date | null>(null);

  useEffect(() => {
    const result = parseSaveFile(debugSave.data);
    setParseResult(result);
    setUploadedFileName(debugSave.name);
    setUploadDate(new Date());
  }, []);

  const handleFileLoad = (file: File) => {
    setUploadedFileName(file.name);
    setUploadDate(new Date());

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      if (!content) {
        return;
      }

      setUploadedSaveContent(content);
      const save = parseSaveFile(content);
      setParseResult(save);
    };
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileLoad(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileLoad(files[0]);
    }
  };

  const downloadFile = (
    content: string,
    filename: string,
    mimeType: 'text/plain',
  ) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportSaveFile = () => {
    if (!parseResult) {
      alert('No parsed save data available');
      return;
    }

    try {
      const saveContent = serializeSaveFile(parseResult);
      downloadFile(saveContent, uploadedFileName, 'text/plain');
    } catch (error) {
      alert(
        `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  };

  const handleExportUploadedSave = () => {
    if (!uploadedSaveContent) {
      alert('No uploaded save file available');
      return;
    }

    downloadFile(uploadedSaveContent, uploadedFileName, 'text/plain');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-row justify-center items-center p-8 gap-8 pb-20 max-w-7xl mx-auto w-full">
        <img src={tenna} className="max-w-[300px] max-h-[300px]" alt="Tenna" />
        <div className="flex-1 max-w-4xl">
          <h1 className="text-4xl font-bold mb-2 uppercase">Tenna Editor</h1>
          <h2 className="text-xl mb-4 uppercase">
            unofficial save editor for deltarune
          </h2>
          <div className="bg-gray-900 border-gray-700 border-1 p-6 mb-4 w-full">
            <h3 className="text-lg font-bold mb-2 uppercase">Upload file</h3>
            <div
              className={`border-2 border-dashed p-8 text-center transition-colors ${
                isDragOver
                  ? 'border-cyan-400 bg-cyan-900/20'
                  : 'border-gray-600'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p className="mb-4 text-gray-300">
                Drag and drop your file here, or click to select
              </p>
              <label className="bg-cyan-800 hover:bg-cyan-700 px-4 py-2 cursor-pointer inline-block transition-colors">
                Select File
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {parseResult && import.meta.env.MODE === 'development' && (
            <div className="bg-gray-900 border-gray-700 border-1 p-6 mt-4 w-full">
              <h3 className="text-lg font-bold mb-2 uppercase">Export</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={handleExportSaveFile}
                      className="bg-emerald-900 px-4 py-2 cursor-pointer uppercase"
                    >
                      Export Modified Save
                    </button>
                    <button
                      onClick={handleExportUploadedSave}
                      className="bg-yellow-600 px-4 py-2 cursor-pointer uppercase"
                    >
                      Export Original<sub> STARWALKER</sub> Save
                    </button>
                  </div>
                  {uploadedFileName && uploadDate && (
                    <div className="flex gap-1 text-sm text-gray-300">
                      <span className="font-medium">FILE:</span>{' '}
                      {uploadedFileName}
                      <span className="font-medium ml-2">
                        {uploadDate.toISOString()}
                      </span>{' '}
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4 uppercase">
                Parsed Data
              </h3>
              <pre className="text-xs overflow-auto max-h-72 bg-black p-2">
                {JSON.stringify(parseResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 text-center py-4 w-full bg-gray-900 border-t border-gray-700">
        experimental, use at your own risk
      </footer>
    </div>
  );
}

export default App;
