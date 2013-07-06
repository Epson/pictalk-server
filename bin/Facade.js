(function(){
  var Core, EventCenter, Facade;
  Core = require('./Core');
  EventCenter = require('./EventCenter');
  /**
   * @description													核心程序与路由程序进行交互的接口，实现了内部机制的隐藏
   * @namespace 													Facade
   * @requires 														Core
   * @requires 														EventCenter
   * @author															赵剑（Cyril.Zhao）
   */
  Facade = {
    /**
     * @function													user-register	
     * @memberof													Facade
     * @description												处理用户注册业务逻辑的接口，处理完毕后将结果通过res-user-register事件返回给shell模块
     * @param				{String}username			用户输入的用户名
     * @param				{String}password 			用户输入的密码
     */
    userRegister: function(username, password){
      var result;
      result = Core.userRegister(username, password);
    }
    /**
     * @function													user-login	
     * @memberof													Facade		
     * @description												处理用户登陆业务逻辑的接口，处理完毕后将结果通过res-user-login事件返回给shell模块
     * @param				{String}username			用户输入的用户名
     * @param				{String}password			用户输入的密码
     */,
    userLogin: function(username, password){
      var result;
      result = Core.userLogin(username, password);
    }
    /**
     * @function													user-password-update	
     * @memberof													Facade	
     * @description												处理用户更改密码业务逻辑的接口，处理完毕后将结果通过res-user-password-update事件返回给shell模块
     * @param				{String}new-password	用户输入的新密码
     * @param				{String}old-password	用户输入的旧密码
     * @param				{Number}user-id				用户的id
     */,
    userPasswordUpdate: function(newPassword, oldPassword, userId){
      var result;
      result = Core.userPasswordUpdate(newPassword, oldPassword, userId);
    }
    /**
     * @function													user-info-update	
     * @memberof													Facade						
     * @description												处理用户修改个人信息业务逻辑的接口，处理完毕后将结果通过res-user-info-update事件返回给shell模块
     * @param				{Number}user-id				用户的id
     * @param				{String}email					用户要更新的电子邮件地址
     */,
    userInfoUpdate: function(userId, email){}
    /**
     * @function													user-destroy	
     * @memberof													Facade	
     * @description												处理用户注销账户业务逻辑的接口，处理完毕后将结果通过res-user-destroy事件返回给shell模块
     * @param				{Number}user-id				用户的id
     */,
    userDestroy: function(userId){}
    /**
     * @function													user-info-read	
     * @memberof													Facade				
     * @description												处理用户获取个人信息业务逻辑的接口，处理完毕后将结果通过res-user-info-read事件返回给shell模块
     * @param				{Number}user-id				用户的id
     */,
    userInfoRead: function(userId){}
    /**
     * @function													create-chat		
     * @memberof													Facade
     * @description												处理发送聊天消息业务逻辑的接口，处理完毕后将结果通过res-create-chat事件返回给shell模块
     * @param				{Number}pic-id				图片的id
     * @param				{Number}from-user-id	消息发送者的用户id
     * @param				{Number}to-user-id		消息接收者的用户id
     * @param				{String}msg-type			消息类型，可以是文本或者声音
     * @param				{String}content				消息内容
     */,
    createChat: function(picId, fromUserId, toUserId, msgType, content){}
    /**
     * @function													delete-chat		
     * @memberof													Facade	
     * @description												处理删除聊天记录业务逻辑的接口，处理完毕后将结果通过res-delete-chat事件返回给shell模块
     * @param				{Number}chat-id				要删除的消息的id
     */,
    deleteChat: function(chatId){}
    /**
     * @function													read-several-chat	
     * @memberof													Facade
     * @description												处理读取与特定图片相关的多条聊天记录业务逻辑的接口，处理完毕后将结果通过res-read-several-chat事件返回给shell模块
     * @param				{Number}pic-id				要指定获取聊天记录的图片id
     */,
    readSeveralChat: function(picId){}
    /**
     * @function												  create-friend	
     * @memberof												  Facade		
     * @description											  处理添加好友业务逻辑的接口，处理完毕后将结果通过res-create-friend事件返回给shell模块
     * @param				{Number}user-id				发起添加好友操作的用户的id
     * @param				{Number}friend-id			被添加为好友的用户的id
     * @param				{String}nick-name			为好友添加的昵称
     */,
    createFriend: function(userId, friendId, nickName){}
    /**
     * @function												delete-friend		
     * @memberof												Facade				
     * @description											处理删除好友业务逻辑的接口，处理完毕后将结果通过res-delete-friend事件返回给shell模块	
     * @param				{Number}user-id			发起删除好友操作的用户的id
     * @param				{Number}friend-id		被从好友列表中删除的用户的id
     */,
    deleteFriend: function(userId, friendId){}
    /**
     * @function												update-friend-nick-name		
     * @memberof												Facade			
     * @description											处理修改好友昵称业务逻辑的接口，处理完毕后将结果通过res-update-friend-nick-name事件返回给shell模块
     * @param				{Number}user-id			发起修改好友昵称操作的用户的id
     * @param				{Number}friend-id		被修改昵称的好友的用户id
     * @param				{String}nick-name		要修改的昵称
     */,
    updateFriendNickName: function(userId, friendId, nickName){}
    /**
     * @function												read-friend-info	
     * @memberof												Facade
     * @description											处理读取好友个人信息业务逻辑的接口，处理完毕后将结果通过res-read-friend-info事件返回给shell模块
     * @param				{Number}user-id			发起读取好友个人信息操作的用户的id		
     * @param				{Number}friend-id		被读取信息的好友的用户id
     */,
    readFriendInfo: function(userId, friendId){}
    /**
     * @function												read-friend-list		
     * @memberof												Facade
     * @description											处理读取好友列表信息业务逻辑的接口，处理完毕后将结果通过res-read-friend-list事件返回给shell模块
     * @param				{Number}user-id			发起读取好友列表操作的用户的id
     */,
    readFriendList: function(userId){}
    /**
     * @function												create-picture	
     * @memberof												Facade		
     * @description											处理创建图片业务逻辑的接口，处理完毕后将结果通过res-create-picture事件返回给shell模块
     * @param				{Number}user-id			创建图片的用户的id
     * @param				{String}pic-url			新创建图片的url
     */,
    createPicture: function(userId, picUrl){}
    /**
     * @function												delete-picture	
     * @memberof												Facade
     * @description											处理删除图片业务逻辑的接口，处理完毕后将结果通过res-delete-picture事件返回给shell模块
     * @param				{Number}user-id			删除图片的用户的id
     * @param				{Number}pic-id			被删除图片的id
     */,
    deletePicture: function(userId, picId){}
    /**
     * @function												read-picture	
     * @memberof												Facade	
     * @description											处理读取图片业务逻辑的接口，处理完毕后将结果通过res-read-picture事件返回给shell模块
     * @param				{Number}user-id			要读取图片的用户的id
     * @param				{Number}pic-id			被读取的图片的id
     */,
    readPicture: function(userId, picId){}
    /**
     * @function												read-picture-by-user
     * @memberof												Facade			
     * @description											处理读取与特定用户相关的所有图片业务逻辑的接口，处理完毕后将结果通过res-read-pictures-by-user事件返回给shell模块
     * @param				{Number}user-id			被指定的特定用户的id
     */,
    readPicturesByUser: function(userId){}
    /**
     * @function												subscribe-events	
     * @memberof												Facade					
     * @description											绑定事件的方法，将所有的处理函数作为相应事件的回调函数托管到事件中心EventCenter中
     */,
    subscribeEvents: function(){
      EventCenter.bind("user-register", this.userRegister);
      EventCenter.bind("user-login", this.userLogin);
      EventCenter.bind("user-password-update", this.userPasswordUpdate);
      EventCenter.bind("user-info-update", this.userInfoUpdate);
      EventCenter.bind("user-destroy", this.userDestroy);
      EventCenter.bind("user-info-read", this.userInfoRead);
      EventCenter.bind("create-chat", this.createChat);
      EventCenter.bind("delete-chat", this.deleteChat);
      EventCenter.bind("read-several-chat", this.readSeveralChat);
      EventCenter.bind("create-friend", this.createFriend);
      EventCenter.bind("delete-friend", this.deleteFriend);
      EventCenter.bind("update-friend-nick-name", this.updateFriendNickName);
      EventCenter.bind("read-friend-info", this.readFriendInfo);
      EventCenter.bind("read-friend-list", this.readFriendList);
      EventCenter.bind("create-picture", this.createPicture);
      EventCenter.bind("delete-picture", this.deletePicture);
      EventCenter.bind("read-picture", this.readPicture);
      EventCenter.bind("read-pictures-by-user", this.readPicturesByUser);
    }
    /**
     * @function												init			
     * @memberof												Facade
     * @description											初始化函数，完成事件的托管
     */,
    init: function(){
      this.subscribeEvents();
    }
  };
  module.exports = Facade;
}).call(this);
