/**
 * @description Friend unit test.
 * @author Lhfcws
 * @version 0.1
 **/
var assert, user, friend, friendModel, helper, can, testfrd, testfrd_;
assert = require('assert');
user = require('../bin/core/modules/user');
friend = require('../bin/core/modules/friend');
friendModel = require('../bin/core/modules/friend-model');
helper = require('../bin/common/helper');
can = it;
testfrd = {
  userId: 'zhaojian@test.com',
  friendId: 'chenxuejia@test.com',
  friendName: 'aligod',
  userName: 'zhaojian'
};
testfrd_ = {
  userId: 'chenxuejia@test.com',
  friendId: 'zhaojian@test.com',
  userName: 'aligod',
  friendName: 'zhaojian'
};
describe('Friend Unit Test', function(){
  describe('add-friend', function(){
    can('should add a new friend pair <`zhaojian`, `chenxuejia`>', function(done){
      friend.addFriend(testfrd, function(err){
        if (err) {
          throw err;
        }
        return done();
      });
    });
  });
  describe('friend-exist', function(){
    can('should exist friend pair <`zhaojian`, `chenxuejia`>', function(done){
      friend.friendExist(testfrd, function(err, result){
        if (err) {
          throw err;
        }
        assert.equal(result, true);
        return done();
      });
    });
  });
  describe('update-friend-nickname', function(){
    can('should update chenxuejia nickname into `aligod`', function(done){
      friend.updateFriendNickname(testfrd, function(err){
        if (err) {
          throw err;
        }
        return friendModel.getAFriend(testfrd, function(err, result){
          if (err) {
            throw err;
          }
          assert.equal(result.nickname, testfrd.nickname);
          return done();
        });
      });
    });
  });
  describe('get-friends-by-user', function(){
    can('should return a friend list/array by user', function(done){
      friend.getFriendsByUser({
        userId: testfrd.userId
      }, function(err, result){
        assert.equal(result[0].friendId, 'chenxuejia@test.com');
        return done();
      });
    });
  });
  describe('delete-friend', function(){
    can('should delete friend pair <`zhaojian`, `chenxuejia`>', function(done){
      friend.deleteFriend(testfrd, function(err){
        if (err) {
          throw err;
        }
        return friend.friendExist(testfrd, function(err, result){
          if (err) {
            throw err;
          }
          assert.equal(result, false);
          return done();
        });
      });
    });
  });
});