/**
 * @description Friend unit test.
 * @author Lhfcws
 * @version 0.1
 **/

require! [assert, '../bin/core/modules/user', '../bin/core/modules/friend', '../bin/core/modules/friend-model', '../bin/common/helper']

can = it

testfrd =
  user-id: \zhaojian@test.com
  friend-id: \chenxuejia@test.com
  friend-name: \aligod
  user-name: \zhaojian

testfrd_ =
  user-id: \chenxuejia@test.com
  friend-id: \zhaojian@test.com
  user-name: \aligod
  friend-name: \zhaojian
  
describe 'Friend Unit Test', !->
  describe 'add-friend', !->
    can 'should add a new friend pair <`zhaojian`, `chenxuejia`>', !(done)->
      friend.add-friend testfrd, (err) ->
        if err
          throw err
        done!

  describe 'friend-exist', !->
    can 'should exist friend pair <`zhaojian`, `chenxuejia`>', !(done)->
      friend.friend-exist testfrd, (err, result) ->
        if err
          throw err
        assert.equal result, true
        done!

  describe 'update-friend-nickname', !->
    can 'should update chenxuejia nickname into `aligod`', !(done)->
      friend.update-friend-nickname testfrd, (err) ->
        if err
          throw err
 
        friend-model.get-a-friend testfrd, (err, result) ->
          if err
            throw err
          assert.equal result.nickname, testfrd.nickname
          done!

  describe 'get-friends-by-user', !->
    can 'should return a friend list/array by user', !(done)->
      friend.get-friends-by-user {user-id: testfrd.user-id}, (err, result) ->
        assert.equal result[0].friend-id, 'chenxuejia@test.com'
        done!

  describe 'delete-friend', !->
    can 'should delete friend pair <`zhaojian`, `chenxuejia`>', !(done)->
      friend.delete-friend testfrd, (err) ->
        if err
          throw err
        friend.friend-exist testfrd, (err, result) ->
          if err
            throw err
          assert.equal result, false
          done!

