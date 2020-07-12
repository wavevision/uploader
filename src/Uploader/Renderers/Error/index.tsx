import React, { memo, ReactElement } from 'react';

import Renderer from '../Renderer';
import { className } from '../../utils';
import { ERROR } from '../constants';
import { ErrorDefaultRenderer, ErrorProps } from '../types';

import './style.scss';

const renderDefault = (props: ErrorProps): ReactElement => (
  <code className={className.element('error')}>{props.message}</code>
);

const Error: ErrorDefaultRenderer = Renderer.render(ERROR, renderDefault);

export default memo(Error);
