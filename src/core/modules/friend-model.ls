/**
 * @description friend model.
 * @author Lhfcws
 * @file
 **/

require! ['../database', '../model',  async]
db = database.sync-db!
/**
 * @description Include some methods to visit friend data.
 * @module
 **/
friend-model =
  insert-friend: (friend, callback) ->
    model.insert \friend, friend, (err) ->
      if err
        throw err
      return callback null

  delete-friend: (condition={}, callback) ->
    model.delete \friend, condition, (err) ->
      if err
        throw err
      return callback null

  update-friend: (condition, new-friend, callback) ->
    model.update \friend, condition, new-friend, (err) ->
      if err
        throw err
      return callback null

  count-friend: (condition={}, callback) ->
    model.count \friend, condition, (err, count_) ->
      if err
        throw err
      return callback null, count_

  get-friends: (condition={}, callback) ->
    model.select \friend, condition, (err, result) ->
      if err
        throw err
      return callback null, result

  get-a-friend: (condition={}, callback) ->
    model.find \friend, condition, (err, result) ->
      if err
        throw err
      if result != null
        return callback null, result
      else
        return callback null, void


module.exports <<< friend-model
