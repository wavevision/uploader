import { DEFAULT_DATA } from '../JsonManager/constants';
import { INPUTS } from '../constants';

export const createRoot = (): HTMLDivElement => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  return root;
};

export const createInputs = (): HTMLDivElement => {
  const inputs = document.createElement('div');
  INPUTS.assign(inputs);
  const filesInput = document.createElement('input');
  filesInput.multiple = true;
  filesInput.name = 'files';
  filesInput.type = 'file';
  const jsonInput = document.createElement('input');
  jsonInput.name = 'json';
  jsonInput.type = 'hidden';
  jsonInput.value = JSON.stringify(DEFAULT_DATA);
  for (const input of [filesInput, jsonInput]) {
    inputs.appendChild(input);
  }
  return inputs;
};

export const createForm = (): HTMLFormElement => {
  const form = document.createElement('form');
  form.appendChild(createInputs());
  return form;
};

export const getUploaderElement = (baseElement: HTMLElement): HTMLDivElement =>
  baseElement.firstElementChild as HTMLDivElement;
