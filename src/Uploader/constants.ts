import dataAttribute, {
  DataAttribute,
} from '@wavevision/ts-utils/dom/dataAttribute';

const createDataAttribute = (value: string): DataAttribute => {
  const attribute = dataAttribute('wavevision-uploader');
  attribute.value(value);
  return attribute;
};

export const INPUTS = createDataAttribute('inputs');
export const ROOT = createDataAttribute('root');
export const UPLOADER_TYPE_BASIC = 'uploaderTypeBasic';
export const UPLOADER_TYPE_IMAGES = 'uploaderTypeImages';
