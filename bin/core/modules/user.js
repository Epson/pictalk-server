/**
 * @description User Controller.
 * @author Lhfcws
 * @file
 **/
(function(){
  var assert, MD5, userModel, errors, User;
  assert = require('assert');
  MD5 = require('MD5');
  userModel = require('./user-model');
  errors = require('../../conf/errors');
  /**
   * @description user-model Controller
   * @module
   */
  User = {
    userExist: function(_user, callback){
      var condition;
      condition = {};
      if (typeof _user === 'string') {
        condition.userId = _user;
      } else if (typeof _user === 'object') {
        condition = _user;
      }
      return userModel.countUser(condition, function(err, result){
        return callback(null, result > 0);
      });
    },
    register: function(userObj, callback){
      var user;
      assert(userObj.email);
      assert(userObj.password);
      user = userObj;
      user.userId = user.email;
      user.password = MD5(user.password);
      user.username = user.email.split('@')[0];
      return User.userExist(user.userId, function(err, exist){
        if (exist) {
          return callback(new errors(2, 'USER_DUPLICATE'));
        }
        return userModel.insertUser(user, function(err){
          return callback(null);
        });
      });
    },
    login: function(userObj, callback){
      var user;
      user = {};
      user.userId = userObj.userId;
      user.password = MD5(userObj.password);
      return User.userExist(user, function(err, result){
        if (!result) {
          return callback(new errors(2, 'USER_LOGIN'));
        }
        return callback(null);
      });
    },
    setAvatar: function(userObj, callback){
      var user;
      assert(userObj.avatar);
      assert(!!userObj.avatar);
      user = {
        userId: userObj.userId
      };
      User.userExist(user, function(err, exist){
        if (!exist) {
          return callback(new errors(1, 'USER_NEXIST'));
        }
      });
      return userModel.updateUser(user, {
        $set: {
          avatar: userObj.avatar
        }
      }, function(err){
        return callback(null);
      });
    },
    updateUserInfo: function(userObj, callback){
      var condition;
      condition = {
        userId: userObj.userId
      };
      return userModel.updateUser(condition, {
        $set: userObj
      }, function(err){
        return callback(null);
      });
    },
    deleteUser: function(userObj, callback){
      return userModel.deleteUser(userObj, function(err){
        return callback(null);
      });
    },
    changePassword: function(userObj, callback){
      var user;
      assert(userObj.password);
      assert(userObj.userId);
      user = {};
      user.password = MD5(userObj.password);
      user.userId = userObj.userId;
      return User.userExist(user, function(err, exist){
        var password;
        password = MD5(userObj.newPassword);
        return userModel.updateUser(user, {
          $set: {
            password: password
          }
        }, function(err){
          return callback(null);
        });
      });
    },
    getAUser: function(userObj, callback){
      return userModel.getAUser(userObj, function(err, result){
        if (err) {
          throw err;
        }
        if (!result) {
          return callback(new errors(1, 'USER_NEXIST'));
        }
        return callback(null, result);
      });
    },
    getUsers: function(userObj, callback){
      return userModel.getUsers(userObj, function(err, result){
        if (err) {
          throw err;
        }
        if (!result) {
          return callback(new errors(1, 'USER_NEXIST'));
        }
        return callback(null, result);
      });
    }
  };
  import$(module.exports, User);
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
