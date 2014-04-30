# media-queries-less-js

Compiles a set of media queries to LESS mixins and Javascript MediaQueryLists.

## Usage

```
var mediaQueriesLessJs = require('media-queries-less-js');
```

### mediaQueriesLessJs(queryMap, lessPath, jsPath, opts, done)

*queryMap* should be an object mapping query names to CSS media queries. Options are the following:

* *cssPrefix*: either a string to prepend to LESS mixin names, or a function receiving a query name and returning a mixin name. Default: `''`.
* *jsWrapper*: a function that receives the IIFE that generates and returns the Javascript code to output. Default: `''`.
