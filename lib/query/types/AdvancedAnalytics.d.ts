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
export declare enum RollingType {
    Mean = "mean",
    Sum = "sum",
    Std = "std",
    Cumsum = "cumsum"
}
export interface RollingWindow {
    rolling_type?: RollingType;
    rolling_periods?: number;
    min_periods?: number;
}
export declare enum ComparisionType {
    Values = "values",
    Difference = "difference",
    Percentage = "percentage",
    Ratio = "ratio"
}
export interface TimeCompare {
    time_compare?: string;
    comparison_type?: ComparisionType;
}
declare const _default: {};
export default _default;
//# sourceMappingURL=AdvancedAnalytics.d.ts.map