/**
 * @description Message unit test.
 * @author Lhfcws
 * @version 0.1
 */

require! [assert, '../bin/common/helper', '../bin/core/modules/message']

can = it

testuid = 
  sender: 'lhfcws@test.com'
testrecv = \chenxj@test.com
testmsg =
  pt-id: 'Object_id'
  msg-body:
    type: \text
    content: 'Hello World!'
    url: ''
  sender: testuid.sender
  receiver: testrecv
  time: '2013-07-07-22-10-10'
  anchor:
    center-x: 100
    center-y: 100


describe 'Message Unit Test', !->
  describe 'create-a-message', !->
    can 'should create a fake message `Hello World!`.', !(done)->
      message.create-a-message testmsg, (err) ->
        message.get-message-list-by-user testuid, (err, result) ->
          assert.equal result[0].msg-body.content, testmsg.msg-body.content
          done!

  describe 'get-message-list-by-user', !->
    can 'should return message list by user `lhfcws@test.com`', !(done)->
      message.get-message-list-by-user testuid, (err, result) ->
        assert.equal typeof result, 'object'
        done!

  describe 'get-mesage-list-by-picture', !->
    can 'should return message list by picture', !(done)->
      message.get-message-list-by-picture {pt-id: 'Object_id'}, (err, result) ->
        assert.equal result[0].pt-id, testmsg.pt-id
        done!

