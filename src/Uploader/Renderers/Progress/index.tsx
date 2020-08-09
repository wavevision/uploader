import React, { memo, ReactElement } from 'react';

import Renderer from '../Renderer';
import { className } from '../../utils';
import { PROGRESS } from '../constants';
import { ProgressDefaultRenderer, ProgressProps } from '../types';

import './style.scss';

const renderDefault = (props: ProgressProps): ReactElement => (
  <div className={className.element('progress')}>{props.value} %</div>
);

const Progress: ProgressDefaultRenderer = Renderer.render(
  PROGRESS,
  renderDefault,
);

export default memo(Progress);
