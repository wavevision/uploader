import Uploader from '..';
import { DEFAULT_DATA } from '../JsonManager/constants';
import { INPUTS } from '../constants';

describe('Uploader/index', () => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  beforeEach(() => {
    root.innerHTML = '';
  });
  describe('init', () => {
    describe('empty root', () => {
      it('creates inputs and mounts uploader', () => {
        Uploader.init({ link: { url: '' }, root });
        expect(root.childElementCount).toBe(2);
      });
    });
    describe('root with existing inputs', () => {
      it('uses inputs and mounts uploader', () => {
        const filesInput = document.createElement('input');
        const jsonInput = document.createElement('input');
        const inputs = document.createElement('div');
        filesInput.type = 'file';
        jsonInput.type = 'hidden';
        jsonInput.value = JSON.stringify(DEFAULT_DATA);
        INPUTS.assign(inputs);
        for (const input of [filesInput, jsonInput]) {
          inputs.appendChild(input);
        }
        root.appendChild(inputs);
        Uploader.init({ link: { url: '' }, root });
        expect(root.childElementCount).toBe(2);
      });
    });
  });
});
