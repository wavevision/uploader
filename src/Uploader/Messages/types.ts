import {
  DELETE_FILE,
  DOWNLOAD_FILE,
  DROP_MULTIPLE_FILES,
  DROP_SINGLE_FILE,
} from './constants';

export type Message = import('react').ReactNode;

export interface Messages {
  [DELETE_FILE]?: Message;
  [DOWNLOAD_FILE]?: Message;
  [DROP_MULTIPLE_FILES]?: Message;
  [DROP_SINGLE_FILE]?: Message;
}

export type RequiredMessages = Required<Messages>;
