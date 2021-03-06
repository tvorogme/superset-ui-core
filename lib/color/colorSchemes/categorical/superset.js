"use strict";

exports.__esModule = true;
exports.default = void 0;

var _CategoricalScheme = _interopRequireDefault(require("../../CategoricalScheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schemes = [{
  id: 'supersetColors',
  label: 'Superset Colors',
  colors: [// Full color
  '#1FA8C9', '#454E7C', '#5AC189', '#FF7F44', '#666666', '#E04355', '#FCC700', '#A868B7', '#3CCCCB', '#A38F79', // Pastels
  '#8FD3E4', '#A1A6BD', '#ACE1C4', '#FEC0A1', '#B2B2B2', '#EFA1AA', '#FDE380', '#D3B3DA', '#9EE5E5', '#D1C6BC']
}].map(s => new _CategoricalScheme.default(s));
var _default = schemes;
exports.default = _default;