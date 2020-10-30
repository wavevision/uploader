import React, { ReactElement } from 'react';

import { useMessages } from '../Messages';

import { RendererComponent, RendererProps, Renderers } from './types';

import { useRenderer } from '.';

type UsedRenderer<T> = RendererComponent<RendererProps<T>> | undefined;

const render = <T extends Record<string, unknown>>(
  key: keyof Renderers,
  renderDefault: (props: T) => ReactElement,
) => (props: T): ReactElement => {
  const Renderer = useRenderer(key) as UsedRenderer<T>;
  return Renderer ? (
    <Renderer {...props} messages={useMessages()} />
  ) : (
    renderDefault(props)
  );
};

export default { render };
