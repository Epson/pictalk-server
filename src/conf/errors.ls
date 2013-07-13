/**
 * @description Error list file.
 * @author Lhfcws
 * @file
 */

/**
 * @description Error level index.
 */
error-level-index = [
  \Fatal-error,
  \Dev-error ,
  \User-error,
  \Warning
]

/**
 * @description An object include error message list for 4 error levels. 
 */
error-dictionary =
  # FATAL-ERROR
  \SELECT_ERROR : 'Database select failed.'
  \FIND_ERROR : 'Database find failed.'
  \INSERT_ERROR : 'Database insert failed.'
  \UPDATE_ERROR : 'Database update failed.'
  \DELETE_ERROR : 'Database delete failed.'
  \COUNT_ERROR : 'Database count failed.'
  # DEV-ERROR
  \USER_NCOMPLETE : 'User object is not complete, something vital like `email` or `username` or `password`'
  \USER_NEXIST : 'User does not existed.'
  \FRIEND_NEXIST : 'The friend pair doesnot exist.'
  # USER-ERROR
  \USER_DUPLICATE : 'User with the same email has existed, please change another one.'
  \USER_LOGIN : 'User does not existed or password is not correct.'
  # WARNING

/**
 * @description An object include error information.
 * @class
 */
class Errors
  (_error-level, _err-val) ->
    @error-level = _error-level
    @err-val = _err-val
    @err-msg = error-dictionary[@err-val]
    @error-level-msg = error-level-index[@error-level]

  show: !->
    console.log '!!! ERROR OCCURS!\n'
    console.log '[' + @error-level-msg + ']  ' + @err-msg + '\n'
    console.log '!!!!!!'

module.exports = Errors
