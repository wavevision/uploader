import { JsonFile } from '../JsonManager/types';
import { Message } from '../Messages/types';

import { DELETE, DROP_ZONE, FILE, PROGRESS } from './constants';

type Renderer<T> = import('react').FunctionComponent<T>;

export type DeleteProps = { onClick: () => void };
export type DeleteRenderer = Renderer<DeleteProps & { message: Message }>;

export type DropZoneProps = { filesInput: HTMLInputElement };
export type DropZoneRenderer = Renderer<
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
export type FileRenderer = Renderer<FileProps>;

export type ProgressProps = { value: number };
export type ProgressRenderer = Renderer<ProgressProps>;

export interface Renderers {
  [DELETE]?: DeleteRenderer;
  [DROP_ZONE]?: DropZoneRenderer;
  [FILE]?: FileRenderer;
  [PROGRESS]?: ProgressRenderer;
}
