"use strict";

exports.__esModule = true;
exports.default = makeSingleton;

function makeSingleton(BaseClass, ...args) {
  let singleton;
  return function getInstance() {
    if (!singleton) {
      singleton = new BaseClass(...args);
    }

    return singleton;
  };
}