import * as React from 'react';
import RegistryStatus from './';
import {Platform} from '@rollingversions/utils/lib/Platforms';

export default {title: 'modules/RegistryStatus'};

export const Default = () => {
  return (
    <div className="w-full min-h-full bg-gray-300 p-2">
      <RegistryStatus packageInfo={[]} />
      <RegistryStatus
        packageInfo={[
          {
            platform: Platform.npm,
            notToBePublished: true,
            versionTag: null,
            registryVersion: null,
            publishConfigAccess: 'public',
          },
        ]}
      />
      <RegistryStatus
        packageInfo={[
          {
            platform: Platform.npm,
            notToBePublished: false,
            versionTag: null,
            registryVersion: null,
            publishConfigAccess: 'public',
          },
        ]}
      />
      <RegistryStatus
        packageInfo={[
          {
            platform: Platform.npm,
            notToBePublished: false,
            versionTag: null,
            registryVersion: null,
            publishConfigAccess: 'restricted',
          },
        ]}
      />
      <RegistryStatus
        packageInfo={[
          {
            platform: Platform.npm,
            notToBePublished: false,
            versionTag: {
              commitSha: 'skdjfdskj',
              name: 'my-package@1.0.0',
              version: '1.0.0',
            },
            registryVersion: '1.0.0',
            publishConfigAccess: 'public',
          },
        ]}
      />
      <RegistryStatus
        packageInfo={[
          {
            platform: Platform.npm,
            notToBePublished: false,
            versionTag: {
              commitSha: 'skdjfdskj',
              name: 'my-package@1.0.0',
              version: '1.0.0',
            },
            registryVersion: '1.0.0',
            publishConfigAccess: 'restricted',
          },
        ]}
      />
    </div>
  );
};
