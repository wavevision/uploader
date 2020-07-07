import cn from '@wavevision/class-name';
import getElementBySelector from '@wavevision/ts-utils/dom/getElementBySelector';
import getElementsBySelector from '@wavevision/ts-utils/dom/getElementsBySelector';
import random from '@wavevision/ts-utils/strings/random';

import {
  UploaderFile,
  UploaderOptions,
  UploaderProps,
  UploaderState,
} from './types';

export const className = cn('wavevision-uploader')();

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

export const getInput = (
  { root }: UploaderOptions,
  type: string,
): HTMLInputElement => {
  const selector = `input[type="${type}"]`;
  const input = getElementBySelector<HTMLInputElement>(selector, root);
  if (!input) throw new Error(`Uploader root must contain ${selector}.`);
  return input;
};

export const toggleSubmitButtons = (
  props: UploaderProps,
  disabled: boolean,
): void => {
  for (const button of getElementsBySelector<HTMLButtonElement>(
    '[type="submit"]',
  )) {
    button.disabled = disabled;
  }
};

export const transformFiles = (
  files: File[],
  multiple: boolean,
): UploaderState => {
  const uploaderState: UploaderState = [];
  for (const file of files) {
    uploaderState.push({
      contentType: file.type,
      id: `file__${Date.now()}__${random(10)}`,
      originalName: file.name,
      size: file.size,
      source: file,
    });
    if (!multiple) break;
  }
  return uploaderState;
};

export const updateUploadFile = (
  file: UploaderFile,
  data: Partial<UploaderFile>,
): ((state: UploaderState) => UploaderState) => state =>
  state.map(f => {
    if (f.id === file.id) {
      f = {
        ...f,
        ...data,
        urls: {
          ...(data.urls || f.urls),
        },
      };
    }
    return f;
  });
