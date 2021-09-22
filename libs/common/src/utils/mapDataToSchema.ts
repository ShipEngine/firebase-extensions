import { get, omit, castArray } from 'lodash';
import { DocumentData } from '@google-cloud/firestore';
import * as logs from '../logs';

type ParamSchema = { [key: string]: any };

const mapDataToSchemaWithoutLogging = (
  data: DocumentData,
  schema: ParamSchema
) => {
  let newData = {} as any;

  Object.keys(schema).forEach((key: string) => {
    if (schema[key]._root) {
      newData[key] = castArray(get(data, schema[key]._root)).map(
        (item: DocumentData) =>
          mapDataToSchemaWithoutLogging(item, omit(schema[key], '_root'))
      );
    } else if (schema[key] === Object(schema[key])) {
      newData[key] = mapDataToSchemaWithoutLogging(data, schema[key]);
    } else if (get(data, schema[key]) !== undefined) {
      newData[key] = get(data, schema[key]);
    }
  });

  return newData;
};

export const mapDataToSchema = (data: DocumentData, schema: ParamSchema) => {
  logs.mappingData(data, schema);

  try {
    return mapDataToSchema(data, schema);
  } catch (err) {
    logs.errorMappingData(err as Error);
    throw err;
  }
};
