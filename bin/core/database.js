/**
 * @description Database connection.
 * @author Lhfcws
 * @version 0.1
 **/
(function(){
  var mongoskin, async, config, mongo, Mongoose, Mongoskin;
  mongoskin = require('mongoskin');
  async = require('async');
  config = require('../conf/config');
  mongo = config.mongo;
  /**
   * @description Mongoose connect & disconnect
   * @todo if there're various db (maybe for test),
   *       this object should be moved to an independent new file.
   * @module
   **/
  Mongoose = {
    connectErrorAlert: function(mongoose_){
      var db;
      db = mongoose_.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
    },
    connect: function(callback){
      mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db);
      this.connectErrorAlert();
      return callback(null, mongoose);
    },
    disconnect: function(callback){
      return mongoose.disconnect(function(mongoose_){
        return callback(null);
      });
    }
  };
  /**
   * @description Mongoskin connect & disconnect
   * @todo if there're various db (maybe for test),
   *       this object should be moved to an independent new file.
   * @module
   **/
  Mongoskin = {
    syncConnect: function(){
      var db;
      db = mongoskin.db(mongo.host + ':' + mongo.port + '/' + mongo.db);
      return db;
    },
    connect: function(callback){
      var mongo, db;
      mongo = config.mongo;
      db = mongoskin.db(mongo.host + ':' + mongo.port + '/' + mongo.db);
      return callback(null, db);
    },
    disconnect: function(callback){
      return mongoskin.db.close(function(err){
        return callback(err);
      });
    }
  };
  /**
   * @description Interface of the module.
   * @module
   **/
  module.exports = {
    _db: null,
    _mongo: Mongoskin,
    syncDb: function(){
      if (!this._db) {
        this._db = Mongoskin.syncConnect();
        return this._db;
      } else {
        return this._db;
      }
    },
    db: function(callback){
      if (!this._db) {
        return connectDb(function(err, db_){
          this._db = db_;
          return callback(null, db_);
        });
      } else {
        return callback(null, this._db);
      }
    },
    connectDb: function(callback){
      return this._mongo.connect(function(err, db_){
        return callback(null, db_);
      });
    },
    disconnectDb: function(callback){
      return this._mongo.disconnect(function(err){
        if (!err) {
          this._db = null;
        }
        return callback(err);
      });
    }
  };
}).call(this);
