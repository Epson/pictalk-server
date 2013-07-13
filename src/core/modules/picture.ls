/**
 * @description Picture Controller.
 * @author Lhfcws
 * @file
 **/

require! [fs, datetime, MD5, async, assert, './picture-model', '../../conf/errors']


format = (ptobject) ->
  return ptobject

basedir = (url) ->
  a = url.split('/')
  a[a.length - 1] = ''
  return a.join('/')

basename = (url) ->
  a = url.match /\/[\w|.]+$/
  a = a[0].slice(1)
  return a

mimetype = (url) ->
  a = basename url
  a = a.split('.')
  return a[a.length - 1]

objectify = (_picture) ->
  picture = {}
  if typeof _picture == 'string'
    picture.pic-id = _picture
  else
    picture = _picture
  return picture

/**
 * @description picture-model Controller
 * @module
 */
Picture =
  __generate-pt-id: (_picture, callback) ->
    picture-model.get-a-picture _picture, (err, result) ->
      return callback null, result._id.toHexString!

  create-a-picture: (_picture, callback) ->
    picture = {}
    picture.pic-url = _picture.pic-url
    picture.establisher = _picture.establisher
    picture.es-time = datetime.format new Date!, '%Y-%m-%d-%H-%M-%S' 
    picture.mimetype = mimetype _picture.pic-url
    picture.pic-name = basename _picture.pic-url

    fs.readFile _picture.pic-url, (err, data) ->
      picture.pic-id = MD5(data)
      picture-model.insert-picture picture, (err) ->
        Picture.__generate-pt-id picture, (err, pt-id) ->
          if err
            throw err
          picture-model.update-picture picture, {$set: {pt-id: pt-id}}, (err) ->
            if err
              throw err
            return callback null

  delete-picture: (_picture, callback) ->
    _picture = objectify _picture
    picture-model.delete-picture _picture, (err) ->
      return callback null

  get-a-picture: (_picture, callback) ->
    picture = objectify _picture
    picture-model.get-a-picture picture, (err, result) ->
      return callback null, result

  get-pictures: (picture, callback) ->
    if typeof picture != 'object'
      return callback 'Param error: It should be an object.'
    picture-model.get-pictures picture, (err, result) ->
      return callback null, result

  get-id: (_picture, callback) ->
    Picture.get-a-picture _picture, (err, result) ->
      return callback null, result.pt-id
  
module.exports <<< Picture
