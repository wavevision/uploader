import { UPLOADER_TYPE_BASIC, UPLOADER_TYPE_IMAGES } from './constants';

export type UploaderType =
  | typeof UPLOADER_TYPE_BASIC
  | typeof UPLOADER_TYPE_IMAGES;

interface UploaderBaseProps {
  url: string;
  type?: UploaderType;
}

export interface UploaderOptions extends UploaderBaseProps {
  root: HTMLElement;
}

export interface UploaderProps extends UploaderBaseProps {
  filesInput: HTMLInputElement;
  form: HTMLFormElement;
  jsonInput: HTMLInputElement;
}
