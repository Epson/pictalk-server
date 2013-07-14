/**
 * @description Friend Controller.
 * @author Lhfcws
 * @file
 **/
var async, assert, friendModel, errors, reverse_frd, Friend;
async = require('async');
assert = require('assert');
friendModel = require('./friend-model');
errors = require('../../conf/errors');
reverse_frd = function(_frd){
  return {
    userId: _frd.friendId,
    friendId: _frd.userId
  };
};
/**
 * @description friend-model Controller
 * @module
 */
Friend = {
  friendExist: function(_friend, callback){
    var condition;
    condition = {
      userId: _friend.userId,
      friendId: _friend.friendId
    };
    friendModel.countFriend(condition, function(err, result){
      return callback(null, result > 0);
    });
  },
  addFriend: function(_friend, callback){
    var condition, condition1;
    condition = {};
    condition = {
      userId: _friend.userId,
      friendId: _friend.friendId
    };
    condition1 = reverse_frd(condition);
    Friend.friendExist(condition, function(err, result){
      if (!!result) {
        return callback('Friend exist');
      }
      condition.nickname = _friend.friendName;
      condition1.nickname = _friend.userName;
      return async.series([
        function(cb1){
          return friendModel.insertFriend(condition, function(err){
            if (err) {
              throw err;
            }
            return cb1(null);
          });
        }, function(cb2){
          return friendModel.insertFriend(condition1, function(err){
            if (err) {
              throw err;
            }
            return cb2(null);
          });
        }
      ], function(err){
        if (err) {
          throw err;
        }
        return callback(null);
      });
    });
  },
  updateFriendNickname: function(_friend, callback){
    var condition;
    condition = {
      userId: _friend.userId,
      friendId: _friend.friendId
    };
    Friend.friendExist(condition, function(err, exist){
      if (!exist) {
        return callback(new errors(1, 'FRIEND_NEXIST'));
      }
      return friendModel.updateFriend(condition, _friend, function(err){
        return callback(null);
      });
    });
  },
  getFriendsByUser: function(_condition, callback){
    var condition;
    condition = {
      userId: _condition.userId
    };
    friendModel.getFriends(condition, function(err, result){
      return callback(null, result);
    });
  },
  deleteFriend: function(_condition, callback){
    var condition, condition1, flag;
    condition = condition1 = {};
    flag = false;
    condition.userId = _condition.userId;
    if (typeof _condition.friendId === 'string') {
      flag = true;
      condition.friendId = _condition.friendId;
      condition1 = reverse_frd(condition);
    }
    async.series([
      function(cb1){
        var iterator;
        if (flag) {
          return friendModel.deleteFriend(condition1, function(err){
            return cb1(null);
          });
        } else {
          iterator = function(frd, cb11){
            var _frd;
            _frd = reverse_frd(frd);
            return friendModel.deleteFriend(_frd, function(err0){
              if (err0) {
                throw err0;
              }
            });
          };
          return friendModel.getFriends(condition, function(err0, result){
            return async.each(result, iterator, function(err1){
              return cb1(null);
            });
          });
        }
      }, function(cb2){
        return friendModel.deleteFriend(condition, function(err){
          return cb2(null);
        });
      }
    ], function(err){
      return callback(null);
    });
  }
};
import$(module.exports, Friend);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}