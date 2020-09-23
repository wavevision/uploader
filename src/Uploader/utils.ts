import cn from '@wavevision/class-name';
import getElementBySelector from '@wavevision/ts-utils/dom/getElementBySelector';
import getElementsBySelector from '@wavevision/ts-utils/dom/getElementsBySelector';
import random from '@wavevision/ts-utils/strings/random';

import { UploaderFile, UploaderProps, UploaderState } from './types';

export const className = cn('wavevision-uploader')();

export const getElement = (
  attribute: import('@wavevision/ts-utils').DataAttribute,
  root: Element,
): Element => {
  let element = getElementBySelector(
    `[${attribute.asString()}]`,
    root as HTMLElement,
  );
  if (!element) {
    element = document.createElement('div');
    attribute.assign(element);
    root.appendChild(element);
  }
  return element;
};

export const getInput = (
  type: string,
  container: Element,
): HTMLInputElement => {
  const selector = `input[type="${type}"]`;
  let input = getElementBySelector<HTMLInputElement>(
    selector,
    container as HTMLElement,
  );
  if (!input) {
    input = document.createElement('input');
    input.multiple = type === 'file';
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

export const transformFiles = (files: File[], multiple: boolean) => (
  state: UploaderState,
): UploaderState => {
  const update: UploaderState = [];
  for (const file of files) {
    update.push({
      contentType: file.type,
      id: `file__${Date.now()}__${random(10)}`,
      originalName: file.name,
      size: file.size,
      source: file,
    });
    if (!multiple) break;
  }
  return state.concat(update);
};

export const updateUploaderFile = (
  file: UploaderFile,
  data: Partial<UploaderFile>,
) => (state: UploaderState): UploaderState =>
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
