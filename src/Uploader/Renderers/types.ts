import { JsonFile } from '../JsonManager/types';
import { Message, RequiredMessages } from '../Messages/types';
import { HandlerRenderProp } from '../UploaderItem/Handler/types';

import {
  DELETE,
  DOWNLOAD,
  DROP_ZONE,
  ERROR,
  FILE,
  IMAGE,
  PROGRESS,
} from './constants';

export type RendererProps<T> = T & { messages: RequiredMessages };
export type RendererComponent<T> = import('react').FunctionComponent<T>;

export type DeleteProps = { onClick: () => void };
export type DeleteRendererProps = RendererProps<DeleteProps>;
export type DeleteRenderer = RendererComponent<DeleteRendererProps>;
export type DeleteDefaultRenderer = RendererComponent<DeleteProps>;

export type DownloadProps = { url: string };
export type DownloadRendererProps = RendererProps<DownloadProps>;
export type DownloadRenderer = RendererComponent<DownloadRendererProps>;
export type DownloadDefaultRenderer = RendererComponent<DownloadProps>;

export type DropZoneProps = { filesInput: HTMLInputElement };
export type DropZoneRendererProps = RendererProps<DropZoneProps>;
export type DropZoneRenderer = RendererComponent<
  DropZoneRendererProps & {
    dragged: boolean;
  }
>;
export type DropZoneDefaultRenderer = RendererComponent<DropZoneProps>;

export type ErrorProps = { message: Message };
export type ErrorRendererProps = RendererProps<ErrorProps>;
export type ErrorRenderer = RendererComponent<ErrorRendererProps>;
export type ErrorDefaultRenderer = RendererComponent<ErrorProps>;

export type FileProps = {
  error?: string;
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
  [DOWNLOAD]?: DownloadRenderer;
  [DROP_ZONE]?: DropZoneRenderer;
  [ERROR]?: ErrorRenderer;
  [FILE]?: FileRenderer;
  [IMAGE]?: FileRenderer;
  [PROGRESS]?: ProgressRenderer;
}
