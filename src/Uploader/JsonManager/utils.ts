import { DEFAULT_DATA } from './constants';
import { JsonData, JsonFile } from './types';

export const findFile = (
  file: JsonFile,
  files: JsonFile[],
): JsonFile | undefined => files.find(f => f.id === file.id);

export const filterFiles = (file: JsonFile, files: JsonFile[]): JsonFile[] =>
  files.filter(f => f.id !== file.id);

export const encodeJsonInput = (
  jsonInput: HTMLInputElement,
  data: JsonData,
): void => {
  jsonInput.value = JSON.stringify(data);
};

export const parseJsonInput = (jsonInput: HTMLInputElement): JsonData =>
  JSON.parse(jsonInput.value);

export const assertJsonInput = (jsonInput: HTMLInputElement): void => {
  if (jsonInput.value === '') {
    encodeJsonInput(jsonInput, DEFAULT_DATA);
  } else {
    const data = parseJsonInput(jsonInput);
    for (const property of Object.keys(DEFAULT_DATA)) {
      if (!(property in data)) {
        throw new Error(
          `Invalid uploader JSON input data, missing '${property}' property.`,
        );
      }
    }
    for (const item of Object.values(data)) {
      if (!Array.isArray(item)) {
        throw new Error(
          'Invalid uploader JSON input data, each value must be an array.',
        );
      }
    }
  }
};
