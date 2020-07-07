import { UPLOADER_TYPE_BASIC, UPLOADER_TYPE_IMAGES } from './constants';
import { JsonFile } from './JsonManager/types';
import { Messages } from './Messages/types';
import { Renderers } from './Renderers/types';

export type UploaderType =
  | typeof UPLOADER_TYPE_BASIC
  | typeof UPLOADER_TYPE_IMAGES;

interface UploaderBaseProps {
  link: {
    parameter?: string;
    url: string;
  };
  messages?: Messages;
  renderers?: Renderers;
  type?: UploaderType;
}

export interface UploaderFile extends JsonFile {
  source?: File | null;
}

export interface UploaderOptions extends UploaderBaseProps {
  root: HTMLElement;
}

export interface UploaderProps extends UploaderBaseProps {
  filesInput: HTMLInputElement;
  form: HTMLFormElement;
  jsonInput: HTMLInputElement;
  messages: Messages;
  onDelete?: (file: JsonFile) => void;
  onUpload?: (filesInput: HTMLInputElement) => FileList | File[];
  onUploaded?: (
    filesInput: HTMLInputElement,
    file: UploaderFile,
    response: JsonFile,
  ) => void;
  renderers: Renderers;
}

export type UploaderState = UploaderFile[];
