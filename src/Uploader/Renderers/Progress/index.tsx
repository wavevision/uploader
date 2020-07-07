import React, { memo } from 'react';

import { className } from '../../utils';
import { useRenderer } from '../index';
import { PROGRESS } from '../constants';
import { ProgressProps, ProgressRenderer } from '../types';

const Progress: ProgressRenderer = props => {
  const Progress = useRenderer(PROGRESS);
  return (
    <div className={className.element('progress')}>
      {Progress ? <Progress {...props} /> : `${props.value} %`}
    </div>
  );
};

export default memo<ProgressProps>(Progress);
