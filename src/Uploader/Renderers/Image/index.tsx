import React, { memo } from 'react';

import { FileDefaultRenderer } from '../types';
import { UPLOADER_TYPE_IMAGES } from '../../constants';

const Image: FileDefaultRenderer = () => (
  <code>
    Uploader type <strong>{UPLOADER_TYPE_IMAGES}</strong> not implemented
  </code>
);

export default memo(Image);
