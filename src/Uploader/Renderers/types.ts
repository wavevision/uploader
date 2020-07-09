import { JsonFile } from '../JsonManager/types';
import { Message } from '../Messages/types';

import { DELETE, DROP_ZONE, FILE, PROGRESS } from './constants';

type FunctionComponent<T> = import('react').FunctionComponent<T>;

export type DeleteProps = { onClick: () => void };
export type DeleteRenderer = FunctionComponent<
  DeleteProps & { message: Message }
>;

export type DropZoneProps = { filesInput: HTMLInputElement };
export type DropZoneRenderer = FunctionComponent<
  DropZoneProps & {
    dragged: boolean;
    singleFileMessage: Message;
    multipleFilesMessage: Message;
  }
>;

export type FileProps = {
  id: JsonFile['id'];
  isUploading?: boolean;
  name: JsonFile['originalName'];
  uploadProgress?: number;
  urls: JsonFile['urls'];
};
export type FileRenderer = FunctionComponent<FileProps>;

export type ProgressProps = { value: number };
export type ProgressRenderer = FunctionComponent<ProgressProps>;

export interface Renderers {
  [DELETE]?: DeleteRenderer;
  [DROP_ZONE]?: DropZoneRenderer;
  [FILE]?: FileRenderer;
  [PROGRESS]?: ProgressRenderer;
}
