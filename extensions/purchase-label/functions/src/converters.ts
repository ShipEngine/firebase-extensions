import { get, omit, castArray } from 'lodash';
import { DocumentData } from '@google-cloud/firestore';
import { ParamSchema, RequestPayload } from './types';

export const mapDataToSchema = (
  data: DocumentData,
  schema: ParamSchema
): RequestPayload => {
  let newData = {} as any;

  Object.keys(schema).forEach((key: string) => {
    if (schema[key]._root) {
      newData[key] = castArray(get(data, schema[key]._root)).map(
        (item: DocumentData) =>
          mapDataToSchema(item, omit(schema[key], '_root'))
      );
    } else if (schema[key] === Object(schema[key])) {
      newData[key] = mapDataToSchema(data, schema[key]);
    } else if (get(data, schema[key]) !== undefined) {
      newData[key] = get(data, schema[key]);
    }
  });

  return newData;
};
