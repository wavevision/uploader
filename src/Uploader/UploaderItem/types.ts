import { JsonFile } from '../JsonManager/types';
import { UploaderFile, UploaderProps, UploaderType } from '../types';

export interface UploaderItemProps {
  file: UploaderFile;
  link: UploaderProps['link'];
  onDelete: (file: JsonFile) => void;
  onUpload: () => void;
  onUploaded: (file: UploaderFile, response: JsonFile) => void;
  uploaderType: UploaderType;
}

export type HandlerRenderProp = {
  delete: () => void;
  progress?: number;
  uploading?: boolean;
};

export interface HandlerProps extends UploaderItemProps {
  children: (handler: HandlerRenderProp) => import('react').ReactElement;
}
