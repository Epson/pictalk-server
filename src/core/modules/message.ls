/**
 * @description message Controller.
 * @author Lhfcws
 * @file
 **/

require! [assert, './message-model', '../../conf/errors']

objectify = (attr, _obj) ->
  condition = {}

  if typeof _obj == 'string'
    condition[attr] = _obj
  else if _obj[attr] != 'undefined'
    condition = _obj
  else if _obj.user-id != 'undefined' and attr == 'sender'
    condition.sender = _obj.user-id
  else
    condition = false
 
  return condition

/**
 * @description message-model Controller
 * @module
 */
Message =
  create-a-message: (msgobject, callback) ->
    message-model.count-message {pt-id: msgobject.pt-id}, (err, result) ->
      cnt = result + 1
      msgobject.msg-index = cnt
      msgobject.msg-id = msgobject.pt-id + cnt

      message-model.insert-message msgobject, (err) ->
        return callback null

  get-message-list-by-sender: (_user, callback) ->
    condition = objectify \sender , _user

    Message.get-message-list-by-user condition, (err, result) ->
      if err
        return callback err
      return callback null, result

  get-message-list-by-receiver: (_user, callback) ->
    condition = objectify \receiver , _user

    Message.get-message-list-by-user condition, (err, result) ->
      if err
        return callback err
      return callback null, result

  get-message-list-by-user: (condition, callback) ->
    if not condition
      return callback 'Param Error.'
    message-model.get-messages condition, (err, result) ->
      return callback null, result

  get-message-list-by-picture: (_picture, callback) ->
    if not _picture
      return callback 'Param Error'

    condition = objectify \pt-id , _picture
    if condition.pt-id.length == '32'
      condition.pic-id = condition.pt-id
      delete condition.pt-id

    message-model.get-messages condition, (err, result) ->
      return callback null, result

module.exports <<< Message
