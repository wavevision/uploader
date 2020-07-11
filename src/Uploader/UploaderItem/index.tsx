import React, { memo, FunctionComponent } from 'react';

import Handler from './Handler';
import render from './render';
import { UploaderItemProps } from './types';

const UploaderItem: FunctionComponent<UploaderItemProps> = props => {
  return <Handler {...props}>{render(props)}</Handler>;
};

export default memo<UploaderItemProps>(UploaderItem);
