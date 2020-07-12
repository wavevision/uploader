import React, { memo, ReactElement } from 'react';

import Delete from '../Delete';
import Error from '../Error';
import Download from '../Download';
import Progress from '../Progress';
import Renderer from '../Renderer';
import { className } from '../../utils';
import { useMessage } from '../../Messages';
import { IMAGE } from '../constants';
import { NO_IMAGE_PREVIEW } from '../../Messages/constants';
import { FileDefaultRenderer, FileProps } from '../types';

import './style.scss';

const image = (props: FileProps): ReactElement => {
  if (props.handler.uploading) {
    return <Progress value={Number(props.handler.progress)} />;
  }
  if (props.error) return <Error message={props.error} />;
  return (
    <div className={className.element('image-preview')}>
      {props.file.urls && props.file.urls.preview ? (
        <img alt={props.file.originalName} src={props.file.urls.preview} />
      ) : (
        <Error message={useMessage(NO_IMAGE_PREVIEW)} />
      )}
    </div>
  );
};

const controls = (props: FileProps): ReactElement => (
  <div className={className.element('image-controls')}>
    {props.file.urls && props.file.urls.download && (
      <Download url={props.file.urls.download} />
    )}
    <Delete onClick={props.handler.delete} />
  </div>
);

const renderDefault = (props: FileProps): ReactElement => (
  <div className={className.element('image')}>
    {image(props)}
    {controls(props)}
  </div>
);

const Image: FileDefaultRenderer = Renderer.render(IMAGE, renderDefault);

export default memo(Image);
