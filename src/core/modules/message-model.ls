/**
 * @description Message model.
 * @author Lhfcws
 * @file
 **/

require! ['../database', '../model',  async]
db = database.sync-db!
/**
 * @description Include some methods to visit message data.
 * @module
 **/
message-model =
  insert-message: (message, callback) ->
    model.insert \message, message, (err) ->
      if err
        throw err
      return callback null

  delete-message: (condition={}, callback) ->
    model.delete \message, condition, (err) ->
      if err
        throw err
      return callback null

  update-message: (condition, new-message, callback) ->
    model.update \message, condition, new-message, (err) ->
      if err
        throw err
      return callback null

  count-message: (condition={}, callback) ->
    model.count \message, condition, (err, count_) ->
      if err
        throw err
      return callback null, count_

  get-messages: (condition={}, callback) ->
    model.select \message, condition, (err, result) ->
      if err
        throw err
      return callback null, result

  get-a-message: (condition={}, callback) ->
    model.find \message, condition, (err, result) ->
      if err
        throw err
      return callback null, result


module.exports <<< message-model
