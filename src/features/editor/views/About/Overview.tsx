export const Overview = () => {
  return (
    <div className="flex flex-col mx-auto max-w-5xl py-8 px-8 w-full flex-none min-w-0 gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-3">Source Code</h2>
        <p className="mb-2">
          The source code for Tenna Editor is available on{' '}
          <a
            href="https://github.com/tennaproject/tenna-editor"
            className="text-red hover:text-red-hover font-bold"
          >
            GitHub
          </a>
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3">Build Info</h2>
        <div>
          <p>
            Version: <span className="font-mono">0.0.0</span>
          </p>
        </div>
      </div>
    </div>
  );
};
