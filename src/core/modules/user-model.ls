/**
 * @description User model.
 * @author Lhfcws
 * @file
 **/

require! ['../database', '../model',  async]
db = database.sync-db!
/**
 * @description Include some methods to visit user data.
 * @module
 **/
User-model =
  insert-user: (user, callback) ->
    model.insert \user, user, (err) ->
      if err
        throw err
      return callback null

  delete-user: (condition={}, callback) ->
    model.delete \user, condition, (err) ->
      if err
        throw err
      return callback null

  update-user: (condition, new-user, callback) ->
    model.update \user, condition, new-user, (err) ->
      if err
        throw err
      return callback null

  count-user: (condition={}, callback) ->
    model.count \user, condition, (err, count_) ->
      if err
        throw err
      return callback null, count_

  get-users: (condition={}, callback) ->
    model.select \user, condition, (err, result) ->
      if err
        throw err
      return callback null, result

  get-a-user: (condition={}, callback) ->
    model.find \user, condition, (err, result) ->
      if err
        throw err
      return callback null, result


module.exports <<< User-model
