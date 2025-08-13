export const Overview = () => {
  return (
    <div className="page">
      <div>
        <h2 className="text-2xl font-bold mb-3">Legal Info</h2>
        <p>This is fan made project.</p>
        <p>
          This project is not affiliated with, endorsed by, or in any way
          associated with Toby Fox or any related entities.
        </p>
        <p>DELTARUNE™ is a registered trademark of Royal Sciences, LLC</p>
        <br />
      </div>
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
