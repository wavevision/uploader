import React, { memo } from 'react';

import { className } from '../../utils';
import { getRenderer } from '../index';
import { PROGRESS } from '../constants';
import { ProgressProps, ProgressRenderer } from '../types';

const Progress: ProgressRenderer = props => {
  const Progress = getRenderer(PROGRESS);
  return (
    <div className={className.element('progress')}>
      {Progress ? <Progress {...props} /> : `${props.value} %`}
    </div>
  );
};

export default memo<ProgressProps>(Progress);
