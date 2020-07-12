import { ReactElement, memo, useEffect, useState } from 'react';

import { JsonFile } from '../../JsonManager/types';
import { UploaderItemProps } from '../types';

import { createData, createRequest } from './utils';
import { DEFAULT_LINK_PARAMETER } from './constants';
import { HandlerProps } from './types';

type Props = HandlerProps & UploaderItemProps;

const deleteFile = (props: Props): void => props.onDelete(props.file);

const Handler = (props: Props): ReactElement => {
  const { source, uploadedAt } = props.file;
  if (!source || uploadedAt) {
    return props.children({ delete: () => deleteFile(props) });
  }
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [xhr, setXhr] = useState<XMLHttpRequest | null>(null);
  const handleDelete = (): void => {
    if (xhr) xhr.abort();
    deleteFile(props);
  };
  const handleResponse = (e: ProgressEvent): void => {
    const request = e.currentTarget as XMLHttpRequest;
    const response = request.response as JsonFile;
    props.onUploaded(props.file, response);
  };
  const handleProgress = (e: ProgressEvent): void => {
    if (e.lengthComputable) setProgress((e.loaded / e.total) * 100);
  };
  const onMount = (): void => {
    if (!uploading) {
      const xhr = createRequest(props.link.url, xhr => {
        xhr.addEventListener('load', handleResponse);
        xhr.upload.addEventListener('progress', handleProgress);
      });
      setXhr(xhr);
      props.onUpload();
      xhr.send(
        createData(source, props.link.parameter || DEFAULT_LINK_PARAMETER),
      );
      setUploading(true);
    }
  };
  useEffect(onMount, []);
  return props.children({
    delete: handleDelete,
    progress,
    uploading,
  });
};

export default memo(Handler);
