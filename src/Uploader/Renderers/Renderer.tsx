import React, { ReactElement } from 'react';

import { useMessages } from '../Messages';

import { RendererComponent, RendererProps, Renderers } from './types';

import { useRenderer } from '.';

type UsedRenderer<T> = RendererComponent<RendererProps<T>> | undefined;

const render = <T extends object>(
  key: keyof Renderers,
  element: ReactElement,
  props: T,
): ReactElement => {
  const Renderer = useRenderer(key) as UsedRenderer<T>;
  return Renderer ? <Renderer {...props} messages={useMessages()} /> : element;
};

export default { render };