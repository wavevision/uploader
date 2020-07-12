import React, { ReactNode } from 'react';
import getElementById from '@wavevision/ts-utils/dom/getElementById';
import xhrMock, { delay } from 'xhr-mock';

import Uploader from '../Uploader';
import { DEFAULT_LINK_PARAMETER } from '../UploaderItem/Handler/constants';
import { UPLOADER_TYPE_BASIC, UPLOADER_TYPE_IMAGES } from '../constants';
import { JsonFile } from '../JsonManager/types';
import { UploaderType } from '../types';

let id = 1;

const makeFile = (file: File): JsonFile => {
  id++;
  return {
    id: String(id),
    originalName: file.name,
    contentType: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    urls: {
      download: 'http://satyr.io/800x800',
      preview: id % 2 === 0 ? 'http://satyr.io/160x160' : undefined,
    },
  };
};

const renderUploader = (type: UploaderType): ReactNode => {
  const xhr = xhrMock.setup();
  xhr.post('/upload', async (request, response) => {
    const data: FormData = request.body();
    const file = makeFile(data.get(DEFAULT_LINK_PARAMETER) as File);
    const mockResponse =
      id % 3 === 0
        ? { status: 500, reason: 'Error: File too large' }
        : {
            status: 200,
            body: JSON.stringify(file),
          };
    const mock = await delay(mockResponse);
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
      type={type}
      link={{ url: '/upload' }}
    />
  );
};

export const basic = (): ReactNode => renderUploader(UPLOADER_TYPE_BASIC);
export const images = (): ReactNode => renderUploader(UPLOADER_TYPE_IMAGES);

export default {
  component: Uploader,
  title: 'Wavevision Uploader',
};
