import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import JsonManager from './JsonManager';
import Messages, { setMessages } from './Messages';
import Renderers from './Renderers';
import UploaderItem from './UploaderItem';
import { handleOnDelete, handleOnUpload, handleOnUploaded } from './handlers';
import {
  className,
  toggleSubmitButtons,
  transformFiles,
  updateUploadFile,
} from './utils';
import { JsonFile } from './JsonManager/types';
import { UploaderFile, UploaderProps, UploaderState } from './types';

const Uploader: FunctionComponent<UploaderProps> = props => {
  const { current: jsonManager } = useRef(JsonManager.create(props.jsonInput));
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
  const handleUpload = (): void => toggleSubmitButtons(props, true);
  const handleUploaded = (file: UploaderFile, response: JsonFile): void => {
    setFiles(files =>
      updateUploadFile(file, { ...response, source: null })(files),
    );
    jsonManager.addUploadedFile(response);
    toggleSubmitButtons(props, false);
    handleOnUploaded(props, file, response);
  };
  useEffect(() => {
    props.filesInput.addEventListener('change', handleChange);
    return () => props.filesInput.removeEventListener('change', handleChange);
  }, []);
  return (
    <Messages.Provider value={setMessages(props.messages)}>
      <Renderers.Provider value={props.renderers}>
        <div className={className.block(props.type)}>
          {files.map(file => (
            <UploaderItem
              key={file.id}
              file={file}
              link={props.link}
              onDelete={handleDelete}
              onUpload={handleUpload}
              onUploaded={handleUploaded}
            />
          ))}
        </div>
      </Renderers.Provider>
    </Messages.Provider>
  );
};

export default Uploader;
