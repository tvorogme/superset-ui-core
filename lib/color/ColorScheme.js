"use strict";

exports.__esModule = true;
exports.default = void 0;

class ColorScheme {
  constructor({
    colors,
    description = '',
    id,
    label,
    isDefault
  }) {
    this.colors = void 0;
    this.description = void 0;
    this.id = void 0;
    this.label = void 0;
    this.isDefault = void 0;
    this.id = id;
    this.label = label != null ? label : id;
    this.colors = colors;
    this.description = description;
    this.isDefault = isDefault;
  }

}

exports.default = ColorScheme;