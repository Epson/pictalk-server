/**
 * @description Unit test for User module in Core.
 * @author Lhfcws
 * @version 0.1
 */

require! [assert, MD5, datetime, '../bin/core/modules/user', '../bin/common/helper']

can = it  # 'it' is a keyword in LiveScript.

testuid = 'lhfcws@test.com'

testpwd = '123456'

testuser =
  user-id: testuid
  password: testpwd
  username: \lhfcws
  email: testuid

time = !->
  console.log datetime.format new Date!, '%H-%m-%S'

# Unit Test
describe 'User module Unit Test', !->
  describe 'register', !->
    can 'User<lhfcws@test.com> register successfully.', !(done)->
      user.register testuser, (err) ->
        if err
          throw err.err-msg
        assert.equal true, true
        done!

  describe 'login', !->
    can 'User<lhfcws@test.com> login successfully.', !(done)->
      user.login {user-id: testuid, password: testpwd}, (err) ->
        if err
          throw err.err-msg
        assert.equal true, true
        done!

  describe 'user-exist', !->
    can 'should exist user<lhfcws@test.com>.', !(done)->
      user.user-exist {user-id: testuid}, !(err, result) ->
        assert.equal result, true
        done!

  describe 'set-avatar', !->
    can 'should change user avatar.', !(done)->
      user-obj = {}
      user-obj.user-id = testuid
      user-obj.avatar = '/home/lhfcws/avatar/pikachu.png'

      user.set-avatar user-obj, !(err) ->
        if err
          throw err.err-msg
        user.get-a-user user-obj, !(err, result) ->
          if err
            throw err.err-msg
          assert.equal result.avatar, user-obj.avatar
          done!

  describe 'change-password', !->
    can 'should change user password.', !(done)->
      user-obj = {}
      user-obj.password = testpwd
      user-obj.user-id = testuid
      user-obj.new-password = '654321'

      user.change-password user-obj, !(err) ->
        user.get-a-user {user-id: testuid}, !(err, result) ->
          assert.equal result.password, MD5 '654321'
          done!

  describe 'get-a-user', !->
    can 'should return a user by condition.', !(done)->
      user-obj = helper.copy testuser
      delete user-obj.password

      user.get-a-user user-obj, !(err, result) ->
        if err
          throw err.err-msg
        assert.equal result.user-id, user-obj.user-id
        done!

  describe 'get-users', !->
    can 'should return users array by condition.', !(done)->

      user.get-users {user-id: testuid}, !(err, result) ->
        if err
          throw err.err-msg
        assert.equal result[0].user-id, testuid
        done!

  describe 'update-user-info', !->
    can 'should update user information.', !(done)->
      user-obj = {}
      user-obj.username = 'Lhfcws WWJ'
      user-obj.mobile = '10086'
      user-obj.user-id = testuid

      user.update-user-info user-obj, (err) ->
        if err
          throw err.err-msg
        user.get-a-user {user-id: testuid}, !(err, result) ->
          assert.equal result.username, user-obj.username
          assert.equal result.mobile, user-obj.mobile
          done!
  
  describe 'delete-user', !->
    can 'should delete user<lhfcws@test.com>.', !(done)->
      user.delete-user {user-id: testuid}, !(err) ->
        if err
          throw err.err-msg
        user.user-exist {user-id: testuid}, !(err, result) ->
          if err
            throw err.err-msg
          assert.equal result, false
          done!
