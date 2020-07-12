import React, { memo, ReactElement } from 'react';

import Renderer from '../Renderer';
import { className } from '../../utils';
import { PROGRESS } from '../constants';
import { ProgressDefaultRenderer, ProgressProps } from '../types';

import './progress.scss';

const renderDefault = (props: ProgressProps): ReactElement => (
  <>{props.value} %</>
);

const Progress: ProgressDefaultRenderer = props => (
  <div className={className.element('progress')}>
    {Renderer.render(PROGRESS, renderDefault, props)}
  </div>
);

export default memo(Progress);
