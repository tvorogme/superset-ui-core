"use strict";

exports.__esModule = true;
exports.default = createTimeRangeFromGranularity;

var _types = require("../types");

var _createTime = _interopRequireDefault(require("./createTime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;

function deductOneMs(time) {
  return new Date(time.getTime() - 1);
}

function computeEndTimeFromGranularity(time, granularity, useLocalTime) {
  const date = useLocalTime ? time.getDate() : time.getUTCDate();
  const month = useLocalTime ? time.getMonth() : time.getUTCMonth();
  const year = useLocalTime ? time.getFullYear() : time.getUTCFullYear();
  const mode = useLocalTime ? 'local' : 'utc';

  switch (granularity) {
    case _types.TimeGranularity.SECOND:
      return new Date(time.getTime() + MS_IN_SECOND - 1);

    case _types.TimeGranularity.MINUTE:
      return new Date(time.getTime() + MS_IN_MINUTE - 1);

    case _types.TimeGranularity.FIVE_MINUTES:
      return new Date(time.getTime() + MS_IN_MINUTE * 5 - 1);

    case _types.TimeGranularity.TEN_MINUTES:
      return new Date(time.getTime() + MS_IN_MINUTE * 10 - 1);

    case _types.TimeGranularity.FIFTEEN_MINUTES:
      return new Date(time.getTime() + MS_IN_MINUTE * 15 - 1);

    case _types.TimeGranularity.THIRTY_MINUTES:
      return new Date(time.getTime() + MS_IN_MINUTE * 30 - 1);

    case _types.TimeGranularity.HOUR:
      return new Date(time.getTime() + MS_IN_HOUR - 1);
    // For the day granularity and above, using Date overflow is better than adding timestamp
    // because it will also handle daylight saving.

    case _types.TimeGranularity.WEEK:
    case _types.TimeGranularity.WEEK_STARTING_SUNDAY:
    case _types.TimeGranularity.WEEK_STARTING_MONDAY:
      return deductOneMs((0, _createTime.default)(mode, year, month, date + 7));

    case _types.TimeGranularity.MONTH:
      return deductOneMs((0, _createTime.default)(mode, year, month + 1));

    case _types.TimeGranularity.QUARTER:
      return deductOneMs((0, _createTime.default)(mode, year, (Math.floor(month / 3) + 1) * 3));

    case _types.TimeGranularity.YEAR:
      return deductOneMs((0, _createTime.default)(mode, year + 1));
    // For the WEEK_ENDING_XXX cases,
    // currently assume "time" returned from database is supposed to be the end time
    // (in contrast to all other granularities that the returned time is start time).
    // However, the returned "time" is at 00:00:00.000, so have to add 23:59:59.999.

    case _types.TimeGranularity.WEEK_ENDING_SATURDAY:
    case _types.TimeGranularity.WEEK_ENDING_SUNDAY:
    case _types.TimeGranularity.DATE:
    case _types.TimeGranularity.DAY:
    default:
      return deductOneMs((0, _createTime.default)(mode, year, month, date + 1));
  }
}

function createTimeRangeFromGranularity(time, granularity, useLocalTime = false) {
  const endTime = computeEndTimeFromGranularity(time, granularity, useLocalTime);

  if (granularity === _types.TimeGranularity.WEEK_ENDING_SATURDAY || granularity === _types.TimeGranularity.WEEK_ENDING_SUNDAY) {
    const date = useLocalTime ? time.getDate() : time.getUTCDate();
    const month = useLocalTime ? time.getMonth() : time.getUTCMonth();
    const year = useLocalTime ? time.getFullYear() : time.getUTCFullYear();
    const startTime = (0, _createTime.default)(useLocalTime ? 'local' : 'utc', year, month, date - 6);
    return [startTime, endTime];
  }

  return [time, endTime];
}