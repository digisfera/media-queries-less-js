// Generated by CoffeeScript 1.7.1
(function() {
  var async, fs, queriesToJs, queriesToLess, _;

  fs = require('fs');

  async = require('async');

  _ = require('lodash');

  queriesToLess = function(prefixer, queryMap) {
    var strList;
    strList = _.map(queryMap, function(query, name) {
      return "." + (prefixer(name)) + "(@rules) { @media " + query + " { @rules(); } }";
    });
    return strList.join('\n');
  };

  queriesToJs = function(wrapper, queryMap) {
    var objList;
    objList = _.zipObject(_.map(queryMap, function(query, name) {
      return [name, "window.matchMedia('" + query + "')"];
    }));
    return wrapper("(function(){return " + (JSON.stringify(objList, null, 0)) + ";})();");
  };

  module.exports = function(queryMap, lessPath, jsPath, opts, done) {
    var jsData, jsWrapper, lessData, lessPrefix, writeFile;
    if (opts == null) {
      opts = {};
    }
    if (done == null) {
      done = (function() {});
    }
    lessPrefix = _.isFunction(opts.lessPrefix) ? opts.lessPrefix : function(x) {
      return "" + (opts.lessPrefix || '') + x;
    };
    jsWrapper = _.isFunction(opts.jsWrapper) ? opts.jsWrapper : function(x) {
      return "" + (opts.jsWrapper || '') + x;
    };
    lessData = queriesToLess(lessPrefix, queryMap);
    jsData = queriesToJs(jsWrapper, queryMap);
    writeFile = function(_arg, done) {
      var data, path;
      path = _arg[0], data = _arg[1];
      return fs.writeFile(path, data, done);
    };
    return async.map([[lessPath, lessData], [jsPath, jsData]], writeFile, done);
  };

}).call(this);
