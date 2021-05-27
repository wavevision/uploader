import { UploaderItemProps } from '../types';

import { DEFAULT_LINK_PARAMETER, INDEX } from './constants';

export const createData = (file: File, props: UploaderItemProps): FormData => {
  const data = new FormData();
  data.append(props.link.parameter || DEFAULT_LINK_PARAMETER, file);
  data.append(INDEX, String(props.index));
  return data;
};

export const createRequest = (
  url: string,
  addListeners: (xhr: XMLHttpRequest) => void,
): XMLHttpRequest => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  addListeners(xhr);
  xhr.open('POST', url, true);
  return xhr;
};

export const eventRequest = (e: ProgressEvent): XMLHttpRequest =>
  e.currentTarget as XMLHttpRequest;
