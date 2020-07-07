import React, { memo, FunctionComponent } from 'react';

import Delete from '../Renderers/Delete';
import File from '../Renderers/File';
import { className } from '../utils';

import Handler from './Handler';
import { UploaderItemProps } from './types';

const UploaderItem: FunctionComponent<UploaderItemProps> = props => {
  return (
    <Handler {...props}>
      {handler => (
        <div className={className.element('item')}>
          <File
            id={props.file.id}
            isUploading={handler.uploading}
            name={props.file.originalName}
            uploadProgress={handler.progress}
            urls={props.file.urls}
          />
          <Delete onClick={handler.delete} />
        </div>
      )}
    </Handler>
  );
};

export default memo<UploaderItemProps>(UploaderItem);
