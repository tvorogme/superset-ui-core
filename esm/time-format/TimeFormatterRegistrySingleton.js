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
import { makeSingleton } from '../utils';
import TimeFormatterRegistry from './TimeFormatterRegistry';
import TimeFormatter from './TimeFormatter';
import TimeFormatsForGranularity from './TimeFormatsForGranularity';
import { LOCAL_PREFIX } from './TimeFormats';
import createTimeRangeFromGranularity from './utils/createTimeRangeFromGranularity';
import TimeRangeFormatter from './TimeRangeFormatter';
const getInstance = makeSingleton(TimeFormatterRegistry);
export default getInstance;
export function getTimeRangeFormatter(formatId) {
  return new TimeRangeFormatter({
    id: formatId || 'undefined',
    formatFunc: range => {
      const format = getInstance().get(formatId);
      const [start, end] = range.map(value => format(value));
      return start === end ? start : [start, end].join(' — ');
    },
    useLocalTime: formatId == null ? void 0 : formatId.startsWith(LOCAL_PREFIX)
  });
}
export function formatTimeRange(formatId, range) {
  return getTimeRangeFormatter(formatId)(range);
}
export function getTimeFormatter(formatId, granularity) {
  if (granularity) {
    const formatString = formatId || TimeFormatsForGranularity[granularity];
    const timeRangeFormatter = getTimeRangeFormatter(formatString);
    return new TimeFormatter({
      id: [formatString, granularity].join('/'),
      formatFunc: value => timeRangeFormatter.format(createTimeRangeFromGranularity(value, granularity, timeRangeFormatter.useLocalTime)),
      useLocalTime: timeRangeFormatter.useLocalTime
    });
  }

  return getInstance().get(formatId);
}
/**
 * Syntactic sugar for backward compatibility
 * TODO: Deprecate this in the next breaking change.
 * @param granularity
 */

export function getTimeFormatterForGranularity(granularity) {
  return getTimeFormatter(undefined, granularity);
}
export function formatTime(formatId, value, granularity) {
  return getTimeFormatter(formatId, granularity)(value);
}