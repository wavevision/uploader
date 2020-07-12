import React, { memo, ReactElement } from 'react';

import Renderer from '../Renderer';
import { className } from '../../utils';
import { useMessage } from '../../Messages';
import { DOWNLOAD } from '../constants';
import { DOWNLOAD_FILE } from '../../Messages/constants';
import { DownloadDefaultRenderer, DownloadProps } from '../types';

import './style.scss';

const renderDefault = (props: DownloadProps): ReactElement => (
  <div className={className.element('download')}>
    <a className={className.element('download-link')} download href={props.url}>
      {useMessage(DOWNLOAD_FILE)}
    </a>
  </div>
);

const Download: DownloadDefaultRenderer = Renderer.render(
  DOWNLOAD,
  renderDefault,
);

export default memo(Download);
