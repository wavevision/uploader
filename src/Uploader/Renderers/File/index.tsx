import React, { memo, ReactElement, ReactNode } from 'react';
import isNil from '@wavevision/ts-utils/type/isNil';

import Progress from '../Progress';
import { className } from '../../utils';
import { useRenderer } from '../index';
import { FILE } from '../constants';
import { FileProps, FileRenderer } from '../types';

const downloadLink = (props: FileProps): string | undefined => {
  if (props.urls) return props.urls.download;
};

const fileName = (props: FileProps): ReactNode => {
  const link = downloadLink(props);
  if (!props.isUploading && link) {
    return (
      <a className={className.element('file-download')} download href={link}>
        {props.name}
      </a>
    );
  }
  return props.name;
};

const renderDefault = (props: FileProps): ReactElement => (
  <>
    {props.isUploading && !isNil(props.uploadProgress) && (
      <Progress value={props.uploadProgress} />
    )}
    <span className={className.element('file-name')}>{fileName(props)}</span>
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
