import { createContext, useContext } from 'react';

import { Renderers } from './types';

const RenderersContext = createContext<Renderers>({});

export const getRenderer = <K extends keyof Renderers>(
  renderer: K,
): Renderers[K] | undefined => useContext(RenderersContext)[renderer];

export default RenderersContext;
