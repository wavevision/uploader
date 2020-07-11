import React, { ReactElement } from 'react';

import Delete from '../Renderers/Delete';
import File from '../Renderers/File';
import { className } from '../utils';
import { UPLOADER_TYPE_BASIC, UPLOADER_TYPE_IMAGES } from '../constants';

import { HandlerRenderProp, UploaderItemProps } from './types';

const renderType = (
  props: UploaderItemProps,
  handler: HandlerRenderProp,
): ReactElement => {
  switch (props.uploaderType) {
    case UPLOADER_TYPE_BASIC:
      return (
        <>
          <File
            id={props.file.id}
            isUploading={handler.uploading}
            name={props.file.originalName}
            uploadProgress={handler.progress}
            urls={props.file.urls}
          />
          <Delete onClick={handler.delete} />
        </>
      );
    case UPLOADER_TYPE_IMAGES:
      return (
        <code>
          Uploader type <strong>{UPLOADER_TYPE_IMAGES}</strong> not implemented
        </code>
      );
  }
  throw new Error(`Invalid uploader type ${props.uploaderType}.`);
};

const render = (props: UploaderItemProps) => (
  handler: HandlerRenderProp,
): ReactElement => (
  <div className={className.element('item')}>{renderType(props, handler)}</div>
);

export default render;
