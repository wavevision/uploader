import React, { memo, MouseEvent, ReactElement } from 'react';

import { className } from '../../utils';
import { useMessage } from '../../Messages';
import { useRenderer } from '../index';
import { DELETE } from '../constants';
import { DELETE_FILE } from '../../Messages/constants';
import { DeleteProps, Renderer } from '../types';

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

const Delete: Renderer<DeleteProps> = props => {
  const Delete = useRenderer(DELETE);
  return (
    <div className={className.element('delete')}>
      {Delete ? (
        <Delete {...props} message={useMessage(DELETE_FILE)} />
      ) : (
        renderDefault(props)
      )}
    </div>
  );
};

export default memo<DeleteProps>(Delete);
