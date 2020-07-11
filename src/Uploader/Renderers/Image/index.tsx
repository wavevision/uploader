import React, { memo } from 'react';

import { FileProps, FileRenderer } from '../types';
import { UPLOADER_TYPE_IMAGES } from '../../constants';

const Image: FileRenderer = () => (
  <code>
    Uploader type <strong>{UPLOADER_TYPE_IMAGES}</strong> not implemented
  </code>
);

export default memo<FileProps>(Image);
