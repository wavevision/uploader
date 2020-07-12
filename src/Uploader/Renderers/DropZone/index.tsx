import React, { DragEvent, memo, ReactElement, useState } from 'react';

import Renderer from '../Renderer';
import { className } from '../../utils';
import { useMessage } from '../../Messages';
import { DROP_ZONE } from '../constants';
import {
  DROP_MULTIPLE_FILES,
  DROP_SINGLE_FILE,
} from '../../Messages/constants';
import { DropZoneDefaultRenderer, DropZoneProps } from '../types';

import './style.scss';

const renderDefault = (props: DropZoneProps): ReactElement => {
  const [dragged, setDragged] = useState(false);
  const handleClick = (): void => props.filesInput.click();
  const handleDragLeave = (): void => setDragged(false);
  const handleDragOver = (e: DragEvent): void => {
    setDragged(true);
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent): void => {
    handleDragOver(e);
    if (e.dataTransfer) {
      handleDragLeave();
      const { files } = e.dataTransfer;
      props.filesInput.files = files;
      props.filesInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };
  return (
    <div
      className={className.element('drop-zone', dragged ? 'dragged' : null)}
      role="button"
      onClick={handleClick}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {useMessage(
        props.filesInput.multiple ? DROP_MULTIPLE_FILES : DROP_SINGLE_FILE,
      )}
    </div>
  );
};

const DropZone: DropZoneDefaultRenderer = Renderer.render(
  DROP_ZONE,
  renderDefault,
);

export default memo(DropZone);
