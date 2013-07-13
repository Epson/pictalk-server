/**
 * @description Simple SQL operation wrapper for mongoskin.
 * @author Lhfcws
 * @file
 **/

require! [async, './database', '../conf/errors']

db = database.sync-db!

/**
 * @description Simple SQL operation wrapper for mongoskin.
 * @module
 **/
model =
  count: (collection, condition={}, callback) ->
    coll = db.collection collection
    coll.count condition, !(err,count) ->
      if err
        throw err
      return callback null, count

  select: (collection, condition={}, callback) ->
    coll = db.collection collection
    coll.find condition .toArray !(err, result) ->
      if err
        throw err
      else
        return callback null, result

  find: (collection, condition={}, callback) ->
    coll = db.collection collection
    coll.findOne condition,!(err, result) ->
      if err
        throw err
      return callback null, result

  insert: (collection, data={}, callback) ->
    if data == {}
      return callback new errors 0, \INSERT_ERROR
    else
      db.collection collection .insert data, !(err)->
        if err
          throw err
        return callback null

  update: (collection, condition={}, content={}, callback) ->
    if content == {}
      return callback new errors 0, \UPDATE_ERROR
    db.collection collection .update condition, content, !(err) ->
      if err
        throw err
      return callback null


  delete: (collection, condition={}, callback) ->
    coll = db.collection collection
    coll.remove condition, !(err, result) ->
      if err
        throw err
      return callback null

module.exports <<< model
