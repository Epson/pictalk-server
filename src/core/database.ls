/**
 * @description Database connection.
 * @author Lhfcws
 * @version 0.1
 **/
require! [mongoskin, async, '../conf/config']

mongo = config.mongo

/**
 * @description Mongoose connect & disconnect
 * @todo if there're various db (maybe for test),
 *       this object should be moved to an independent new file.
 * @module
 **/
Mongoose =
# If you are using other mongo products, 
# you can add modules like Mongoose with connect() & disconnect()
  connect-error-alert: !(mongoose_)->
    db = mongoose_.connection
    db.on 'error', console.error.bind(console, 'connection error:')

  connect: (callback) ->
    mongoose.connect 'mongodb://'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db
    @connect-error-alert!
    return callback null, mongoose

  disconnect: (callback) ->
    mongoose.disconnect !(mongoose_)->
      return callback null

/**
 * @description Mongoskin connect & disconnect
 * @todo if there're various db (maybe for test),
 *       this object should be moved to an independent new file.
 * @module
 **/
Mongoskin =
  sync-connect: !->
    db = mongoskin.db mongo.host+':'+mongo.port+'/'+mongo.db
    return db

  connect: (callback) ->
    mongo = config.mongo
    db = mongoskin.db mongo.host+':'+mongo.port+'/'+mongo.db
    return callback null, db

  disconnect: (callback) ->
    mongoskin.db.close !(err)->
      return callback err

/**
 * @description Interface of the module.
 * @module
 **/
module.exports =
  _db: null
  _mongo: Mongoskin

  sync-db: !->
    if !@_db
      @_db = Mongoskin.sync-connect!
      return @_db
    else
      return @_db

  db: (callback) ->
    if not @_db
      (err, db_)<- connect-db!
      @_db = db_
      return callback null, db_
    else
      return callback null, @_db

  connect-db: (callback) ->
    @_mongo.connect (err, db_) ->
      return callback null, db_

  disconnect-db: (callback) ->
    @_mongo.disconnect (err) ->
      if not err
        @_db = null
      return callback err


