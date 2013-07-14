/**
 * @description Unit test for User module in Core.
 * @author Lhfcws
 * @version 0.1
 */
var assert, MD5, datetime, user, helper, can, testuid, testpwd, testuser, time;
assert = require('assert');
MD5 = require('MD5');
datetime = require('datetime');
user = require('../bin/core/modules/user');
helper = require('../bin/common/helper');
can = it;
testuid = 'lhfcws@test.com';
testpwd = '123456';
testuser = {
  userId: testuid,
  password: testpwd,
  username: 'lhfcws',
  email: testuid
};
time = function(){
  console.log(datetime.format(new Date(), '%H-%m-%S'));
};
describe('User module Unit Test', function(){
  describe('register', function(){
    can('User<lhfcws@test.com> register successfully.', function(done){
      user.register(testuser, function(err){
        if (err) {
          throw err.errMsg;
        }
        assert.equal(true, true);
        return done();
      });
    });
  });
  describe('login', function(){
    can('User<lhfcws@test.com> login successfully.', function(done){
      user.login({
        userId: testuid,
        password: testpwd
      }, function(err){
        if (err) {
          throw err.errMsg;
        }
        assert.equal(true, true);
        return done();
      });
    });
  });
  describe('user-exist', function(){
    can('should exist user<lhfcws@test.com>.', function(done){
      user.userExist({
        userId: testuid
      }, function(err, result){
        assert.equal(result, true);
        done();
      });
    });
  });
  describe('set-avatar', function(){
    can('should change user avatar.', function(done){
      var userObj;
      userObj = {};
      userObj.userId = testuid;
      userObj.avatar = '/home/lhfcws/avatar/pikachu.png';
      user.setAvatar(userObj, function(err){
        if (err) {
          throw err.errMsg;
        }
        user.getAUser(userObj, function(err, result){
          if (err) {
            throw err.errMsg;
          }
          assert.equal(result.avatar, userObj.avatar);
          done();
        });
      });
    });
  });
  describe('change-password', function(){
    can('should change user password.', function(done){
      var userObj;
      userObj = {};
      userObj.password = testpwd;
      userObj.userId = testuid;
      userObj.newPassword = '654321';
      user.changePassword(userObj, function(err){
        user.getAUser({
          userId: testuid
        }, function(err, result){
          assert.equal(result.password, MD5('654321'));
          done();
        });
      });
    });
  });
  describe('get-a-user', function(){
    can('should return a user by condition.', function(done){
      var userObj;
      userObj = helper.copy(testuser);
      delete userObj.password;
      user.getAUser(userObj, function(err, result){
        if (err) {
          throw err.errMsg;
        }
        assert.equal(result.userId, userObj.userId);
        done();
      });
    });
  });
  describe('get-users', function(){
    can('should return users array by condition.', function(done){
      user.getUsers({
        userId: testuid
      }, function(err, result){
        if (err) {
          throw err.errMsg;
        }
        assert.equal(result[0].userId, testuid);
        done();
      });
    });
  });
  describe('update-user-info', function(){
    can('should update user information.', function(done){
      var userObj;
      userObj = {};
      userObj.username = 'Lhfcws WWJ';
      userObj.mobile = '10086';
      userObj.userId = testuid;
      user.updateUserInfo(userObj, function(err){
        if (err) {
          throw err.errMsg;
        }
        return user.getAUser({
          userId: testuid
        }, function(err, result){
          assert.equal(result.username, userObj.username);
          assert.equal(result.mobile, userObj.mobile);
          done();
        });
      });
    });
  });
  describe('delete-user', function(){
    can('should delete user<lhfcws@test.com>.', function(done){
      user.deleteUser({
        userId: testuid
      }, function(err){
        if (err) {
          throw err.errMsg;
        }
        user.userExist({
          userId: testuid
        }, function(err, result){
          if (err) {
            throw err.errMsg;
          }
          assert.equal(result, false);
          done();
        });
      });
    });
  });
});