# media-queries-less-js

Compiles a set of media queries to LESS mixins and Javascript MediaQueryLists.

## Usage

```
var mediaQueriesLessJs = require('media-queries-less-js');
```

### mediaQueriesLessJs(queryMap, lessPath, jsPath, opts, done)

*queryMap* should be an object mapping query names to CSS media queries. Options are the following:

* *lessPrefix*: either a string to prepend to LESS mixin names, or a function receiving a query name and returning a mixin name. Default: `''`.
* *jsPrefix*: either a string to prepend to the IIFE that constructs the Javascript media query list, or a function that receives the IIFE and returns the Javascript code to output. Default: `''`.
