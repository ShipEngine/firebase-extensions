'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.handleUpdateDocument = void 0;
const logs = require('../logs');
const handleUpdateDocument = (snapshot, update) =>
  __awaiter(void 0, void 0, void 0, function* () {
    logs.parentUpdating(update);
    try {
      yield snapshot.ref.update(update);
      logs.parentUpdated();
    } catch (err) {
      logs.errorUpdatingParent(err);
      throw err;
    }
  });
exports.handleUpdateDocument = handleUpdateDocument;
