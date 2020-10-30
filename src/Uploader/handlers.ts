import { UploaderFile, UploaderProps } from './types';
import { JsonFile } from './JsonManager/types';

// eslint-disable-next-line @typescript-eslint/ban-types
const assert = (callback: unknown): callback is Function =>
  typeof callback === 'function';

export const handleOnDelete = (props: UploaderProps, file: JsonFile): void => {
  if (assert(props.onDelete)) props.onDelete({ file });
};

export const handleOnError = (
  props: UploaderProps,
  file: UploaderFile,
  status: number,
  text: string,
): void => {
  // eslint-disable-next-line no-console
  console.error(text, { file, status });
  if (assert(props.onError)) {
    props.onError({
      file,
      filesInput: props.filesInput,
      error: { status, text },
    });
  }
};

export const handleOnUpload = (props: UploaderProps): File[] => {
  if (assert(props.onUpload)) {
    const files = props.onUpload({ filesInput: props.filesInput }) || [];
    return files instanceof FileList ? Array.from(files) : files;
  }
  return props.filesInput.files ? Array.from(props.filesInput.files) : [];
};

export const handleOnUploaded = (
  props: UploaderProps,
  file: UploaderFile,
  response: JsonFile,
): void => {
  if (assert(props.onUploaded)) {
    props.onUploaded({ file, filesInput: props.filesInput, response });
  }
};
