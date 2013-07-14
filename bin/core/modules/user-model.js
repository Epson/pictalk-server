/**
 * @description User model.
 * @author Lhfcws
 * @file
 **/
var database, model, async, db, UserModel;
database = require('../database');
model = require('../model');
async = require('async');
db = database.syncDb();
/**
 * @description Include some methods to visit user data.
 * @module
 **/
UserModel = {
  insertUser: function(user, callback){
    return model.insert('user', user, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  deleteUser: function(condition, callback){
    condition == null && (condition = {});
    return model['delete']('user', condition, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  updateUser: function(condition, newUser, callback){
    return model.update('user', condition, newUser, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  countUser: function(condition, callback){
    condition == null && (condition = {});
    return model.count('user', condition, function(err, count_){
      if (err) {
        throw err;
      }
      return callback(null, count_);
    });
  },
  getUsers: function(condition, callback){
    condition == null && (condition = {});
    return model.select('user', condition, function(err, result){
      if (err) {
        throw err;
      }
      return callback(null, result);
    });
  },
  getAUser: function(condition, callback){
    condition == null && (condition = {});
    return model.find('user', condition, function(err, result){
      if (err) {
        throw err;
      }
      return callback(null, result);
    });
  }
};
import$(module.exports, UserModel);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}