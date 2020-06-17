import React from 'react';
import { render } from 'react-dom';

import { getInput } from './utils';
import { UploaderOptions } from './types';

const init = (options: UploaderOptions): void => {
  const filesInput = getInput(options, 'file');
  const jsonInput = getInput(options, 'hidden');
  const { form } = filesInput || jsonInput;
  if (!form) throw new Error('Uploader cannot be used outside a form.');
  render(<div />, options.root);
};

const Uploader = {
  init,
};

export default Uploader;
