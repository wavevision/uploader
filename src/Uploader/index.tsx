import React from 'react';
import { render } from 'react-dom';

import Uploader from './Uploader';
import { getElement, getInput } from './utils';
import { INPUTS, ROOT } from './constants';
import { UploaderOptions } from './types';

const renderUploader = (
  props: Omit<UploaderOptions, 'root'>,
  root: Element,
): void => {
  const inputs = getElement(INPUTS, root);
  const filesInput = getInput('file', inputs);
  const jsonInput = getInput('hidden', inputs);
  const { form } = filesInput || jsonInput;
  render(
    <Uploader
      {...props}
      filesInput={filesInput}
      form={form}
      jsonInput={jsonInput}
    />,
    getElement(ROOT, root),
  );
};

const init = (options: UploaderOptions): void => {
  const { root, ...props } = options;
  if (root instanceof HTMLCollection || root instanceof NodeList) {
    for (const element of root) {
      renderUploader(props, element);
    }
  } else if (root instanceof Element) {
    renderUploader(props, root);
  } else {
    throw new Error(
      `Invalid uploader option 'root', expected Element|HTMLCollection|NodeList, '${typeof root}' provided.`,
    );
  }
};

const WavevisionUploader = { init };

export { Uploader };
export default WavevisionUploader;
