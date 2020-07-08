import React, { ReactNode } from 'react';
import getElementById from '@wavevision/ts-utils/dom/getElementById';
import random from '@wavevision/ts-utils/strings/random';
import xhrMock, { delay } from 'xhr-mock';

import { UploaderComponent as Uploader } from '..';
import { DEFAULT_LINK_PARAMETER } from '../Uploader/UploaderItem/constants';
import { UPLOADER_TYPE_BASIC } from '../Uploader/constants';
import { JsonFile } from '../Uploader/JsonManager/types';
import { UploaderType } from '../Uploader/types';

const makeFile = (file: File): JsonFile => {
  const id = random(6);
  return {
    id,
    originalName: file.name,
    contentType: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    urls: {
      download: 'http://satyr.io/600x600',
      preview: 'http://satyr.io/300x300',
    },
  };
};

const renderUploader = (
  type: UploaderType = UPLOADER_TYPE_BASIC,
): ReactNode => {
  const xhr = xhrMock.setup();
  xhr.post('/upload', async (request, response) => {
    const data: FormData = request.body();
    const mock = await delay(
      {
        body: JSON.stringify(
          makeFile(data.get(DEFAULT_LINK_PARAMETER) as File),
        ),
        status: 200,
      },
      1000,
    );
    return mock(request, response);
  });
  const form = getElementById('form') as HTMLFormElement;
  const filesInput = form.elements.namedItem('files') as HTMLInputElement;
  const jsonInput = form.elements.namedItem('json') as HTMLInputElement;
  return (
    <Uploader
      filesInput={filesInput}
      form={form}
      jsonInput={jsonInput}
      messages={{}}
      renderers={{}}
      type={type}
      link={{ url: '/upload' }}
    />
  );
};

export const basic = (): ReactNode => renderUploader();

export default {
  component: Uploader,
  title: 'Wavevision Uploader',
};
