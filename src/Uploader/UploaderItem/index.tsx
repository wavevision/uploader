import React, { memo, FunctionComponent } from 'react';

import Handler from './Handler';
import Renderer from './Renderer';
import { UploaderItemProps } from './types';

const UploaderItem: FunctionComponent<UploaderItemProps> = props => {
  return <Handler {...props}>{Renderer.render(props)}</Handler>;
};

export default memo(UploaderItem);
