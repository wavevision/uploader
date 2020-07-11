export const createData = (file: File, parameter: string): FormData => {
  const data = new FormData();
  data.append(parameter, file);
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
