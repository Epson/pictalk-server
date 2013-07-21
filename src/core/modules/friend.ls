/**
 * @description Friend Controller.
 * @author Lhfcws
 * @file
 **/

require! [async, assert, './friend-model', '../../conf/errors']

reverse_frd = (_frd) ->
  return {
    user-id: _frd.friend-id
    friend-id: _frd.user-id
  }

/**
 * @description friend-model Controller
 * @module
 */
Friend =
  friend-exist: !(_friend, callback) ->
    condition =
      user-id: _friend.user-id
      friend-id: _friend.friend-id

    friend-model.count-friend condition, (err, result) ->
      return callback null, result > 0

  add-friend: !(_friend, callback) ->
    condition = {}
    condition =
      user-id: _friend.user-id
      friend-id: _friend.friend-id
    condition1 = reverse_frd condition

    Friend.friend-exist condition, (err, result) ->
      if not not result
        return callback 'Friend exist'

      condition.nickname = _friend.friend-name
      condition1.nickname = _friend.user-name

      async.series [
        (cb1)->
          friend-model.insert-friend condition, (err) ->
            if err
              throw err
            return cb1 null
        ,
        (cb2) ->
          friend-model.insert-friend condition1, (err) ->
            if err
              throw err
            return cb2 null
        ],
        (err) ->
          if err
            throw err
          return callback null

  update-friend-nickname: !(_friend, callback) ->
    condition =
      user-id: _friend.user-id
      friend-id: _friend.friend-id

    Friend.friend-exist condition, (err, exist) ->
      if not exist
        return callback new errors 1, \FRIEND_NEXIST

      friend-model.update-friend condition, _friend, (err) ->
        return callback null
 
  get-friends-by-user: !(_condition, callback) ->
    condition = { user-id:_condition.user-id }
    friend-model.get-friends condition, (err, result) ->
      return callback null, result

  delete-friend: !(_condition, callback) ->
    condition = condition1 = {}
    flag = false

    condition.user-id = _condition.user-id
    if typeof _condition.friend-id == 'string'
      flag = true
      condition.friend-id = _condition.friend-id
      condition1 = reverse_frd condition

    async.series [
      (cb1)->
        if flag
          friend-model.delete-friend condition1, (err) ->
            return cb1 null
        else
          iterator = (frd, cb11)->
            _frd = reverse_frd frd
            friend-model.delete-friend _frd, (err0) ->
              if err0
                throw err0

          friend-model.get-friends condition, (err0, result) ->
            async.each result, iterator, (err1) ->
              return cb1 null
      ,
      (cb2) ->
        friend-model.delete-friend condition, (err) ->
          return cb2 null
      ],
      (err) ->
        return callback null

module.exports <<< Friend
