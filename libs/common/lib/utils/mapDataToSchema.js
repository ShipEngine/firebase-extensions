'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.mapDataToSchema = void 0;
const lodash_1 = require('lodash');
const logs = require('../logs');
const mapDataToSchemaWithoutLogging = (data, schema) => {
  let newData = {};
  Object.keys(schema).forEach((key) => {
    if (schema[key]._root) {
      newData[key] = (0, lodash_1.castArray)(
        (0, lodash_1.get)(data, schema[key]._root)
      ).map((item) =>
        mapDataToSchemaWithoutLogging(
          item,
          (0, lodash_1.omit)(schema[key], '_root')
        )
      );
    } else if (schema[key] === Object(schema[key])) {
      newData[key] = mapDataToSchemaWithoutLogging(data, schema[key]);
    } else if ((0, lodash_1.get)(data, schema[key]) !== undefined) {
      newData[key] = (0, lodash_1.get)(data, schema[key]);
    }
  });
  return newData;
};
const mapDataToSchema = (data, schema) => {
  logs.mappingData(data, schema);
  try {
    return (0, exports.mapDataToSchema)(data, schema);
  } catch (err) {
    logs.errorMappingData(err);
    throw err;
  }
};
exports.mapDataToSchema = mapDataToSchema;
