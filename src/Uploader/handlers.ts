import { UploaderFile, UploaderProps } from './types';
import { JsonFile } from './JsonManager/types';

const assert = (callback: unknown): callback is Function =>
  typeof callback === 'function';

export const handleOnDelete = (props: UploaderProps, file: JsonFile): void => {
  if (assert(props.onDelete)) props.onDelete(file);
};

export const handleOnUpload = (props: UploaderProps): FileList | null => {
  if (assert(props.onUpload)) return props.onUpload(props.filesInput);
  return props.filesInput.files;
};

export const handleOnUploaded = (
  props: UploaderProps,
  file: UploaderFile,
  response: JsonFile,
): void => {
  if (assert(props.onUploaded)) {
    props.onUploaded(props.filesInput, file, response);
  }
};
