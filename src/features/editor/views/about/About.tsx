export const About = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <h2 className="text-2xl font-bold mb-3">Source Code</h2>
        <p className="mb-2">
          The source code for Tenna Editor is available on{' '}
          <a
            href="https://github.com/tennaproject/tenna-editor"
            className="text-primary font-bold"
          >
            GitHub
          </a>
        </p>
      </div>

      <div className="p-3">
        <h2 className="text-2xl font-bold mb-3">License</h2>
        <pre className="font-mono text-xs whitespace-pre-wrap">
          {`zlib License

Copyright (c) 2025 jjezewski

This software is provided 'as-is', without any express or implied
warranty.  In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.`}
        </pre>
      </div>

      <div className="p-3">
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
