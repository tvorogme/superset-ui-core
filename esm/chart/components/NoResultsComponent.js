import _pt from "prop-types";
import React, { useMemo } from 'react';
import { t } from '../../translation';
import { jsx as ___EmotionJSX } from "@emotion/react";
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
  const containerStyles = useMemo(() => generateContainerStyles(height, width), [height, width]); // render the body if the width is auto/100% or greater than 250 pixels

  const shouldRenderBody = typeof width === 'string' || width > MIN_WIDTH_FOR_BODY;
  const BODY_STRING = t('No results were returned for this query. If you expected results to be returned, ensure any filters are configured properly and the datasource contains data for the selected time range.');
  return ___EmotionJSX("div", {
    className: className,
    id: id,
    style: containerStyles,
    title: shouldRenderBody ? undefined : BODY_STRING
  }, ___EmotionJSX("div", {
    style: MESSAGE_STYLES
  }, ___EmotionJSX("div", {
    style: TITLE_STYLES
  }, t('No Results')), shouldRenderBody && ___EmotionJSX("div", {
    style: BODY_STYLES
  }, BODY_STRING)));
};

NoResultsComponent.propTypes = {
  className: _pt.string,
  height: _pt.oneOfType([_pt.number, _pt.string]).isRequired,
  id: _pt.string,
  width: _pt.oneOfType([_pt.number, _pt.string]).isRequired
};
export default NoResultsComponent;