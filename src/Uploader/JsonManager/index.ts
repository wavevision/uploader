import { useRef } from 'react';

import { JsonData, JsonFile, JsonManager } from './types';
import { assertJsonInput } from './utils';

const findFile = (file: JsonFile, files: JsonFile[]): JsonFile | undefined =>
  files.find(f => f.id === file.id);

const filterFiles = (file: JsonFile, files: JsonFile[]): JsonFile[] =>
  files.filter(f => f.id !== file.id);

const create = (jsonInput: HTMLInputElement): JsonManager => {
  assertJsonInput(jsonInput);
  const getData: JsonManager['getData'] = () => JSON.parse(jsonInput.value);
  const getDefaultFiles: JsonManager['getDefaultFiles'] = () =>
    getData().defaultFiles;
  const getUploadedFiles: JsonManager['getUploadedFiles'] = () =>
    getData().uploadedFiles;
  const setData = (data: JsonData): JsonData => {
    jsonInput.value = JSON.stringify(data);
    return getData();
  };
  return {
    addUploadedFile: file => {
      const data = getData();
      data.uploadedFiles.push(file);
      return setData(data);
    },
    deleteFile: file => {
      const data = getData();
      const defaultFile = findFile(file, data.defaultFiles);
      const uploadedFile = findFile(file, data.uploadedFiles);
      if (defaultFile) {
        data.defaultFiles = filterFiles(defaultFile, data.defaultFiles);
        data.deletedFiles.push(defaultFile);
      }
      if (uploadedFile) {
        data.uploadedFiles = filterFiles(uploadedFile, data.uploadedFiles);
      }
      return setData(data);
    },
    getData,
    getDefaultFiles,
    getUploadedFiles,
    getValue: () => {
      const value = getDefaultFiles().concat(getUploadedFiles());
      return value.length > 0 ? value : null;
    },
  };
};

export const useJsonManager = (jsonInput: HTMLInputElement): JsonManager => {
  const { current } = useRef(create(jsonInput));
  return current;
};

export default { create };
