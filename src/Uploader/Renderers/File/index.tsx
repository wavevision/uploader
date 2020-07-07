import React, { memo, ReactElement, ReactNode } from 'react';
import isNil from '@wavevision/ts-utils/type/isNil';

import Progress from '../Progress';
import { className } from '../../utils';
import { getRenderer } from '../index';
import { FILE } from '../constants';
import { FileProps, FileRenderer } from '../types';

const getDownloadLink = (props: FileProps): string | undefined => {
  if (props.urls) return props.urls.download;
};

const renderFilename = (props: FileProps): ReactNode => {
  const link = getDownloadLink(props);
  if (!props.isUploading && link) {
    return (
      <a className={className.element('file-download')} download href={link}>
        {props.name}
      </a>
    );
  }
  return props.name;
};

const render = (props: FileProps): ReactElement => (
  <>
    {props.isUploading && !isNil(props.uploadProgress) && (
      <Progress value={props.uploadProgress} />
    )}
    <span className={className.element('file-name')}>
      {renderFilename(props)}
    </span>
  </>
);

const File: FileRenderer = props => {
  const File = getRenderer(FILE);
  return (
    <div className={className.element('file')}>
      {File ? <File {...props} /> : render(props)}
    </div>
  );
};

export default memo<FileProps>(File);
