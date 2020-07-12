import React, { memo, ReactElement } from 'react';

import { className } from '../../utils';

const NoImage = (): ReactElement => (
  <svg
    className={className.element('no-image')}
    enableBackground="new 0 0 24 24"
    id="bold"
    height={0}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={0}
  >
    <path d="m12 8c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm2.707 7.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-1.293-1.293-1.293 1.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l1.293-1.293-1.293-1.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.293 1.293 1.293-1.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.293 1.293z" />
    <path d="m21 1h-18c-1.654 0-3 1.346-3 3v16c0 1.654 1.346 3 3 3h18c1.654 0 3-1.346 3-3v-16c0-1.654-1.346-3-3-3zm0 20h-18c-.551 0-1-.448-1-1v-14h20v14c0 .552-.449 1-1 1z" />
  </svg>
);

export default memo(NoImage, () => true);
