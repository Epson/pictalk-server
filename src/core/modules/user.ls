/**
 * @description User Controller.
 * @author Lhfcws
 * @file
 **/

require! [assert, MD5,  './user-model', '../../conf/errors']

/**
 * @description user-model Controller
 * @module
 */
User =
  user-exist: (_user, callback) ->
    condition = {}
    if typeof _user == 'string'
      condition.user-id = _user
    else if typeof _user == 'object'
      condition = _user

    user-model.count-user condition, (err, result) ->
      return callback null, result > 0

  register: (user-obj, callback) ->
    assert user-obj.email
    assert user-obj.password

    user = user-obj
    user.user-id = user.email
    user.password = MD5 user.password
    user.username = user.email.split('@')[0]

    User.user-exist user.user-id, (err, exist) ->
      if exist
        return callback new errors 2, 'USER_DUPLICATE'
      user-model.insert-user user, (err) ->
        return callback null

  login: (user-obj, callback) ->
    user = {}
    user.user-id = user-obj.user-id
    user.password = MD5 user-obj.password

    User.user-exist user, (err, result) ->
      if not result
        return callback new errors 2, 'USER_LOGIN'
      return callback null

  set-avatar: (user-obj, callback) ->
    assert user-obj.avatar
    assert not not user-obj.avatar

    user = {user-id: user-obj.user-id}
    User.user-exist user, (err, exist) ->
      if not exist
        return callback new errors 1, 'USER_NEXIST'
    user-model.update-user user, {$set: {avatar: user-obj.avatar}}, (err) ->
      return callback null

  update-user-info: (user-obj, callback) ->
    condition = {user-id: user-obj.user-id}
    console.log condition
    user-model.update-user condition, {$set: user-obj}, (err) ->
      return callback null

  delete-user: (user-obj, callback) ->
    user-model.delete-user user-obj , (err) ->
      return callback null

  change-password: (user-obj, callback) ->
    assert user-obj.password
    assert user-obj.user-id

    user = {}
    user.password = MD5 user-obj.password
    user.user-id = user-obj.user-id

    User.user-exist user, (err, exist) ->
      #if not exist
      #  return callback new errors 1, 'USER_NEXIST'

      password = MD5 user-obj.new-password
      user-model.update-user user, {$set: {password: password}}, (err) ->
        return callback null

  get-a-user: (user-obj, callback) ->
    user-model.get-a-user user-obj, (err, result) ->
      if err
        throw err
      if not result
        return callback new errors 1, 'USER_NEXIST'
      return callback null, result

  get-users: (user-obj, callback) ->
    user-model.get-users user-obj, (err, result) ->
      if err
        throw err
      if not result
        return callback new errors 1, 'USER_NEXIST'
      return callback null, result

module.exports <<< User
