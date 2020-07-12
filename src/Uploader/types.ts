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
  error?: string;
  source?: File | null;
}

export interface UploaderOptions extends UploaderBaseProps {
  root: Element | HTMLCollectionOf<Element> | NodeListOf<Element>;
}

export type UploaderErrorEvent = {
  file: JsonFile;
  filesInput: HTMLInputElement;
  error: {
    status: number;
    text: string;
  };
};

export type UploaderDeleteEvent = {
  file: JsonFile;
};

export type UploaderUploadEvent = {
  filesInput: HTMLInputElement;
};

export type UploaderUploadedEvent = {
  file: UploaderFile;
  filesInput: HTMLInputElement;
  response: JsonFile;
};

export interface UploaderProps extends UploaderBaseProps {
  filesInput: HTMLInputElement;
  form: HTMLFormElement | null;
  jsonInput: HTMLInputElement;
  onError?: (e: UploaderErrorEvent) => void;
  onDelete?: (e: UploaderDeleteEvent) => void;
  onUpload?: (e: UploaderUploadEvent) => FileList | File[] | undefined;
  onUploaded?: (e: UploaderUploadedEvent) => void;
}

export type UploaderDefaultProps = Pick<
  Required<UploaderProps>,
  'messages' | 'renderers' | 'type'
>;

export type UploaderState = UploaderFile[];

export type UploaderFunctionComponent<P> = import('react').FunctionComponent<P>;
