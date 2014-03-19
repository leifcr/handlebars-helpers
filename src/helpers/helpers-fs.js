/**
 * Handlebars Helpers <http://github.com/assemble/handlebars-helpers>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT)
 */

// Local utils
var Utils = require('../utils/utils');
var file = require('fs-utils');
var matter = require('gray-matter');
var _ = require('lodash');

module.exports.register = function (Handlebars, options) {
  var opts = options || {};
  var helpers = {};

  /**
   * {{#each (expand files)}} {{/each}}
   */

  helpers.expand = function (patterns) {
    return file.expand(patterns);
  };


  /**
   * {{read}}
   * Uses gray-matter to extract content only,
   * YAML front matter is stripped.
   */

  helpers.read = function (filepath, context, options) {
    var page = matter.read(filepath);
    var metadata = _.extend(context.data.root, page.context);
    var template = Handlebars.compile(page.content);
    return new Handlebars.SafeString(template(metadata));
  };


  /**
   * {{fileSize}}
   *
   * Converts bytes into a nice representation with unit.
   * e.g. 13661855 => 13.7 MB, 825399 => 825 KB, 1396 => 1 KB
   * @param  {[type]} value
   * @return {[type]}
   */
  helpers.fileSize = function (value) {
    var bytes = parseInt(value, 10);
    if (isNaN(bytes)) {
      console.error("Handlebars helper fileSize couldn't parse '" + value + "'");
      return value; // Graceful degradation
    }
    // KB is technically a Kilobit, but it seems more readable.
    var resInt, resValue;
    var metric = ['byte', 'bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) {
      resInt = resValue = 0;
    } else {
      // Base 1000 (rather than 1024) matches Mac OS X
      resInt = Math.floor(Math.log(bytes) / Math.log(1000));
      // No decimals for anything smaller than 1 MB
      resValue = (bytes / Math.pow(1000, Math.floor(resInt))).toFixed(resInt < 2 ? 0 : 1);
      if (bytes === 1) {
        resInt = -1; // special case: 1 byte (singular)
      }
    }
    return new Utils.safeString(resValue + ' ' + metric[resInt + 1]);
  };


  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, helpers[helper]);
    }
  }
};
