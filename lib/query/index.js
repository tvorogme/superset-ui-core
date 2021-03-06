"use strict";

exports.__esModule = true;
var _exportNames = {
  buildQueryContext: true,
  buildQueryObject: true,
  convertFilter: true,
  extractTimegrain: true,
  getMetricLabel: true,
  DatasourceKey: true,
  normalizeOrderBy: true,
  makeApi: true,
  ApiLegacy: true,
  ApiV1: true
};
exports.ApiV1 = exports.ApiLegacy = exports.makeApi = exports.normalizeOrderBy = exports.DatasourceKey = exports.getMetricLabel = exports.extractTimegrain = exports.convertFilter = exports.buildQueryObject = exports.buildQueryContext = void 0;

var ApiLegacy = _interopRequireWildcard(require("./api/legacy"));

exports.ApiLegacy = ApiLegacy;

var ApiV1 = _interopRequireWildcard(require("./api/v1"));

exports.ApiV1 = ApiV1;

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  exports[key] = _constants[key];
});

var _buildQueryContext = _interopRequireDefault(require("./buildQueryContext"));

exports.buildQueryContext = _buildQueryContext.default;

var _buildQueryObject = _interopRequireDefault(require("./buildQueryObject"));

exports.buildQueryObject = _buildQueryObject.default;

var _convertFilter = _interopRequireDefault(require("./convertFilter"));

exports.convertFilter = _convertFilter.default;

var _extractTimegrain = _interopRequireDefault(require("./extractTimegrain"));

exports.extractTimegrain = _extractTimegrain.default;

var _getMetricLabel = _interopRequireDefault(require("./getMetricLabel"));

exports.getMetricLabel = _getMetricLabel.default;

var _DatasourceKey = _interopRequireDefault(require("./DatasourceKey"));

exports.DatasourceKey = _DatasourceKey.default;

var _normalizeOrderBy = _interopRequireDefault(require("./normalizeOrderBy"));

exports.normalizeOrderBy = _normalizeOrderBy.default;

var _AnnotationLayer = require("./types/AnnotationLayer");

Object.keys(_AnnotationLayer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AnnotationLayer[key]) return;
  exports[key] = _AnnotationLayer[key];
});

var _QueryFormData = require("./types/QueryFormData");

Object.keys(_QueryFormData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _QueryFormData[key]) return;
  exports[key] = _QueryFormData[key];
});

var _Column = require("./types/Column");

Object.keys(_Column).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Column[key]) return;
  exports[key] = _Column[key];
});

var _Datasource = require("./types/Datasource");

Object.keys(_Datasource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Datasource[key]) return;
  exports[key] = _Datasource[key];
});

var _Metric = require("./types/Metric");

Object.keys(_Metric).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Metric[key]) return;
  exports[key] = _Metric[key];
});

var _Query = require("./types/Query");

Object.keys(_Query).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Query[key]) return;
  exports[key] = _Query[key];
});

var _types = require("./api/v1/types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});

var _makeApi = _interopRequireDefault(require("./api/v1/makeApi"));

exports.makeApi = _makeApi.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }