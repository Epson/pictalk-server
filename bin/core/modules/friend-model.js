/**
 * @description friend model.
 * @author Lhfcws
 * @file
 **/
var database, model, async, db, friendModel;
database = require('../database');
model = require('../model');
async = require('async');
db = database.syncDb();
/**
 * @description Include some methods to visit friend data.
 * @module
 **/
friendModel = {
  insertFriend: function(friend, callback){
    return model.insert('friend', friend, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  deleteFriend: function(condition, callback){
    condition == null && (condition = {});
    return model['delete']('friend', condition, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  updateFriend: function(condition, newFriend, callback){
    return model.update('friend', condition, newFriend, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  countFriend: function(condition, callback){
    condition == null && (condition = {});
    return model.count('friend', condition, function(err, count_){
      if (err) {
        throw err;
      }
      return callback(null, count_);
    });
  },
  getFriends: function(condition, callback){
    condition == null && (condition = {});
    return model.select('friend', condition, function(err, result){
      if (err) {
        throw err;
      }
      return callback(null, result);
    });
  },
  getAFriend: function(condition, callback){
    condition == null && (condition = {});
    return model.find('friend', condition, function(err, result){
      if (err) {
        throw err;
      }
      if (result !== null) {
        return callback(null, result);
      } else {
        return callback(null, void 8);
      }
    });
  }
};
import$(module.exports, friendModel);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}