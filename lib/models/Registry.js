"use strict";

exports.__esModule = true;
exports.default = exports.OverwritePolicy = void 0;

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
let OverwritePolicy;
exports.OverwritePolicy = OverwritePolicy;

(function (OverwritePolicy) {
  OverwritePolicy["ALLOW"] = "ALLOW";
  OverwritePolicy["PROHIBIT"] = "PROHIBIT";
  OverwritePolicy["WARN"] = "WARN";
})(OverwritePolicy || (exports.OverwritePolicy = OverwritePolicy = {}));

/**
 * Registry class
 *
 * Can use generic to specify type of item in the registry
 * @type V Type of value
 * @type W Type of value returned from loader function when using registerLoader().
 * Set W=V when does not support asynchronous loader.
 * By default W is set to V | Promise<V> to support
 * both synchronous and asynchronous loaders.
 */
class Registry {
  constructor(config = {}) {
    this.name = void 0;
    this.overwritePolicy = void 0;
    this.items = void 0;
    this.promises = void 0;
    this.listeners = void 0;
    const {
      name = '',
      overwritePolicy = OverwritePolicy.ALLOW
    } = config;
    this.name = name;
    this.overwritePolicy = overwritePolicy;
    this.items = {};
    this.promises = {};
    this.listeners = new Set();
  }

  clear() {
    const keys = this.keys();
    this.items = {};
    this.promises = {};
    this.notifyListeners(keys);
    return this;
  }

  has(key) {
    const item = this.items[key];
    return item !== null && item !== undefined;
  }

  registerValue(key, value) {
    const item = this.items[key];
    const willOverwrite = this.has(key) && ('value' in item && item.value !== value || 'loader' in item);

    if (willOverwrite) {
      if (this.overwritePolicy === OverwritePolicy.WARN) {
        // eslint-disable-next-line no-console
        console.warn(`Item with key "${key}" already exists. You are assigning a new value.`);
      } else if (this.overwritePolicy === OverwritePolicy.PROHIBIT) {
        throw new Error(`Item with key "${key}" already exists. Cannot overwrite.`);
      }
    }

    if (!item || willOverwrite) {
      this.items[key] = {
        value
      };
      delete this.promises[key];
      this.notifyListeners([key]);
    }

    return this;
  }

  registerLoader(key, loader) {
    const item = this.items[key];
    const willOverwrite = this.has(key) && ('loader' in item && item.loader !== loader || 'value' in item);

    if (willOverwrite) {
      if (this.overwritePolicy === OverwritePolicy.WARN) {
        // eslint-disable-next-line no-console
        console.warn(`Item with key "${key}" already exists. You are assigning a new value.`);
      } else if (this.overwritePolicy === OverwritePolicy.PROHIBIT) {
        throw new Error(`Item with key "${key}" already exists. Cannot overwrite.`);
      }
    }

    if (!item || willOverwrite) {
      this.items[key] = {
        loader
      };
      delete this.promises[key];
      this.notifyListeners([key]);
    }

    return this;
  }

  get(key) {
    const item = this.items[key];

    if (item !== undefined) {
      if ('loader' in item) {
        return item.loader && item.loader();
      }

      return item.value;
    }

    return undefined;
  }

  getAsPromise(key) {
    const promise = this.promises[key];

    if (typeof promise !== 'undefined') {
      return promise;
    }

    const item = this.get(key);

    if (item !== undefined) {
      const newPromise = Promise.resolve(item);
      this.promises[key] = newPromise;
      return newPromise;
    }

    return Promise.reject(new Error(`Item with key "${key}" is not registered.`));
  }

  getMap() {
    return this.keys().reduce((prev, key) => {
      const map = prev;
      map[key] = this.get(key);
      return map;
    }, {});
  }

  getMapAsPromise() {
    const keys = this.keys();
    return Promise.all(keys.map(key => this.getAsPromise(key))).then(values => values.reduce((prev, value, i) => {
      const map = prev;
      map[keys[i]] = value;
      return map;
    }, {}));
  }

  keys() {
    return Object.keys(this.items);
  }

  values() {
    return this.keys().map(key => this.get(key));
  }

  valuesAsPromise() {
    return Promise.all(this.keys().map(key => this.getAsPromise(key)));
  }

  entries() {
    return this.keys().map(key => ({
      key,
      value: this.get(key)
    }));
  }

  entriesAsPromise() {
    const keys = this.keys();
    return this.valuesAsPromise().then(values => values.map((value, i) => ({
      key: keys[i],
      value
    })));
  }

  remove(key) {
    const isChange = this.has(key);
    delete this.items[key];
    delete this.promises[key];

    if (isChange) {
      this.notifyListeners([key]);
    }

    return this;
  }

  addListener(listener) {
    this.listeners.add(listener);
  }

  removeListener(listener) {
    this.listeners.delete(listener);
  }

  notifyListeners(keys) {
    this.listeners.forEach(listener => {
      try {
        listener(keys);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Exception thrown from a registry listener:', e);
      }
    });
  }

}

exports.default = Registry;