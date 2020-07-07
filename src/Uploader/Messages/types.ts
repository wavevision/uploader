import { ReactNode } from 'react';

import {
  DELETE_FILE,
  DROP_MULTIPLE_FILES,
  DROP_SINGLE_FILE,
} from './constants';

export interface Messages {
  [DELETE_FILE]?: ReactNode;
  [DROP_MULTIPLE_FILES]?: ReactNode;
  [DROP_SINGLE_FILE]?: ReactNode;
}

export type RequiredMessages = Required<Messages>;
