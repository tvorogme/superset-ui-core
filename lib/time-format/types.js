"use strict";

exports.__esModule = true;
exports.TimeGranularity = void 0;

/**
 * search for `builtin_time_grains` in incubator-superset/superset/db_engine_specs/base.py
 */
const TimeGranularity = {
  DATE: 'date',
  SECOND: 'PT1S',
  MINUTE: 'PT1M',
  FIVE_MINUTES: 'PT5M',
  TEN_MINUTES: 'PT10M',
  FIFTEEN_MINUTES: 'PT15M',
  THIRTY_MINUTES: 'PT30M',
  HOUR: 'PT1H',
  DAY: 'P1D',
  WEEK: 'P1W',
  WEEK_STARTING_SUNDAY: '1969-12-28T00:00:00Z/P1W',
  WEEK_STARTING_MONDAY: '1969-12-29T00:00:00Z/P1W',
  WEEK_ENDING_SATURDAY: 'P1W/1970-01-03T00:00:00Z',
  WEEK_ENDING_SUNDAY: 'P1W/1970-01-04T00:00:00Z',
  MONTH: 'P1M',
  QUARTER: 'P3M',
  YEAR: 'P1Y'
};
exports.TimeGranularity = TimeGranularity;