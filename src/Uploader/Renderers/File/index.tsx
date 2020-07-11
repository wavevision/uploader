import React, { memo, ReactElement, ReactNode } from 'react';
import isNil from '@wavevision/ts-utils/type/isNil';

import Delete from '../Delete';
import Progress from '../Progress';
import { className } from '../../utils';
import { useRenderer } from '../index';
import { FILE } from '../constants';
import { FileProps, FileRenderer } from '../types';

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
  <>
    {props.handler.uploading && !isNil(props.handler.progress) && (
      <Progress value={props.handler.progress} />
    )}
    <span className={className.element('file-name')}>{fileName(props)}</span>
    <Delete onClick={props.handler.delete} />
  </>
);

const File: FileRenderer = props => {
  const File = useRenderer(FILE);
  return (
    <div className={className.element('file')}>
      {File ? <File {...props} /> : renderDefault(props)}
    </div>
  );
};

export default memo<FileProps>(File);
