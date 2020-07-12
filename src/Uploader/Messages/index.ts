import { createContext, useContext } from 'react';

import { Messages, RequiredMessages } from './types';
import {
  DELETE_FILE,
  DOWNLOAD_FILE,
  DROP_MULTIPLE_FILES,
  DROP_SINGLE_FILE,
  NO_IMAGE_PREVIEW,
} from './constants';

export const DEFAULT_MESSAGES: RequiredMessages = {
  [DELETE_FILE]: 'Delete',
  [DOWNLOAD_FILE]: 'Download',
  [DROP_MULTIPLE_FILES]: 'Choose or drop files here',
  [DROP_SINGLE_FILE]: 'Choose or drop a file here',
  [NO_IMAGE_PREVIEW]: 'No image preview',
};

const MessagesContext = createContext<RequiredMessages>(DEFAULT_MESSAGES);

export const createMessages = (messages: Messages): RequiredMessages => ({
  ...DEFAULT_MESSAGES,
  ...messages,
});

export const useMessages = (): RequiredMessages => useContext(MessagesContext);

export const useMessage = <K extends keyof RequiredMessages>(
  message: K,
): RequiredMessages[K] => useMessages()[message];

export default MessagesContext;
