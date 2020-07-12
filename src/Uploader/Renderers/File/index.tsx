import React, { memo, ReactElement, ReactNode } from 'react';

import Delete from '../Delete';
import Error from '../Error';
import Progress from '../Progress';
import Renderer from '../Renderer';
import { className } from '../../utils';
import { FILE } from '../constants';
import { FileDefaultRenderer, FileProps } from '../types';

import './style.scss';

const downloadLink = (props: FileProps): string | undefined => {
  if (props.file.urls) return props.file.urls.download;
};

const fileName = (props: FileProps): ReactNode => {
  const link = downloadLink(props);
  if (!props.handler.uploading && link) {
    return (
      <a className={className.element('file-download')} download href={link}>
        {props.file.originalName}
      </a>
    );
  }
  return props.file.originalName;
};

const renderDefault = (props: FileProps): ReactElement => (
  <div className={className.element('file')}>
    {props.handler.uploading && (
      <Progress value={Number(props.handler.progress)} />
    )}
    <span className={className.element('file-name')}>
      {fileName(props)}
      {props.error && <Error message={props.error} />}
    </span>
    <Delete onClick={props.handler.delete} />
  </div>
);

const File: FileDefaultRenderer = Renderer.render(FILE, renderDefault);

export default memo(File);
