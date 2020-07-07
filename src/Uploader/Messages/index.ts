import { createContext, useContext } from 'react';

import { Messages, RequiredMessages } from './types';
import {
  DELETE_FILE,
  DROP_MULTIPLE_FILES,
  DROP_SINGLE_FILE,
} from './constants';

export const DEFAULT_MESSAGES: RequiredMessages = {
  [DELETE_FILE]: 'Delete file',
  [DROP_MULTIPLE_FILES]: 'Choose or drop files here.',
  [DROP_SINGLE_FILE]: 'Choose or drop file here',
};

const MessagesContext = createContext<RequiredMessages>(DEFAULT_MESSAGES);

export const setMessages = (messages: Messages): RequiredMessages => ({
  ...DEFAULT_MESSAGES,
  ...messages,
});

export const useMessage = <K extends keyof RequiredMessages>(
  message: K,
): RequiredMessages[K] => useContext(MessagesContext)[message];

export default MessagesContext;
