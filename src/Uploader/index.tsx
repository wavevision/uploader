import React from 'react';
import { render } from 'react-dom';

import Uploader from './Uploader';
import { getElement, getInput } from './utils';
import { INPUTS, ROOT, UPLOADER_TYPE_BASIC } from './constants';
import { UploaderOptions } from './types';

const init = (options: UploaderOptions): void => {
  const inputs = getElement(INPUTS, options);
  const filesInput = getInput('file', inputs);
  const jsonInput = getInput('hidden', inputs);
  const { form } = filesInput || jsonInput;
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
    getElement(ROOT, options),
  );
};

export default { init };
