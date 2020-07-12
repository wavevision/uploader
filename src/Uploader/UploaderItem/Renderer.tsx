import React, { ReactElement } from 'react';

import File from '../Renderers/File';
import Image from '../Renderers/Image';
import { className } from '../utils';
import { UPLOADER_TYPE_BASIC, UPLOADER_TYPE_IMAGES } from '../constants';
import { FileDefaultRenderer } from '../Renderers/types';
import { UploaderType } from '../types';

import { HandlerRenderProp } from './Handler/types';
import { UploaderItemProps } from './types';

const TYPE_TO_RENDERER: Record<UploaderType, FileDefaultRenderer> = {
  [UPLOADER_TYPE_BASIC]: File,
  [UPLOADER_TYPE_IMAGES]: Image,
};

const renderType = (
  props: UploaderItemProps,
  handler: HandlerRenderProp,
): ReactElement => {
  const Renderer = TYPE_TO_RENDERER[props.uploaderType];
  if (Renderer) return <Renderer file={props.file} handler={handler} />;
  throw new Error(`Invalid uploader type '${props.uploaderType}'.`);
};

const render = (props: UploaderItemProps) => (
  handler: HandlerRenderProp,
): ReactElement => (
  <div className={className.element('item')}>{renderType(props, handler)}</div>
);

export default { render };
