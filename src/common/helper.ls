/**
 * @description Common functions.
 * @author Lhfcws
 * @module
 */

require! '../conf/config'

/**
 * @description Shallow copy of an object.
 **/
exports.copy = (_obj) ->
  obj = {}
  for key in Object.keys _obj
    obj[key] = _obj[key]
  return obj

/**
 * @description Return project path.
 **/
exports.root = config.root
  
