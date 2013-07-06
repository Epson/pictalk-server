(function(){
  var UserController, ChatController, PictureController, Core;
  UserController = require('./UserController');
  ChatController = require('./ChatController');
  PictureController = require('./PictureController');
  /** 
   * @namespace														Core
   * @description													处理核心业务逻辑的模块，调用各个子模块控制器以实现具体细节的操作
   * @requires 														UserController
   * @requires 														ChatController
   * @requires 														PictureController
   * @author 															赵剑（Cyril.Zhao）
   */
  Core = {
    /**
     * @function													user-register	
     * @memberof													Core
     * @description												核心模块中处理用户注册业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{String}username			用户输入的用户名
     * @param				{String}password 			用户输入的密码
     */
    userRegister: function(username, password){
      UserController.userRegister(username, password);
    }
    /**
     * @function													user-login	
     * @memberof													Core
     * @description												核心模块中处理用户登陆业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{String}username			用户输入的用户名
     * @param				{String}password 			用户输入的密码
     */,
    userLogin: function(username, password){
      UserController.userLogin(username, password);
    }
    /**
     * @function													user-password-update	
     * @memberof													Core
     * @description												核心模块中处理用户修改密码业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{String}new-password	用户输入的新密码
     * @param				{String}old-password 	用户输入的旧密码
     * @param				{Number}user-id 			用户输入的用户id
     */,
    userPasswordUpdate: function(newPassword, oldPassword, userId){
      UserController.userPasswordUpdate(newPassword, oldPassword, userId);
    }
    /**
     * @function													user-info-update
     * @memberof													Core
     * @description												核心模块中处理用户修改个人信息业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{Number}user-id				用户的id
     * @param				{String}email 				用户的电子邮件地址
     */,
    userInfoUpdate: function(userId, email){
      UserController.userInfoUpdate(userId, email);
    }
    /**
     * @function													user-destroy
     * @memberof													Core
     * @description												核心模块中处理用户注销帐号业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{Number}user-id				用户的id
     */,
    userDestroy: function(userId){
      UserController.userDestroy(userId);
    }
    /**
     * @function													user-info-read
     * @memberof													Core
     * @description												核心模块中处理用户获取个人信息业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{Number}user-id				用户的id
     */,
    userInfoRead: function(userId){
      UserController.userInfoRead(userId);
    }
    /**
     * @function													createChat
     * @memberof													Core
     * @description												核心模块中处理发送和创建聊天信息业务逻辑的方法，调用消息模块控制器进行具体细节的操作
     * @param				{Number}pic-id				图片的id
     * @param				{Number}from-user-id	消息发送者的用户id
     * @param				{Number}to-user-id		消息接收者的用户id
     * @param				{String}msg-type			消息类型，可以是文本或者声音
     * @param				{String}content				消息内容
     */,
    createChat: function(picId, fromUserId, toUserId, msgType, content){
      ChatController.createChat(picId, fromUserId, toUserId);
    }
    /**
     * @function													delete-chat
     * @memberof													Core
     * @description												核心模块中处理删除聊天消息业务逻辑的方法，调用消息模块控制器进行具体细节的操作
     * @param				{Number}chat-id				消息的id
     */,
    deleteChat: function(chatId){
      ChatController.deleteChat(chatId);
    }
    /**
     * @function													read-several-chat
     * @memberof													Core
     * @description												核心模块中处理根据图片获取多条相关聊天记录业务逻辑的方法，调用消息模块控制器进行具体细节的操作
     * @param				{Number}pic-id				图片的id
     */,
    readSeveralChat: function(picId){
      ChatController.readSeveralChat(picId);
    }
    /**
     * @function													create-friend
     * @memberof													Core
     * @description												核心模块中处理用户添加好友业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{Number}user-id				发起添加好友操作的用户的id
     * @param				{Number}friend-id			被添加为好友的用户的id
     * @param				{String}nick-name			为好友添加的昵称
     */,
    createFriend: function(userId, friendId, nickName){
      UserController.createFriend(userId, friendId, nickName);
    }
    /**
     * @function													delete-friend
     * @memberof													Core
     * @description												核心模块中处理用户删除好友业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{Number}user-id				发起删除好友操作的用户的id
     * @param				{Number}friend-id			被从好友列表中删除的用户的id
     */,
    deleteFriend: function(userId, friendId){
      UserController.deleteFriend(userId, friendId);
    }
    /**
     * @function													update-friend-nick-name
     * @memberof													Core
     * @description												核心模块中处理用户更改好友昵称业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{Number}user-id				发起修改好友昵称操作的用户的id
     * @param				{Number}friend-id			被修改昵称的好友的用户id
     * @param				{String}nick-name			要修改的昵称
     */,
    updateFriendNickName: function(userId, friendId, nickName){
      UserController.updateFriendNickName(userId, friendId, nickName);
    }
    /**
     * @function													update-friend-nick-name
     * @memberof													Core
     * @description												核心模块中处理用户获取好友个人信息业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{Number}user-id				发起读取好友个人信息操作的用户的id		
     * @param				{Number}friend-id			被读取信息的好友的用户id
     */,
    readFriendInfo: function(userId, friendId){
      UserController.readFriendInfo(userId, friendId);
    }
    /**
     * @function													read-friend-list
     * @memberof													Core
     * @description												核心模块中处理用户获取好友列表信息业务逻辑的方法，调用用户模块控制器进行具体细节的操作
     * @param				{Number}user-id				发起读取好友列表操作的用户的id	
     */,
    readFriendList: function(userId){
      UserController.readFriendList(userId);
    }
    /**
     * @function													read-friend-list
     * @memberof													Core
     * @description												核心模块中处理用户创建图片业务逻辑的方法，调用图片模块控制器进行具体细节的操作
     * @param				{Number}user-id				创建图片的用户的id
     * @param				{String}pic-url				新创建图片的url
     */,
    createPicture: function(userId, picUrl){
      PictureController.createPicture(userId, picUrl);
    }
    /**
     * @function													read-friend-list
     * @memberof													Core
     * @description												核心模块中处理用户删除图片业务逻辑的方法，调用图片模块控制器进行具体细节的操作
     * @param				{Number}user-id				删除图片的用户的id
     * @param				{Number}pic-id				被删除图片的id
     */,
    deletePicture: function(userId, picId){
      PictureController.deletePicture(userId, picId);
    }
    /**
     * @function													read-friend-list
     * @memberof													Core
     * @description												核心模块中处理用户获取图片信息业务逻辑的方法，调用图片模块控制器进行具体细节的操作
     * @param				{Number}user-id				要读取图片的用户的id
     * @param				{Number}pic-id				被读取的图片的id
     */,
    readPicture: function(userId, picId){
      PictureController.readPicture(userId, picId);
    }
    /**
     * @function													read-friend-list
     * @memberof													Core
     * @description												核心模块中处理根据特定用户获取与其相关的多张图片业务逻辑的方法，调用图片模块控制器进行具体细节的操作
     * @param				{Number}user-id				被指定的特定用户的id
     */,
    readPicturesByUser: function(userId){
      PictureController.readPicturesByUser;
    }
  };
  module.exports = Core;
}).call(this);
