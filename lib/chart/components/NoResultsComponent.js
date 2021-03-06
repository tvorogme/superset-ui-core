"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _translation = require("../../translation");

var _react2 = require("@emotion/react");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MESSAGE_STYLES = {
  maxWidth: 800
};
const TITLE_STYLES = {
  fontSize: 16,
  fontWeight: 'bold',
  paddingBottom: 8
};
const BODY_STYLES = {
  fontSize: 14
};
const MIN_WIDTH_FOR_BODY = 250;

const generateContainerStyles = (height, width) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height,
  justifyContent: 'center',
  padding: 16,
  textAlign: 'center',
  width
});

const NoResultsComponent = ({
  className,
  height,
  id,
  width
}) => {
  const containerStyles = (0, _react.useMemo)(() => generateContainerStyles(height, width), [height, width]); // render the body if the width is auto/100% or greater than 250 pixels

  const shouldRenderBody = typeof width === 'string' || width > MIN_WIDTH_FOR_BODY;
  const BODY_STRING = (0, _translation.t)('No results were returned for this query. If you expected results to be returned, ensure any filters are configured properly and the datasource contains data for the selected time range.');
  return (0, _react2.jsx)("div", {
    className: className,
    id: id,
    style: containerStyles,
    title: shouldRenderBody ? undefined : BODY_STRING
  }, (0, _react2.jsx)("div", {
    style: MESSAGE_STYLES
  }, (0, _react2.jsx)("div", {
    style: TITLE_STYLES
  }, (0, _translation.t)('No Results')), shouldRenderBody && (0, _react2.jsx)("div", {
    style: BODY_STYLES
  }, BODY_STRING)));
};

NoResultsComponent.propTypes = {
  className: _propTypes.default.string,
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  id: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired
};
var _default = NoResultsComponent;
exports.default = _default;