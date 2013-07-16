/**
 * @descriptioin Picture unit test.
 * @author Lhfcws
 **/
var assert, picture, helper, can, ptkobject, ptk;
assert = require('assert');
picture = require('../bin/core/modules/picture');
helper = require('../bin/common/helper');
can = it;
ptkobject = {
  picUrl: '/home/lhfcws/coding/projects/pictalk_backend/picture/test1.png',
  establisher: 'lhfcws@test.com'
};
ptk = {};
describe('Picture Unit Test', function(){
  describe('create-a-picture', function(){
    can('should create a picture `test1.png`', function(done){
      picture.createAPicture(ptkobject, function(err){
        return picture.getAPicture(ptkobject, function(err, result){
          if (err) {
            throw err;
          }
          ptk = result;
          assert.equal(result.mimetype, 'png');
          return done();
        });
      });
    });
  });
  describe('get-a-picture', function(){
    can('should return a picture object `test1.png`', function(done){
      picture.getAPicture(ptkobject, function(err, result){
        if (err) {
          throw err;
        }
        assert.equal(result.mimetype, 'png');
        return done();
      });
    });
  });
  describe('get-pictures', function(){
    can('should return picture object list [`test1.png`]', function(done){
      picture.getPictures(ptkobject, function(err, result){
        if (err) {
          throw err;
        }
        assert.equal(result[0].mimetype, 'png');
        return done();
      });
    });
  });
  describe('get-id', function(){
    can('should get a picture id', function(done){
      picture.getId(ptkobject, function(err, id){
        if (err) {
          throw err;
        }
        assert.equal(id, ptk._id);
        return done();
      });
    });
  });
  describe('delete-picture', function(){
    can('should delete picture `test1.png`', function(done){
      picture.deletePicture({
        _id: ptk._id
      }, function(err){
        if (err) {
          throw err;
        }
        return done();
      });
    });
  });
});