"use strict";

exports.__esModule = true;
exports.default = void 0;

var _makeSingleton = _interopRequireDefault(require("../utils/makeSingleton"));

var _ColorSchemeRegistry = _interopRequireDefault(require("./ColorSchemeRegistry"));

var _d = _interopRequireDefault(require("./colorSchemes/categorical/d3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CategoricalSchemeRegistry extends _ColorSchemeRegistry.default {
  constructor() {
    super();
    this.registerValue('SUPERSET_DEFAULT', _d.default[0]);
  }

}

const getInstance = (0, _makeSingleton.default)(CategoricalSchemeRegistry);
var _default = getInstance;
exports.default = _default;