import Uploader from '..';

import { createInputs, createRoot } from './utils';

describe('Uploader/index', () => {
  const root = createRoot();
  const init = () => Uploader.init({ link: { url: '' }, root });
  beforeEach(() => {
    root.innerHTML = '';
  });
  describe('init', () => {
    describe('empty root', () => {
      it('creates inputs and mounts uploader', () => {
        init();
        expect(root.childElementCount).toBe(2);
      });
    });
    describe('root with existing inputs', () => {
      it('uses inputs and mounts uploader', () => {
        root.appendChild(createInputs());
        init();
        expect(root.childElementCount).toBe(2);
      });
    });
  });
});
