import { ReactElement, memo, useEffect, useState } from 'react';

import { createData, createRequest } from '../utils';
import { JsonFile } from '../JsonManager/types';

import { DEFAULT_LINK_PARAMETER } from './constants';
import { HandlerProps } from './types';

const deleteFile = (props: HandlerProps): void => props.onDelete(props.file);
const handleDeleteFile = (props: HandlerProps) => () => deleteFile(props);

const Handler = (props: HandlerProps): ReactElement => {
  const { source, uploadedAt } = props.file;
  if (!source || uploadedAt) {
    return props.children({ delete: handleDeleteFile(props) });
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
  useEffect(() => {
    if (!uploading) {
      const xhr = createRequest(props.link.url, xhr => {
        xhr.addEventListener('load', handleResponse);
        xhr.upload.addEventListener('progress', handleProgress);
      });
      setXhr(xhr);
      setUploading(true);
      props.onUpload();
      xhr.send(
        createData(source, props.link.parameter || DEFAULT_LINK_PARAMETER),
      );
    }
  }, []);
  return props.children({
    delete: handleDelete,
    progress,
    uploading,
  });
};

export default memo<HandlerProps>(Handler);
