"use strict";

exports.__esModule = true;
exports.default = void 0;

var _TimeFormats = _interopRequireDefault(require("./TimeFormats"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  DATABASE_DATE,
  DATABASE_DATETIME
} = _TimeFormats.default;
const MINUTE = '%Y-%m-%d %H:%M';
/**
 * Map time granularity to d3-format string
 */

const TimeFormatsForGranularity = {
  [_types.TimeGranularity.DATE]: DATABASE_DATE,
  [_types.TimeGranularity.SECOND]: DATABASE_DATETIME,
  [_types.TimeGranularity.MINUTE]: MINUTE,
  [_types.TimeGranularity.FIVE_MINUTES]: MINUTE,
  [_types.TimeGranularity.TEN_MINUTES]: MINUTE,
  [_types.TimeGranularity.FIFTEEN_MINUTES]: MINUTE,
  [_types.TimeGranularity.THIRTY_MINUTES]: MINUTE,
  [_types.TimeGranularity.HOUR]: '%Y-%m-%d %H:00',
  [_types.TimeGranularity.DAY]: DATABASE_DATE,
  [_types.TimeGranularity.WEEK]: DATABASE_DATE,
  [_types.TimeGranularity.MONTH]: '%b %Y',
  [_types.TimeGranularity.QUARTER]: '%Y Q%q',
  [_types.TimeGranularity.YEAR]: '%Y',
  [_types.TimeGranularity.WEEK_STARTING_SUNDAY]: DATABASE_DATE,
  [_types.TimeGranularity.WEEK_STARTING_MONDAY]: DATABASE_DATE,
  [_types.TimeGranularity.WEEK_ENDING_SATURDAY]: DATABASE_DATE,
  [_types.TimeGranularity.WEEK_ENDING_SUNDAY]: DATABASE_DATE
};
var _default = TimeFormatsForGranularity;
exports.default = _default;