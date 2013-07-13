/**
 * @description Picture model.
 * @author Lhfcws
 * @file
 **/

require! ['../database', '../model',  async]
db = database.sync-db!
/**
 * @description Include some methods to visit picture data.
 * @module
 **/
Picture-model =
  insert-picture: (picture, callback) ->
    model.insert \picture, picture, (err) ->
      if err
        throw err
      return callback null

  delete-picture: (condition={}, callback) ->
    model.delete \picture, condition, (err) ->
      if err
        throw err
      return callback null

  update-picture: (condition, new-picture, callback) ->
    model.update \picture, condition, new-picture, (err) ->
      if err
        throw err
      return callback null

  count-picture: (condition={}, callback) ->
    model.count \picture, condition, (err, count_) ->
      if err
        throw err
      return callback null, count_

  get-pictures: (condition={}, callback) ->
    model.select \picture, condition, (err, result) ->
      if err
        throw err
      return callback null, result

  get-a-picture: (condition={}, callback) ->
    model.find \picture, condition, (err, result) ->
      if err
        throw err
      return callback null, result

module.exports <<< Picture-model
