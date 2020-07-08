import { DEFAULT_DATA } from './constants';
import { JsonData } from './types';

export const assertJsonInput = (jsonInput: HTMLInputElement): void => {
  if (jsonInput.value === '') jsonInput.value = JSON.stringify(DEFAULT_DATA);
  const data: JsonData = JSON.parse(jsonInput.value);
  for (const property of Object.keys(DEFAULT_DATA)) {
    if (!(property in data)) {
      throw new Error(
        `Invalid JSON input data, missing '${property}' property.`,
      );
    }
  }
  for (const item of Object.values(data)) {
    if (!Array.isArray(item)) {
      throw new Error('Invalid JSON input data, each value must be an array.');
    }
  }
};
