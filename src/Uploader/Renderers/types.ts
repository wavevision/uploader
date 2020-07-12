import { JsonFile } from '../JsonManager/types';
import { RequiredMessages } from '../Messages/types';
import { HandlerRenderProp } from '../UploaderItem/Handler/types';

import { DELETE, DROP_ZONE, FILE, PROGRESS } from './constants';

export type RendererProps<T> = T & { messages: RequiredMessages };
export type RendererComponent<T> = import('react').FunctionComponent<T>;

export type DeleteProps = { onClick: () => void };
export type DeleteRendererProps = RendererProps<DeleteProps>;
export type DeleteRenderer = RendererComponent<DeleteRendererProps>;
export type DeleteDefaultRenderer = RendererComponent<DeleteProps>;

export type DropZoneProps = { filesInput: HTMLInputElement };
export type DropZoneRendererProps = RendererProps<DropZoneProps>;
export type DropZoneRenderer = RendererComponent<
  DropZoneRendererProps & {
    dragged: boolean;
  }
>;
export type DropZoneDefaultRenderer = RendererComponent<DropZoneProps>;

export type FileProps = {
  file: JsonFile;
  handler: HandlerRenderProp;
};
export type FileRendererProps = RendererProps<FileProps>;
export type FileRenderer = RendererComponent<FileRendererProps>;
export type FileDefaultRenderer = RendererComponent<FileProps>;

export type ProgressProps = { value: number };
export type ProgressRendererProps = RendererProps<ProgressProps>;
export type ProgressRenderer = RendererComponent<ProgressRendererProps>;
export type ProgressDefaultRenderer = RendererComponent<ProgressProps>;

export interface Renderers {
  [DELETE]?: DeleteRenderer;
  [DROP_ZONE]?: DropZoneRenderer;
  [FILE]?: FileRenderer;
  [PROGRESS]?: ProgressRenderer;
}
