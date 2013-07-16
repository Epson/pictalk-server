/**
 * @description Simple SQL operation wrapper for mongoskin.
 * @author Lhfcws
 * @file
 **/
var async, database, errors, db, model;
async = require('async');
database = require('./database');
errors = require('../conf/errors');
db = database.syncDb();
/**
 * @description Simple SQL operation wrapper for mongoskin.
 * @module
 **/
model = {
  count: function(collection, condition, callback){
    var coll;
    condition == null && (condition = {});
    coll = db.collection(collection);
    return coll.count(condition, function(err, count){
      if (err) {
        throw err;
      }
      return callback(null, count);
    });
  },
  select: function(collection, condition, callback){
    var coll;
    condition == null && (condition = {});
    coll = db.collection(collection);
    return coll.find(condition).toArray(function(err, result){
      if (err) {
        throw err;
      } else {
        return callback(null, result);
      }
    });
  },
  find: function(collection, condition, callback){
    var coll;
    condition == null && (condition = {});
    coll = db.collection(collection);
    return coll.findOne(condition, function(err, result){
      if (err) {
        throw err;
      }
      return callback(null, result);
    });
  },
  insert: function(collection, data, callback){
    data == null && (data = {});
    if (data === {}) {
      return callback(new errors(0, 'INSERT_ERROR'));
    } else {
      return db.collection(collection).insert(data, function(err){
        if (err) {
          throw err;
        }
        return callback(null);
      });
    }
  },
  update: function(collection, condition, content, callback){
    condition == null && (condition = {});
    content == null && (content = {});
    if (content === {}) {
      return callback(new errors(0, 'UPDATE_ERROR'));
    }
    return db.collection(collection).update(condition, content, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  'delete': function(collection, condition, callback){
    var coll;
    condition == null && (condition = {});
    coll = db.collection(collection);
    return coll.remove(condition, function(err, result){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  }
};
import$(module.exports, model);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}