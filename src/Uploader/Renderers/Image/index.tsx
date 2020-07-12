import React, { memo, ReactElement } from 'react';

import Delete from '../Delete';
import Download from '../Download';
import Progress from '../Progress';
import Renderer from '../Renderer';
import { className } from '../../utils';
import { IMAGE } from '../constants';
import { FileDefaultRenderer, FileProps } from '../types';

import NoImage from './NoImage';

const image = (props: FileProps): ReactElement => {
  if (props.handler.uploading) {
    return <Progress value={Number(props.handler.progress)} />;
  }
  return (
    <div className={className.element('image-preview')}>
      {props.file.urls && props.file.urls.preview ? (
        <img alt={props.file.originalName} src={props.file.urls.preview} />
      ) : (
        <NoImage />
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
  <>
    {image(props)}
    {controls(props)}
  </>
);

const Image: FileDefaultRenderer = props => (
  <div className={className.element('image')}>
    {Renderer.render(IMAGE, renderDefault, props)}
  </div>
);

export default memo(Image);
