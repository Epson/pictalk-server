/**
 * @description Picture model.
 * @author Lhfcws
 * @file
 **/
(function(){
  var database, model, async, db, PictureModel;
  database = require('../database');
  model = require('../model');
  async = require('async');
  db = database.syncDb();
  /**
   * @description Include some methods to visit picture data.
   * @module
   **/
  PictureModel = {
    insertPicture: function(picture, callback){
      return model.insert('picture', picture, function(err){
        if (err) {
          throw err;
        }
        return callback(null);
      });
    },
    deletePicture: function(condition, callback){
      condition == null && (condition = {});
      return model['delete']('picture', condition, function(err){
        if (err) {
          throw err;
        }
        return callback(null);
      });
    },
    updatePicture: function(condition, newPicture, callback){
      return model.update('picture', condition, newPicture, function(err){
        if (err) {
          throw err;
        }
        return callback(null);
      });
    },
    countPicture: function(condition, callback){
      condition == null && (condition = {});
      return model.count('picture', condition, function(err, count_){
        if (err) {
          throw err;
        }
        return callback(null, count_);
      });
    },
    getPictures: function(condition, callback){
      condition == null && (condition = {});
      return model.select('picture', condition, function(err, result){
        if (err) {
          throw err;
        }
        return callback(null, result);
      });
    },
    getAPicture: function(condition, callback){
      condition == null && (condition = {});
      return model.find('picture', condition, function(err, result){
        if (err) {
          throw err;
        }
        return callback(null, result);
      });
    }
  };
  import$(module.exports, PictureModel);
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
