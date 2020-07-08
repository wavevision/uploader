import React, {
  memo,
  useState,
  DragEvent,
  FunctionComponent,
  ReactNode,
} from 'react';

import { className } from '../../utils';
import { useMessage } from '../../Messages';
import { useRenderer } from '../index';
import { DROP_ZONE } from '../constants';
import {
  DROP_MULTIPLE_FILES,
  DROP_SINGLE_FILE,
} from '../../Messages/constants';
import { DropZoneProps } from '../types';

const renderDefault = (props: DropZoneProps): ReactNode =>
  useMessage(
    props.filesInput.multiple ? DROP_MULTIPLE_FILES : DROP_SINGLE_FILE,
  );

const DropZone: FunctionComponent<DropZoneProps> = props => {
  const [dragged, setDragged] = useState(false);
  const handleClick = (): void => props.filesInput.click();
  const handleDragLeave = (): void => setDragged(false);
  const handleDragOver = (e: DragEvent): void => {
    setDragged(true);
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    setDragged(true);
    if (e.dataTransfer) {
      handleDragLeave();
      const { files } = e.dataTransfer;
      props.filesInput.files = files;
      props.filesInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };
  const DropZone = useRenderer(DROP_ZONE);
  return (
    <div
      className={className.element('drop-zone', dragged ? 'dragged' : null)}
      role="button"
      onClick={handleClick}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {DropZone ? (
        <DropZone
          {...props}
          dragged={dragged}
          multipleFilesMessage={useMessage(DROP_MULTIPLE_FILES)}
          singleFileMessage={useMessage(DROP_SINGLE_FILE)}
        />
      ) : (
        renderDefault(props)
      )}
    </div>
  );
};

export default memo<DropZoneProps>(DropZone);
