import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { execSync } from 'child_process';

async function getPackageVersion() {
  try {
    const file = resolve(resolve(), 'package.json');
    const packageContent = await readFile(file, 'utf8');

    if (!packageContent) return;
    const { version } = JSON.parse(packageContent);

    return version;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getCommitHash() {
  try {
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
    return commitHash;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getBranch() {
  if (process.env.CF_PAGES_BRANCH) {
    return process.env.CF_PAGES_BRANCH;
  }

  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();
    return branch;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getVersion() {
  const commitHash = getCommitHash();
  const branch = getBranch();
  const packageVersion = await getPackageVersion();

  return {
    commitHash,
    branch,
    packageVersion,
  };
}
