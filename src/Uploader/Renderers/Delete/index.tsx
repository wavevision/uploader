import React, { memo, MouseEvent, ReactElement } from 'react';

import Renderer from '../Renderer';
import { className } from '../../utils';
import { useMessage } from '../../Messages';
import { DELETE } from '../constants';
import { DELETE_FILE } from '../../Messages/constants';
import { DeleteDefaultRenderer, DeleteProps } from '../types';

import './style.scss';

const renderDefault = (props: DeleteProps): ReactElement => {
  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();
    props.onClick();
  };
  return (
    <button
      className={className.element('delete-button')}
      onClick={handleClick}
      type="button"
    >
      {useMessage(DELETE_FILE)}
    </button>
  );
};

const Delete: DeleteDefaultRenderer = props => (
  <div className={className.element('delete')}>
    {Renderer.render(DELETE, renderDefault, props)}
  </div>
);

export default memo(Delete);
