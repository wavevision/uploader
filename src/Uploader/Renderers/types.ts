import { JsonFile } from '../JsonManager/types';
import { Message } from '../Messages/types';
import { HandlerRenderProp } from '../UploaderItem/Handler/types';

import { DELETE, DROP_ZONE, FILE, PROGRESS } from './constants';

export type Renderer<T> = import('react').FunctionComponent<T>;

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
  file: JsonFile;
  handler: HandlerRenderProp;
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
