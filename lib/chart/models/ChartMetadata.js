"use strict";

exports.__esModule = true;
exports.default = void 0;

class ChartMetadata {
  constructor(config) {
    this.name = void 0;
    this.canBeAnnotationTypes = void 0;
    this.canBeAnnotationTypesLookup = void 0;
    this.credits = void 0;
    this.description = void 0;
    this.show = void 0;
    this.supportedAnnotationTypes = void 0;
    this.thumbnail = void 0;
    this.useLegacyApi = void 0;
    this.behaviors = void 0;
    this.datasourceCount = void 0;
    this.enableNoResults = void 0;
    this.deprecated = void 0;
    this.exampleGallery = void 0;
    this.tags = void 0;
    this.category = void 0;
    const {
      name,
      canBeAnnotationTypes = [],
      credits = [],
      description = '',
      show = true,
      supportedAnnotationTypes = [],
      thumbnail,
      useLegacyApi = false,
      behaviors = [],
      datasourceCount = 1,
      enableNoResults = true,
      deprecated = false,
      exampleGallery = [],
      tags = [],
      category = null
    } = config;
    this.name = name;
    this.credits = credits;
    this.description = description;
    this.show = show;
    this.canBeAnnotationTypes = canBeAnnotationTypes;
    this.canBeAnnotationTypesLookup = canBeAnnotationTypes.reduce((prev, type) => {
      const lookup = prev;
      lookup[type] = true;
      return lookup;
    }, {});
    this.supportedAnnotationTypes = supportedAnnotationTypes;
    this.thumbnail = thumbnail;
    this.useLegacyApi = useLegacyApi;
    this.behaviors = behaviors;
    this.datasourceCount = datasourceCount;
    this.enableNoResults = enableNoResults;
    this.deprecated = deprecated;
    this.exampleGallery = exampleGallery;
    this.tags = tags;
    this.category = category;
  }

  canBeAnnotationType(type) {
    return this.canBeAnnotationTypesLookup[type] || false;
  }

  clone() {
    return new ChartMetadata(this);
  }

}

exports.default = ChartMetadata;