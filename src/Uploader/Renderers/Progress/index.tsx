import React, { memo } from 'react';

import Renderer from '../Renderer';
import { className } from '../../utils';
import { PROGRESS } from '../constants';
import { ProgressDefaultRenderer } from '../types';

const Progress: ProgressDefaultRenderer = props => (
  <div className={className.element('progress')}>
    {Renderer.render(PROGRESS, <>{props.value} %</>, props)}
  </div>
);

export default memo(Progress);
