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

import { createForm, createRoot, getUploaderElement } from './utils';

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
      const uploader = getUploaderElement(baseElement);
      expect(uploader.childElementCount).toBe(1);
      expect(uploader).toHaveClass(
        'wavevision-uploader',
        'wavevision-uploader--basic',
      );
    });
  });
  describe('upload', () => {
    const triggerChange = (): void => {
      Object.defineProperty(filesInput, 'files', {
        value: [new File(['content'], 'test.txt', { type: 'text/plain' })],
        writable: true,
      });
      fireEvent.change(filesInput);
    };
    beforeEach(() => {
      xhrMock.setup();
    });
    afterEach(() => {
      xhrMock.teardown();
      jest.clearAllMocks();
    });
    describe('error', () => {
      it('handles request error', async () => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn);
        const { getByText } = renderUploader();
        await act(async () => {
          xhrMock.post('/upload', {
            status: 500,
            reason: 'Error: Some error',
          });
          triggerChange();
        });
        expect(getByText('Error: Some error')).toHaveClass(
          'wavevision-uploader__file-error',
        );
      });
    });
    describe('success', () => {
      it('adds file to upload and handles upload', async () => {
        const { baseElement } = renderUploader();
        const uploader = getUploaderElement(baseElement);
        await act(async () => {
          xhrMock.post('/upload', {
            status: 200,
            body: JSON.stringify({
              ...file,
              urls: { download: '/download', preview: '/preview' },
            }),
          });
          triggerChange();
        });
        expect(uploader.childElementCount).toBe(2);
      });
    });
  });
  describe('delete', () => {
    it('deletes uploaded file', () => {
      const data = DEFAULT_DATA;
      data.defaultFiles.push(file);
      jsonInput.value = JSON.stringify(data);
      const { baseElement, getByText } = renderUploader();
      const button = getByText(DEFAULT_MESSAGES[DELETE_FILE] as string);
      const uploader = getUploaderElement(baseElement);
      act(() => {
        Simulate.click(button);
      });
      expect(uploader.childElementCount).toBe(1);
    });
  });
});
