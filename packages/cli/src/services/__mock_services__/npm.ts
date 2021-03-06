import * as real from '../npm';
import {npmProfile, npmPackages} from './fixtures';
import {prerelease, gt, valid} from 'semver';
import {readRepoFile} from './git';

export const getOrgRoster: typeof real.getOrgRoster = async (_orgName) => {
  return {};
};

export const getProfile: typeof real.getProfile = async () => {
  return npmProfile
    ? {authenticated: true, profile: npmProfile}
    : {authenticated: false, message: 'You are not authenticated'};
};

export const getVersions: typeof real.getVersions = async (
  packageName: string,
) => {
  return npmPackages.get(packageName)?.versions || null;
};
export const getOwners: typeof real.getOwners = async (packageName: string) => {
  return npmPackages.get(packageName)?.maintainers || null;
};

export const getNpmVersion: typeof real.getNpmVersion = async (packageName) => {
  const packument = npmPackages.get(packageName);
  if (!packument?.versions.size) return null;
  return [...packument.versions].reduce((a, b) => {
    if (!prerelease(b) && gt(b, a)) {
      return b;
    }
    return a;
  });
};

export const publish: typeof real.publish = async (
  repoDirname,
  path,
  options,
) => {
  const pkg = JSON.parse(await readRepoFile(repoDirname, path, 'utf8'));
  if (!valid(pkg.version)) {
    throw new Error(`Invalid version number ${pkg.version}`);
  }
  const packument = npmPackages.get(pkg.name);
  if (!packument) {
    if (!options.dryRun) {
      npmPackages.set(pkg.name, {
        maintainers: npmProfile
          ? [{name: npmProfile.name, email: npmProfile.email}]
          : [],
        versions: new Set([pkg.version]),
      });
    }
  } else if (packument.versions.has(pkg.version)) {
    throw new Error(`${pkg.version} is already published.`);
  } else {
    if (!options.dryRun) packument.versions.add(pkg.version);
  }
};
