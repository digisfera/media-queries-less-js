fs = require 'fs'
async = require 'async'
_ = require 'lodash'

queriesToLess = (prefixer, queryMap) ->
  strList = _.map queryMap, (query, name) ->
    ".#{prefixer(name)}(@rules) { @media #{query} { @rules(); } }"
  strList.join('\n')

queriesToJs = (wrapper, queryMap) ->
  objList = _.zipObject _.map queryMap, (query, name) ->
    [ name, "window.matchMedia('#{query}')" ]
  wrapper("(function(){return #{JSON.stringify(objList,null,0)};})();")

module.exports = (queryMap, lessPath, jsPath, opts = {}, done = (->)) ->

  lessPrefix = if _.isFunction(opts.lessPrefix) then opts.lessPrefix else (x) -> "#{opts.lessPrefix || ''}#{x}"
  jsWrapper = if _.isFunction(opts.jsWrapper) then opts.jsWrapper else (x) -> "#{opts.jsWrapper || ''}#{x}"

  lessData = queriesToLess(lessPrefix, queryMap)
  jsData = queriesToJs(jsWrapper, queryMap)

  writeFile = ([ path, data ], done) ->
    fs.writeFile path, data, done

  async.map [ [ lessPath, lessData ], [ jsPath, jsData ] ], writeFile, done
