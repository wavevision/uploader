import React from 'react';
import { render } from 'react-dom';

import Uploader from './Uploader';
import { getInput } from './utils';
import { UPLOADER_TYPE_BASIC } from './constants';
import { UploaderOptions } from './types';

const init = (options: UploaderOptions): void => {
  const filesInput = getInput(options, 'file');
  const jsonInput = getInput(options, 'hidden');
  const { form } = filesInput || jsonInput;
  if (!form) {
    throw new Error('Uploader cannot be used outside an HTMLFormElement.');
  }
  render(
    <Uploader
      filesInput={filesInput}
      form={form}
      jsonInput={jsonInput}
      link={options.link}
      messages={options.messages || {}}
      renderers={options.renderers || {}}
      type={options.type || UPLOADER_TYPE_BASIC}
    />,
    options.root,
  );
};

export default { init };
