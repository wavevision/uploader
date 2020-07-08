import React from 'react';
import xhrMock from 'xhr-mock';
import { Simulate } from 'react-dom/test-utils';
import { act, fireEvent, render } from '@testing-library/react';

import Uploader from '../Uploader';
import { UPLOADER_TYPE_BASIC } from '../constants';
import { JsonFile } from '../JsonManager/types';
import { DEFAULT_DATA } from '../JsonManager/constants';
import { DELETE_FILE } from '../Messages/constants';
import { DEFAULT_MESSAGES } from '../Messages';

import { createForm, createRoot } from './utils';

const file: JsonFile = {
  contentType: 'text/plain',
  id: 'test',
  originalName: 'test.txt',
  size: 1,
  uploadedAt: new Date().toISOString(),
};

describe('Uploader/Uploader', () => {
  const root = createRoot();
  const form = createForm();
  const filesInput = form.elements.namedItem('files') as HTMLInputElement;
  const jsonInput = form.elements.namedItem('json') as HTMLInputElement;
  const renderUploader = () =>
    render(
      <Uploader
        filesInput={filesInput}
        form={form}
        jsonInput={jsonInput}
        messages={{}}
        renderers={{}}
        link={{ url: '/upload' }}
        type={UPLOADER_TYPE_BASIC}
      />,
      { container: root },
    );
  beforeEach(() => {
    jsonInput.value = '';
    root.innerHTML = '';
    root.appendChild(form);
  });
  describe('render', () => {
    it('renders uploader component', () => {
      const { baseElement } = renderUploader();
      const uploader = baseElement.firstElementChild as HTMLDivElement;
      expect(uploader.childElementCount).toBe(1);
      expect(uploader).toHaveClass(
        'wavevision-uploader',
        'wavevision-uploader--basic',
      );
    });
  });
  describe('upload', () => {
    beforeEach(() => {
      xhrMock.setup();
    });
    afterEach(() => xhrMock.teardown());
    it('adds file to upload and handles upload', async () => {
      const { baseElement } = renderUploader();
      const uploader = baseElement.firstElementChild as HTMLDivElement;
      await act(async () => {
        xhrMock.post('/upload', (request, response) =>
          response.status(200).body(
            JSON.stringify({
              ...file,
              urls: { download: '/download', preview: '/preview' },
            }),
          ),
        );
        Object.defineProperty(filesInput, 'files', {
          value: [new File(['content'], 'test.txt', { type: 'text/plain' })],
        });
        fireEvent.change(filesInput);
      });
      expect(uploader.childElementCount).toBe(2);
    });
  });
  describe('delete', () => {
    it('deletes uploaded file', () => {
      const data = DEFAULT_DATA;
      data.defaultFiles.push(file);
      jsonInput.value = JSON.stringify(data);
      const { baseElement, getByText } = renderUploader();
      const button = getByText(DEFAULT_MESSAGES[DELETE_FILE] as string);
      const uploader = baseElement.firstElementChild as HTMLDivElement;
      act(() => {
        Simulate.click(button);
      });
      expect(uploader.childElementCount).toBe(1);
    });
  });
});
