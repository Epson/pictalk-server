/**
 * @description Common functions.
 * @author Lhfcws
 * @module
 */
var config;
config = require('../conf/config');
/**
 * @description Shallow copy of an object.
 **/
exports.copy = function(_obj){
  var obj, i$, ref$, len$, key;
  obj = {};
  for (i$ = 0, len$ = (ref$ = Object.keys(_obj)).length; i$ < len$; ++i$) {
    key = ref$[i$];
    obj[key] = _obj[key];
  }
  return obj;
};
/**
 * @description Return project path.
 **/
exports.root = config.root;