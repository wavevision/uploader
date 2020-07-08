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

export const getElement = (
  attribute: import('@wavevision/ts-utils').DataAttribute,
  { root }: UploaderOptions,
): HTMLElement => {
  let element = getElementBySelector(`[${attribute.asString()}]`, root);
  if (!element) {
    element = document.createElement('div');
    attribute.assign(element);
    root.appendChild(element);
  }
  return element;
};

export const getInput = (
  type: string,
  container: HTMLElement,
): HTMLInputElement => {
  const selector = `input[type="${type}"]`;
  let input = getElementBySelector<HTMLInputElement>(selector, container);
  if (!input) {
    input = document.createElement('input');
    input.multiple = true;
    input.type = type;
    container.appendChild(input);
  }
  return input;
};

export const toggleSubmitButtons = (
  props: UploaderProps,
  disabled: boolean,
): void => {
  if (props.form) {
    const buttons = getElementsBySelector<HTMLButtonElement>(
      '[type="submit"]',
      props.form,
    );
    for (const button of buttons) {
      button.disabled = disabled;
    }
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

export const updateUploaderFile = (
  file: UploaderFile,
  data: Partial<UploaderFile>,
): ((state: UploaderState) => UploaderState) => state =>
  state.map(f => {
    if (f.id === file.id) {
      f = {
        ...f,
        ...data,
        urls: {
          ...(data.urls || f.urls || {}),
        },
      };
    }
    return f;
  });
