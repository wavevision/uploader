import { useRef } from 'react';

import { JsonData, JsonManager } from './types';
import {
  assertJsonInput,
  encodeJsonInput,
  filterFiles,
  findFile,
  parseJsonInput,
} from './utils';

const create = (jsonInput: HTMLInputElement): JsonManager => {
  assertJsonInput(jsonInput);
  const getData: JsonManager['getData'] = () => parseJsonInput(jsonInput);
  const getDefaultFiles: JsonManager['getDefaultFiles'] = () =>
    getData().defaultFiles;
  const getUploadedFiles: JsonManager['getUploadedFiles'] = () =>
    getData().uploadedFiles;
  const setData = (data: JsonData): JsonData => {
    encodeJsonInput(jsonInput, data);
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
