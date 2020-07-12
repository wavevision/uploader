import React, { memo, ReactElement } from 'react';

import Renderer from '../Renderer';
import { className } from '../../utils';
import { useMessage } from '../../Messages';
import { DOWNLOAD } from '../constants';
import { DOWNLOAD_FILE } from '../../Messages/constants';
import { DownloadDefaultRenderer, DownloadProps } from '../types';

const renderDefault = (props: DownloadProps): ReactElement => (
  <a className={className.element('download-link')} download href={props.url}>
    {useMessage(DOWNLOAD_FILE)}
  </a>
);

const Download: DownloadDefaultRenderer = props => (
  <div className={className.element('download')}>
    {Renderer.render(DOWNLOAD, renderDefault, props)}
  </div>
);

export default memo(Download);
