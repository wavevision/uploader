import getElementBySelector from '@wavevision/ts-utils/dom/getElementBySelector';

import { UploaderOptions } from './types';

export const getInput = (
  { root }: UploaderOptions,
  type: string,
): HTMLInputElement => {
  const selector = `input[type="${type}"]`;
  const input = getElementBySelector<HTMLInputElement>(selector, root);
  if (!input) throw new Error(`Uploader root must contain ${selector}.`);
  return input;
};
