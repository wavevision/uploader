import React, { ReactElement } from 'react';

import File from '../Renderers/File';
import Image from '../Renderers/Image';
import { className } from '../utils';
import { ITEM, UPLOADER_TYPE_BASIC, UPLOADER_TYPE_IMAGES } from '../constants';
import { FileDefaultRenderer } from '../Renderers/types';
import { UploaderType } from '../types';

import { HandlerRenderProp } from './Handler/types';
import { UploaderItemProps } from './types';

type TypeRenderer = FileDefaultRenderer | undefined;

const TYPE_TO_RENDERER: Record<UploaderType, TypeRenderer> = {
  [UPLOADER_TYPE_BASIC]: File,
  [UPLOADER_TYPE_IMAGES]: Image,
};

const renderType = (
  props: UploaderItemProps,
  handler: HandlerRenderProp,
): ReactElement => {
  const Renderer = TYPE_TO_RENDERER[props.uploaderType];
  if (Renderer) {
    const { error, source, ...file } = props.file;
    return <Renderer error={error} file={file} handler={handler} />;
  }
  throw new Error(`Invalid uploader type '${props.uploaderType}'.`);
};

const render = (props: UploaderItemProps) => (
  handler: HandlerRenderProp,
): ReactElement => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div className={className.element('item')} {...ITEM.asObject(props.file.id)}>
    {renderType(props, handler)}
  </div>
);

export default { render };
