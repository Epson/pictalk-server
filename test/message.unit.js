/**
 * @description Message unit test.
 * @author Lhfcws
 * @version 0.1
 */
var assert, helper, message, can, testuid, testrecv, testmsg;
assert = require('assert');
helper = require('../bin/common/helper');
message = require('../bin/core/modules/message');
can = it;
testuid = {
  sender: 'lhfcws@test.com'
};
testrecv = 'chenxj@test.com';
testmsg = {
  ptId: 'Object_id',
  msgBody: {
    type: 'text',
    content: 'Hello World!',
    url: ''
  },
  sender: testuid.sender,
  receiver: testrecv,
  time: '2013-07-07-22-10-10',
  anchor: {
    centerX: 100,
    centerY: 100
  }
};
describe('Message Unit Test', function(){
  describe('create-a-message', function(){
    can('should create a fake message `Hello World!`.', function(done){
      message.createAMessage(testmsg, function(err){
        return message.getMessageListByUser(testuid, function(err, result){
          assert.equal(result[0].msgBody.content, testmsg.msgBody.content);
          return done();
        });
      });
    });
  });
  describe('get-message-list-by-user', function(){
    can('should return message list by user `lhfcws@test.com`', function(done){
      message.getMessageListByUser(testuid, function(err, result){
        assert.equal(typeof result, 'object');
        return done();
      });
    });
  });
  describe('get-mesage-list-by-picture', function(){
    can('should return message list by picture', function(done){
      message.getMessageListByPicture({
        ptId: 'Object_id'
      }, function(err, result){
        assert.equal(result[0].ptId, testmsg.ptId);
        return done();
      });
    });
  });
});