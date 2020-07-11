export type HandlerRenderProp = {
  delete: () => void;
  progress?: number;
  uploading?: boolean;
};

export interface HandlerProps {
  children: (handler: HandlerRenderProp) => import('react').ReactElement;
}
