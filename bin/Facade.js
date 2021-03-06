(function(){
  var async, user, friend, message, picture, EventCenter, Facade;
  async = require('async');
  user = require('./core/modules/user');
  friend = require('./core/modules/friend');
  message = require('./core/modules/message');
  picture = require('./core/modules/picture');
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
     * @param				{String}email					用户输入的电子邮件地址
     * @param				{String}password 			用户输入的密码
     */
    userRegister: function(email, password){
      var userObj, callback;
      userObj = {
        email: email,
        password: password
      };
      callback = function(err){
        EventCenter.trigger("res-user-register", [err]);
      };
      user.register(userObj, callback);
    }
    /**
     * @function													user-login	
     * @memberof													Facade		
     * @description												处理用户登陆业务逻辑的接口，处理完毕后将结果通过res-user-login事件返回给shell模块
     * @param				{String}email					用户输入的电子邮件地址
     * @param				{String}password			用户输入的密码
     */,
    userLogin: function(email, password){
      var userObj, callback;
      userObj = {
        userId: email,
        password: password
      };
      callback = function(err){
        EventCenter.trigger("res-user-login", [err]);
      };
      user.login(userObj, callback);
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
      var userObj, callback;
      userObj = {
        userId: userId,
        password: oldPassword,
        newPassword: newPassword
      };
      callback = function(err){
        EventCenter.trigger("res-user-password-update", [err]);
      };
      user.changePassword(userObj, callback);
    }
    /**
     * @function													user-info-update	
     * @memberof													Facade						
     * @description												处理用户修改个人信息业务逻辑的接口，处理完毕后将结果通过res-user-info-update事件返回给shell模块
     * @param				{Number}user-id				用户的id
     * @param				{String}email					用户要更新的电子邮件地址
     */,
    userInfoUpdate: function(userId, avatar, mobile){
      var userObj, callback;
      userObj = {
        userId: userId
      };
      if (avatar != null) {
        userObj.avatar = avatar;
      }
      if (mobile != null) {
        userObj.mobile = mobile;
      }
      callback = function(err){
        EventCenter.trigger("res-user-info-update", [err]);
      };
      user.updateUserInfo(userObj, callback);
    }
    /**
     * @function													user-destroy	
     * @memberof													Facade	
     * @description												处理用户注销账户业务逻辑的接口，处理完毕后将结果通过res-user-destroy事件返回给shell模块
     * @param				{Number}user-id				用户的id
     */,
    userDestroy: function(userId){
      var userObj, callback;
      userObj = {
        userId: userId
      };
      callback = function(err){
        EventCenter.trigger("res-user-destroy", [err]);
      };
      user.deleteUser(userObj, callback);
    }
    /**
     * @function													user-info-read	
     * @memberof													Facade				
     * @description												处理用户获取个人信息业务逻辑的接口，处理完毕后将结果通过res-user-info-read事件返回给shell模块
     * @param				{Number}user-id				用户的id
     */,
    userInfoRead: function(userId){
      var userObj, callback;
      userObj = {
        userId: userId
      };
      callback = function(err, user){
        EventCenter.trigger("res-user-info-read", [err, user]);
      };
      user.getAUser(userObj, callback);
    }
    /**
     * @function													create-chat		
     * @memberof													Facade
     * @description												处理发送聊天消息业务逻辑的接口，处理完毕后将结果通过res-create-chat事件返回给shell模块
     * @param				{Number}pt-id					图片的id
     * @param				{Number}from-user-id	消息发送者的用户id
     * @param				{Number}to-user-id		消息接收者的用户id
     * @param				{String}msg-type			消息类型，可以是文本或者声音
     * @param				{String}content				消息内容
     */,
    createChat: function(ptId, fromUserId, toUserId, msgBody, time, anchor){
      var msgObject, callback;
      msgObject = {
        ptId: ptId,
        sender: fromUserId,
        receiver: toUserId,
        msgBody: msgBody,
        time: time,
        anchor: anchor
      };
      callback = function(err){
        EventCenter.trigger("res-create-chat", [err]);
      };
      message.createAMessage(msgObject, callback);
    }
    /**
     * @function														read-several-chat	
     * @memberof														Facade
     * @description													处理读取与特定图片相关的多条聊天记录业务逻辑的接口，处理完毕后将结果通过res-read-several-chat事件返回给shell模块
     * @param				{Number}pt-id						要指定获取聊天记录的图片id
     */,
    readSeveralChat: function(ptId){
      var msgObject, callback;
      msgObject = {
        ptId: ptId
      };
      callback = function(err, chats){
        EventCenter.trigger("res-read-several-chat", [err, chats]);
      };
      message.getMessageListByPicture(msgObject, callback);
    }
    /**
     * @function												  create-friend	
     * @memberof												  Facade		
     * @description											  处理添加好友业务逻辑的接口，处理完毕后将结果通过res-create-friend事件返回给shell模块
     * @param				{Number}user-id				发起添加好友操作的用户的id
     * @param				{Number}friend-id			被添加为好友的用户的id
     * @param				{String}nick-name			为好友添加的昵称
     */,
    createFriend: function(userId, friendId){
      var friendObj, callback;
      friendObj = {
        userId: userId,
        friendId: friendId
      };
      callback = function(err){
        EventCenter.trigger("res-create-friend", [err]);
      };
      friend.addFriend(friendObj, callback);
    }
    /**
     * @function												delete-friend		
     * @memberof												Facade				
     * @description											处理删除好友业务逻辑的接口，处理完毕后将结果通过res-delete-friend事件返回给shell模块	
     * @param				{Number}user-id			发起删除好友操作的用户的id
     * @param				{Number}friend-id		被从好友列表中删除的用户的id
     */,
    deleteFriend: function(userId, friendId){
      var friendObj, callback;
      friendObj = {
        userId: userId,
        friendId: friendId
      };
      callback = function(err){
        EventCenter.trigger("res-delete-friend", [err]);
      };
      friend.addFriend(friendObj, callback);
    }
    /**
     * @function												update-friend-nick-name		
     * @memberof												Facade			
     * @description											处理修改好友昵称业务逻辑的接口，处理完毕后将结果通过res-update-friend-nick-name事件返回给shell模块
     * @param				{Number}user-id			发起修改好友昵称操作的用户的id
     * @param				{Number}friend-id		被修改昵称的好友的用户id
     * @param				{String}nick-name		要修改的昵称
     */,
    updateFriendNickName: function(userId, friendId, friendNickname){
      var friendObj, callback;
      friendObj = {
        userId: userId,
        friendId: friendId,
        friendNickname: friendNickname
      };
      callback = function(err){
        EventCenter.trigger("res-update-friend-nick-name", [err]);
      };
      friend.addFriend(friendObj, callback);
    }
    /**
     * @function												read-friend-info	
     * @memberof												Facade
     * @description											处理读取好友个人信息业务逻辑的接口，处理完毕后将结果通过res-read-friend-info事件返回给shell模块
     * @param				{Number}user-id			发起读取好友个人信息操作的用户的id		
     * @param				{Number}friend-id		被读取信息的好友的用户id
     */,
    readFriendInfo: function(userId, friendId){
      var friendObj, callback;
      friendObj = {
        userId: friendId
      };
      callback = function(err, friend){
        EventCenter.trigger("res-read-friend-info", [err, friend]);
      };
      user.getAUser(friendObj, callback);
    }
    /**
     * @function												read-friend-list		
     * @memberof												Facade
     * @description											处理读取好友列表信息业务逻辑的接口，处理完毕后将结果通过res-read-friend-list事件返回给shell模块
     * @param				{Number}user-id			发起读取好友列表操作的用户的id
     */,
    readFriendList: function(userId){
      var friendObj, getFriendList;
      friendObj = {
        userId: userId
      };
      getFriendList = function(err, friends){
        var friendArray, callback, i$, to$, i, userObj;
        friendArray = [];
        callback = function(err, friend){
          var friendInfo;
          friendInfo = {
            userId: friend.userId
          };
          if (friend.nickname != null) {
            friendInfo.username = friend.nickname;
          } else {
            friendInfo.username = friend.username;
          }
          if (friendArray.length < friends.length) {
            friendArray.push(friendInfo);
          }
          if (deepEq$(friendArray.length, friends.length, '===')) {
            EventCenter.trigger("res-read-friend-list", [err, friendArray]);
          }
        };
        for (i$ = 0, to$ = friends.length; i$ < to$; ++i$) {
          i = i$;
          userObj = {
            userId: friends[i].friendId
          };
          user.getAUser(userObj, callback);
        }
      };
      friend.getFriendsByUser(friendObj, getFriendList);
    }
    /**
     * @function												create-picture	
     * @memberof												Facade		
     * @description											处理创建图片业务逻辑的接口，处理完毕后将结果通过res-create-picture事件返回给shell模块
     * @param				{Number}user-id			创建图片的用户的id
     * @param				{String}pic-url			新创建图片的url
     */,
    createPicture: function(userId, picUrl){
      var pictureObj, callback;
      pictureObj = {
        establisher: userId,
        picUrl: picUrl
      };
      callback = function(err){
        EventCenter.trigger("res-create-picture", [err]);
      };
      picture.createAPicture(pictureObj, callback);
    }
    /**
     * @function												delete-picture	
     * @memberof												Facade
     * @description											处理删除图片业务逻辑的接口，处理完毕后将结果通过res-delete-picture事件返回给shell模块
     * @param				{Number}user-id			删除图片的用户的id
     * @param				{Number}pic-id			被删除图片的id
     */,
    deletePicture: function(userId, picId){
      var pictureObj, callback;
      pictureObj = {
        picId: picId
      };
      callback = function(err){
        EventCenter.trigger("res-delete-picture", [err]);
      };
      picture.deletePicture(pictureObj, callback);
    }
    /**
     * @function												read-picture	
     * @memberof												Facade	
     * @description											处理读取图片业务逻辑的接口，处理完毕后将结果通过res-read-picture事件返回给shell模块
     * @param				{Number}user-id			要读取图片的用户的id
     * @param				{Number}pic-id			被读取的图片的id
     */,
    readPicture: function(userId, picId){
      var pictureObj, callback;
      pictureObj = {
        userId: userId,
        picId: picId
      };
      callback = function(err, picture){
        EventCenter.trigger("res-read-picture", [err, picture]);
      };
      picture.getAPicture(pictureObj, callback);
    }
    /**
     * @function												read-picture-by-user
     * @memberof												Facade			
     * @description											处理读取与特定用户相关的所有图片业务逻辑的接口，处理完毕后将结果通过res-read-pictures-by-user事件返回给shell模块
     * @param				{Number}user-id			被指定的特定用户的id
     */,
    readPicturesByUser: function(userId){
      var pictureObj, callback;
      pictureObj = {
        userId: userId
      };
      callback = function(err, pictures){
        EventCenter.trigger("res-read-pictures-by-user", [err, pictures]);
      };
      picture.getPictures(pictureObj, callback);
    }
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
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) { 
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);
