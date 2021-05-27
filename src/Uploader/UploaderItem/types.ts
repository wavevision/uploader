import { JsonFile } from '../JsonManager/types';
import { UploaderFile, UploaderProps, UploaderType } from '../types';

export interface UploaderItemProps {
  file: UploaderFile;
  index: number;
  link: UploaderProps['link'];
  onError: (file: UploaderFile, status: number, text: string) => void;
  onDelete: (file: JsonFile) => void;
  onUpload: () => void;
  onUploaded: (file: UploaderFile, response: JsonFile) => void;
  uploaderType: UploaderType;
}
