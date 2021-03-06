import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import { ParentSize } from '@vx/responsive';
import { createSelector } from 'reselect';
import { parseLength } from '../../dimension';
import SuperChartCore from './SuperChartCore';
import DefaultFallbackComponent from './FallbackComponent';
import ChartProps from '../models/ChartProps';
import NoResultsComponent from './NoResultsComponent';
import { jsx as ___EmotionJSX } from "@emotion/react";
const defaultProps = {
  FallbackComponent: DefaultFallbackComponent,
  height: 400,
  width: '100%',
  enableNoResults: true
};
export default class SuperChart extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.core = void 0;
    this.createChartProps = ChartProps.createSelector();
    this.parseDimension = createSelector(({
      width
    }) => width, ({
      height
    }) => height, (width, height) => {
      // Parse them in case they are % or 'auto'
      const widthInfo = parseLength(width);
      const heightInfo = parseLength(height);
      const boxHeight = heightInfo.isDynamic ? `${heightInfo.multiplier * 100}%` : heightInfo.value;
      const boxWidth = widthInfo.isDynamic ? `${widthInfo.multiplier * 100}%` : widthInfo.value;
      const style = {
        height: boxHeight,
        width: boxWidth
      }; // bounding box will ensure that when one dimension is not dynamic
      // e.g. height = 300
      // the auto size will be bound to that value instead of being 100% by default
      // e.g. height: 300 instead of height: '100%'

      const BoundingBox = widthInfo.isDynamic && heightInfo.isDynamic && widthInfo.multiplier === 1 && heightInfo.multiplier === 1 ? React.Fragment : ({
        children
      }) => ___EmotionJSX("div", {
        style: style
      }, children);
      return {
        BoundingBox,
        heightInfo,
        widthInfo
      };
    });

    this.setRef = core => {
      this.core = core;
    };
  }

  renderChart(width, height) {
    const {
      id,
      className,
      chartType,
      preTransformProps,
      overrideTransformProps,
      postTransformProps,
      onRenderSuccess,
      onRenderFailure,
      disableErrorBoundary,
      FallbackComponent,
      onErrorBoundary,
      Wrapper,
      queriesData,
      enableNoResults,
      ...rest
    } = this.props;
    const chartProps = this.createChartProps({ ...rest,
      queriesData,
      height,
      width
    });
    let chart; // Render the no results component if the query data is null or empty

    const noResultQueries = enableNoResults && (!queriesData || queriesData.every(({
      data
    }) => !data || Array.isArray(data) && data.length === 0));

    if (noResultQueries) {
      chart = ___EmotionJSX(NoResultsComponent, {
        id: id,
        className: className,
        height: height,
        width: width
      });
    } else {
      const chartWithoutWrapper = ___EmotionJSX(SuperChartCore, {
        ref: this.setRef,
        id: id,
        className: className,
        chartType: chartType,
        chartProps: chartProps,
        preTransformProps: preTransformProps,
        overrideTransformProps: overrideTransformProps,
        postTransformProps: postTransformProps,
        onRenderSuccess: onRenderSuccess,
        onRenderFailure: onRenderFailure
      });

      chart = Wrapper ? ___EmotionJSX(Wrapper, {
        width: width,
        height: height
      }, chartWithoutWrapper) : chartWithoutWrapper;
    } // Include the error boundary by default unless it is specifically disabled.


    return disableErrorBoundary === true ? chart : ___EmotionJSX(ErrorBoundary, {
      FallbackComponent: props => ___EmotionJSX(FallbackComponent, _extends({
        width: width,
        height: height
      }, props)),
      onError: onErrorBoundary
    }, chart);
  }

  render() {
    const {
      heightInfo,
      widthInfo,
      BoundingBox
    } = this.parseDimension(this.props); // If any of the dimension is dynamic, get parent's dimension

    if (widthInfo.isDynamic || heightInfo.isDynamic) {
      const {
        debounceTime
      } = this.props;
      return ___EmotionJSX(BoundingBox, null, ___EmotionJSX(ParentSize, {
        debounceTime: debounceTime
      }, ({
        width,
        height
      }) => this.renderChart(widthInfo.isDynamic ? Math.floor(width) : widthInfo.value, heightInfo.isDynamic ? Math.floor(height) : heightInfo.value)));
    }

    return this.renderChart(widthInfo.value, heightInfo.value);
  }

}
SuperChart.propTypes = {
  disableErrorBoundary: _pt.bool,
  debounceTime: _pt.number,
  enableNoResults: _pt.bool,
  FallbackComponent: _pt.elementType,
  showOverflow: _pt.bool,
  height: _pt.oneOfType([_pt.number, _pt.string]),
  width: _pt.oneOfType([_pt.number, _pt.string]),
  Wrapper: _pt.elementType
};
SuperChart.defaultProps = defaultProps;