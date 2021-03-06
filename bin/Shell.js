(function(){
  var express, EventCenter, Facade, app, userRegister, userLogin, userPasswordUpdate, userInfoUpdate, userUploadAvatar, userDestroy, userInfoRead, createChat, readSeveralChat, createFriend, deleteFriend, updateFriendNickName, readFriendInfo, readFriendList, createPicture, deletePicture, readPicture, readPicturesByUser, Shell;
  express = require('express');
  EventCenter = require('./EventCenter');
  Facade = require('./Facade');
  app = express();
  app.configure(function(){
    var bodyParams;
    bodyParams = {
      uploadDir: __dirname + "/../upload"
    };
    app.use(express.bodyParser(bodyParams));
    app.use(express['static'](__dirname + "/../public"));
    app.set("port", process.env.PORT || 8888);
  });
  app.configure("development", function(){
    app.use(express.errorHandler());
  });
  /**
   * @description 								用户注册
   * @function 										user-register
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  userRegister = function(req, res){
    var email, password;
    email = req.body.email;
    password = req.body.password;
    EventCenter.bind('res-user-register', function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.userRegister(email, password);
  };
  /**
   * @description 								用户登陆
   * @function 										user-login
   * @memberof										Shell
   * @param 			{Object}req 		请求对象
   * @param				{Object}res 		响应对象
   */
  userLogin = function(req, res){
    var email, password;
    email = req.body.email;
    password = req.body.password;
    EventCenter.bind('res-user-login', function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.userLogin(email, password);
  };
  /**
   * @description 								用户修改密码
   * @function 										user-password-update
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  userPasswordUpdate = function(req, res){
    var newPassword, oldPassword, userId;
    newPassword = req.body.newPassword;
    oldPassword = req.body.oldPassword;
    userId = req.body.userId;
    EventCenter.bind("res-user-password-update", function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.userPasswordUpdate(newPassword, oldPassword, userId);
  };
  /**
   * @description 								用户修改个人信息
   * @function 										user-info-update
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  userInfoUpdate = function(req, res){
    var userId, avatar, mobile;
    userId = req.body.userId;
    avatar = req.body.avatar;
    mobile = req.body.mobile;
    EventCenter.bind("res-user-info-update", function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.userInfoUpdate(userId, avatar, mobile);
  };
  userUploadAvatar = function(req, res){
    var upfile;
    console.log(req.files);
    upfile = req.files.upfile;
  };
  /**
   * @description 								用户注销帐号
   * @function 										user-destroy
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  userDestroy = function(req, res){
    var userId;
    userId = req.body.userId;
    EventCenter.bind("res-user-destroy", function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.userDestroy(userId);
  };
  /**
   * @description 								获取用户个人信息
   * @function 										user-info-read
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  userInfoRead = function(req, res){
    var userId;
    userId = req.query.userId;
    EventCenter.bind("res-user-info-read", function(err, user){
      var result;
      result = {
        err: err,
        user: user
      };
      res.end(JSON.stringify(result));
    });
    Facade.userInfoRead(userId);
  };
  /**
   * @description 								创建一条聊天记录
   * @function 										create-chat
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  createChat = function(req, res){
    var chats, numOfChats, numOfChatsCreated, i$, to$, i, ptId, fromUserId, toUserId, msgBody, time, anchor;
    chats = req.body.chats;
    numOfChats = chats.length;
    numOfChatsCreated = 0;
    EventCenter.bind("res-create-chat", function(err){
      var result;
      numOfChatsCreated += 1;
      if (numOfChatsCreated === numOfChats) {
        result = {
          err: err
        };
        res.end(JSON.stringify(result));
      }
    });
    for (i$ = 0, to$ = chats.length; i$ < to$; ++i$) {
      i = i$;
      ptId = chats[i].ptId;
      fromUserId = chats[i].fromUserId;
      toUserId = chats[i].toUserId;
      msgBody = chats[i].msgBody;
      time = chats[i].time;
      anchor = chats[i].anchor;
      Facade.createChat(ptId, fromUserId, toUserId, msgBody, time, anchor);
    }
  };
  /**
   * @description 								获取同一张图片上的所有聊天记录
   * @function 										read-several-chat
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  readSeveralChat = function(req, res){
    var ptId;
    ptId = req.body.ptId;
    EventCenter.bind("res-read-several-chat", function(err, chats){
      var result;
      result = {
        err: err,
        chats: chats
      };
      res.end(JSON.stringify(result));
    });
    Facade.readSeveralChat(ptId);
  };
  /**
   * @description 								添加一位好友
   * @function 										create-friend
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  createFriend = function(req, res){
    var userId, friendId;
    userId = req.body.userId;
    friendId = req.body.friendId;
    EventCenter.bind("res-create-friend", function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.createFriend(userId, friendId);
  };
  /**
   * @description 								删除一位好友
   * @function 										delete-friend
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  deleteFriend = function(req, res){
    var userId, friendId;
    userId = req.body.userId;
    friendId = req.body.friendId;
    EventCenter.bind("res-delete-friend", function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.deleteFriend(userId, friendId);
  };
  /**
   * @description 								更新好友昵称信息
   * @function 										update-friend-nick-name
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  updateFriendNickName = function(req, res){
    var userId, friendId, nickName;
    userId = req.body.userId;
    friendId = req.body.friendId;
    nickName = req.body.nickName;
    EventCenter.bind("res-update-friend-nick-name", function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.updateFriendNickName(userId, friendId, nickName);
  };
  /**
   * @description 								获取某个好友的个人信息
   * @function 										read-friend-info
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  readFriendInfo = function(req, res){
    var userId, friendId;
    userId = req.body.userId;
    friendId = req.body.friendId;
    EventCenter.bind("res-read-friend-info", function(err, friend){
      var result;
      result = {
        err: err,
        friend: friend
      };
      res.end(JSON.stringify(result));
    });
    Facade.readFriendInfo(userId, friendId);
  };
  /**
   * @description 								获取好友列表中所有好友的基本信息，包括好友的id和昵称
   * @function 										read-friend-list
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  readFriendList = function(req, res){
    var userId;
    userId = req.query.userId;
    EventCenter.bind("res-read-friend-list", function(err, friends){
      var result;
      result = {
        err: err,
        friends: friends
      };
      res.end(JSON.stringify(result));
    });
    Facade.readFriendList(userId);
  };
  /**
   * @description 								创建一张图片
   * @function 										create-picture
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  createPicture = function(req, res){
    var userId, picUrl;
    userId = req.body.userId;
    picUrl = req.body.picUrl;
    EventCenter.bind("res-create-picture", function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.createPicture(userId, picUrl);
  };
  /**
   * @description 								删除一张图片，同时还会附带删除所有与该图片相关的聊天记录
   * @function 										delete-picture
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  deletePicture = function(req, res){
    var userId, picId;
    userId = req.body.userId;
    picId = req.body.picId;
    EventCenter.bind("res-delete-picture", function(err){
      var result;
      result = {
        err: err
      };
      res.end(JSON.stringify(result));
    });
    Facade.deletePicture(userId, picId);
  };
  /**
   * @description 								获取一张图片
   * @function 										read-picture
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  readPicture = function(req, res){
    var userId, picId;
    userId = req.body.userId;
    picId = req.body.picId;
    EventCenter.bind("res-read-picture", function(err, picture){
      var result;
      result = {
        err: err,
        picture: picture
      };
      res.end(JSON.stringify(result));
    });
    Facade.readPicture(userId, picId);
  };
  /**
   * @description 								根据特定用户获取多张图片，包含每张图片的id和url
   * @function 										read-pictures-by-user
   * @memberof										Shell
   * @param 			{Object}req 		请求对象	
   * @param				{Object}res 		响应对象
   */
  readPicturesByUser = function(req, res){
    var userId;
    userId = req.body.userId;
    EventCenter.bind("res-read-pictures-by-user", function(err, pictures){
      var result;
      result = {
        err: err,
        pictures: pictures
      };
      res.end(JSON.stringify(result));
    });
    Facade.readPicturesByUser(userId);
  };
  /**
   * @namespace 									Shell
   * @description 								负责与客户端进行数据交互的模块
   * @requires 										fs
   * @requires 										express
   * @requires 										EventCenter
   * @requires 										Facade
   * @author
   */
  Shell = {
    /**
     * @description								初始化路由设置
     * @function
     * @memberof									Shell
     */
    route: function(){
      app.post("/users/user-register", userRegister);
      app.post("/users/user-login", userLogin);
      app.post("/users/user-password-update", userPasswordUpdate);
      app.post("/users/user-upload-avatar", userUploadAvatar);
      app.post("/users/user-info-update", userInfoUpdate);
      app['delete']("/users/user-destroy", userDestroy);
      app.get("/users/user-info-read", userInfoRead);
      app.post("/chats/create-chat", createChat);
      app.get("/chats/read-several-chat", readSeveralChat);
      app.post("/friends/create-friend", createFriend);
      app['delete']("/friends/delete-friend", deleteFriend);
      app.post("/friends/update-friend-nick-name", updateFriendNickName);
      app.get("/friends/read-friend-info", readFriendInfo);
      app.get("/friends/read-friend-list", readFriendList);
      app.post("/pics/create-picture", createPicture);
      app['delete']("/pics/delete-picture", deletePicture);
      app.get("/pics/read-picture", readPicture);
      app.get("/pics/read-pictures-by-user", readPicturesByUser);
    }
    /**
     * @description								初始化模块的函数
     * @function
     * @memberof									Shell
     */,
    init: function(){
      this.route();
      app.listen(app.get("port"), function(){
        console.log("server is listening to port " + app.get("port"));
      });
    }
  };
  module.exports = Shell;
}).call(this);
