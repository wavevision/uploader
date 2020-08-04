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
  const handleDrag = (e: DragEvent): void => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  };
  const handleDragEnter = (e: DragEvent): void => {
    handleDrag(e);
    setDragged(true);
  };
  const handleDragLeave = (): void => setDragged(false);
  const handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    props.filesInput.files = files;
    props.filesInput.dispatchEvent(new Event('change', { bubbles: true }));
    handleDragLeave();
  };
  return (
    <div
      className={className.element('drop-zone', dragged ? 'dragged' : null)}
      draggable={true}
      role="button"
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDrag}
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
