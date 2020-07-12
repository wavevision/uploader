import dataAttribute, {
  DataAttribute,
} from '@wavevision/ts-utils/dom/dataAttribute';

const createDataAttribute = (name: string, value?: string): DataAttribute => {
  const attr = dataAttribute(name, 'wavevision-uploader');
  attr.value(value);
  return attr;
};

const createElementsDataAttribute = (value: string): DataAttribute =>
  createDataAttribute('element', value);

export const INPUTS = createElementsDataAttribute('inputs');
export const ITEM = createDataAttribute('item');
export const ROOT = createElementsDataAttribute('root');
export const UPLOADER_TYPE_BASIC = 'basic';
export const UPLOADER_TYPE_IMAGES = 'images';
