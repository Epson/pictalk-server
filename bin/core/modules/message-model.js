/**
 * @description Message model.
 * @author Lhfcws
 * @file
 **/
var database, model, async, db, messageModel;
database = require('../database');
model = require('../model');
async = require('async');
db = database.syncDb();
/**
 * @description Include some methods to visit message data.
 * @module
 **/
messageModel = {
  insertMessage: function(message, callback){
    return model.insert('message', message, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  deleteMessage: function(condition, callback){
    condition == null && (condition = {});
    return model['delete']('message', condition, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  updateMessage: function(condition, newMessage, callback){
    return model.update('message', condition, newMessage, function(err){
      if (err) {
        throw err;
      }
      return callback(null);
    });
  },
  countMessage: function(condition, callback){
    condition == null && (condition = {});
    return model.count('message', condition, function(err, count_){
      if (err) {
        throw err;
      }
      return callback(null, count_);
    });
  },
  getMessages: function(condition, callback){
    condition == null && (condition = {});
    return model.select('message', condition, function(err, result){
      if (err) {
        throw err;
      }
      return callback(null, result);
    });
  },
  getAMessage: function(condition, callback){
    condition == null && (condition = {});
    return model.find('message', condition, function(err, result){
      if (err) {
        throw err;
      }
      return callback(null, result);
    });
  }
};
import$(module.exports, messageModel);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}