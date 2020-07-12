import React, { memo, useEffect, useState, ReactNode } from 'react';

import DropZone from './Renderers/DropZone';
import Messages, { createMessages } from './Messages';
import Renderers from './Renderers';
import UploaderItem from './UploaderItem';
import {
  handleOnDelete,
  handleOnError,
  handleOnUpload,
  handleOnUploaded,
} from './handlers';
import { useJsonManager } from './JsonManager';
import {
  className,
  toggleSubmitButtons,
  transformFiles,
  updateUploaderFile,
} from './utils';
import { JsonFile } from './JsonManager/types';
import {
  UploaderFunctionComponent,
  UploaderDefaultProps,
  UploaderFile,
  UploaderProps,
  UploaderState,
} from './types';
import { UPLOADER_TYPE_BASIC } from './constants';
import './styles';

const renderDropZone = (
  files: UploaderState,
  props: UploaderProps,
): ReactNode => {
  if (props.filesInput.multiple || files.length === 0) {
    return <DropZone filesInput={props.filesInput} />;
  }
  return null;
};

const UploaderComponent: UploaderFunctionComponent<
  UploaderProps & Readonly<UploaderDefaultProps>
> = props => {
  const jsonManager = useJsonManager(props.jsonInput);
  const [files, setFiles] = useState<UploaderState>(
    jsonManager.getValue() || [],
  );
  const handleChange = (): void => {
    const files = handleOnUpload(props);
    if (files.length) {
      setFiles(current =>
        current.concat(transformFiles(files, props.filesInput.multiple)),
      );
      props.filesInput.value = '';
    }
  };
  const handleDelete = (file: JsonFile): void => {
    setFiles(files => files.filter(f => f.id !== file.id));
    if (file.uploadedAt) jsonManager.deleteFile(file);
    handleOnDelete(props, file);
  };
  const handleError = (file: JsonFile, status: number, text: string): void => {
    setFiles(updateUploaderFile(file, { error: text }));
    handleOnError(props, file, status, text);
  };
  const handleUpload = (): void => toggleSubmitButtons(props, true);
  const handleUploaded = (file: UploaderFile, response: JsonFile): void => {
    setFiles(files =>
      updateUploaderFile(file, { ...response, source: null })(files),
    );
    jsonManager.addUploadedFile(response);
    toggleSubmitButtons(props, false);
    handleOnUploaded(props, file, response);
  };
  const onUnmount = (): void =>
    props.filesInput.removeEventListener('change', handleChange);
  const onMount = (): typeof onUnmount => {
    props.filesInput.addEventListener('change', handleChange);
    return onUnmount;
  };
  useEffect(onMount, []);
  return (
    <Messages.Provider value={createMessages(props.messages)}>
      <Renderers.Provider value={props.renderers}>
        <div
          className={className.block(props.type, files.length ? null : 'empty')}
        >
          {files.map(file => (
            <UploaderItem
              key={file.id}
              file={file}
              link={props.link}
              onDelete={handleDelete}
              onError={handleError}
              onUpload={handleUpload}
              onUploaded={handleUploaded}
              uploaderType={props.type}
            />
          ))}
          {renderDropZone(files, props)}
        </div>
      </Renderers.Provider>
    </Messages.Provider>
  );
};

UploaderComponent.defaultProps = {
  messages: {},
  renderers: {},
  type: UPLOADER_TYPE_BASIC,
};

const Uploader = memo(
  UploaderComponent as UploaderFunctionComponent<UploaderProps>,
);

export default Uploader;
