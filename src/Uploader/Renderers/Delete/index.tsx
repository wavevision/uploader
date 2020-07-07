import React, {
  FunctionComponent,
  memo,
  MouseEvent,
  ReactElement,
} from 'react';

import { className } from '../../utils';
import { getMessage } from '../../Messages';
import { getRenderer } from '../index';
import { DELETE } from '../constants';
import { DELETE_FILE } from '../../Messages/constants';
import { DeleteProps } from '../types';

const render = (props: DeleteProps): ReactElement => {
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
      {getMessage(DELETE_FILE)}
    </button>
  );
};

const Delete: FunctionComponent<DeleteProps> = props => {
  const Delete = getRenderer(DELETE);
  return (
    <div className={className.element('delete')}>
      {Delete ? (
        <Delete {...props} message={getMessage(DELETE_FILE)} />
      ) : (
        render(props)
      )}
    </div>
  );
};

export default memo<DeleteProps>(Delete);
