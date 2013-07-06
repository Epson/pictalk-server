require! [
	"./UserController",
	"./ChatController",
	"./PictureController"]

/** 
 * @namespace														Core
 * @description													处理核心业务逻辑的模块，调用各个子模块控制器以实现具体细节的操作
 * @requires 														UserController
 * @requires 														ChatController
 * @requires 														PictureController
 * @author 															赵剑（Cyril.Zhao）
 */
Core = 

	/**
	 * @function													user-register	
	 * @memberof													Core
	 * @description												核心模块中处理用户注册业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{String}username			用户输入的用户名
	 * @param				{String}password 			用户输入的密码
	 */
	user-register: !(username, password) ->
		User-controller.user-register username, password

	/**
	 * @function													user-login	
	 * @memberof													Core
	 * @description												核心模块中处理用户登陆业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{String}username			用户输入的用户名
	 * @param				{String}password 			用户输入的密码
	 */
	user-login: !(username, password) ->
		User-controller.user-login username, password
		
	/**
	 * @function													user-password-update	
	 * @memberof													Core
	 * @description												核心模块中处理用户修改密码业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{String}new-password	用户输入的新密码
	 * @param				{String}old-password 	用户输入的旧密码
	 * @param				{Number}user-id 			用户输入的用户id
	 */
	user-password-update: !(new-password, old-password, user-id) ->
		User-controller.user-password-update new-password, old-password, user-id

	/**
	 * @function													user-info-update
	 * @memberof													Core
	 * @description												核心模块中处理用户修改个人信息业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{Number}user-id				用户的id
	 * @param				{String}email 				用户的电子邮件地址
	 */
	user-info-update: !(user-id, email) ->
		User-controller.user-info-update user-id, email

	/**
	 * @function													user-destroy
	 * @memberof													Core
	 * @description												核心模块中处理用户注销帐号业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{Number}user-id				用户的id
	 */
	user-destroy: !(user-id) ->
		User-controller.user-destroy user-id

	/**
	 * @function													user-info-read
	 * @memberof													Core
	 * @description												核心模块中处理用户获取个人信息业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{Number}user-id				用户的id
	 */
	user-info-read: !(user-id) ->
		User-controller.user-info-read user-id

	/**
	 * @function													createChat
	 * @memberof													Core
	 * @description												核心模块中处理发送和创建聊天信息业务逻辑的方法，调用消息模块控制器进行具体细节的操作
	 * @param				{Number}pic-id				图片的id
	 * @param				{Number}from-user-id	消息发送者的用户id
	 * @param				{Number}to-user-id		消息接收者的用户id
	 * @param				{String}msg-type			消息类型，可以是文本或者声音
	 * @param				{String}content				消息内容
	 */
	create-chat: !(pic-id, from-user-id, to-user-id, msg-type, content) ->
		Chat-controller.create-chat pic-id, from-user-id, to-user-id

	/**
	 * @function													delete-chat
	 * @memberof													Core
	 * @description												核心模块中处理删除聊天消息业务逻辑的方法，调用消息模块控制器进行具体细节的操作
	 * @param				{Number}chat-id				消息的id
	 */
	delete-chat: !(chat-id) ->
		Chat-controller.delete-chat chat-id

	/**
	 * @function													read-several-chat
	 * @memberof													Core
	 * @description												核心模块中处理根据图片获取多条相关聊天记录业务逻辑的方法，调用消息模块控制器进行具体细节的操作
	 * @param				{Number}pic-id				图片的id
	 */
	read-several-chat: !(pic-id) ->
		Chat-controller.read-several-chat pic-id

	/**
	 * @function													create-friend
	 * @memberof													Core
	 * @description												核心模块中处理用户添加好友业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{Number}user-id				发起添加好友操作的用户的id
	 * @param				{Number}friend-id			被添加为好友的用户的id
	 * @param				{String}nick-name			为好友添加的昵称
	 */
	create-friend: !(user-id, friend-id, nick-name) ->
		User-controller.create-friend user-id, friend-id, nick-name

	/**
	 * @function													delete-friend
	 * @memberof													Core
	 * @description												核心模块中处理用户删除好友业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{Number}user-id				发起删除好友操作的用户的id
	 * @param				{Number}friend-id			被从好友列表中删除的用户的id
	 */
	delete-friend: !(user-id, friend-id) ->
		User-controller.delete-friend user-id, friend-id

	/**
	 * @function													update-friend-nick-name
	 * @memberof													Core
	 * @description												核心模块中处理用户更改好友昵称业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{Number}user-id				发起修改好友昵称操作的用户的id
	 * @param				{Number}friend-id			被修改昵称的好友的用户id
	 * @param				{String}nick-name			要修改的昵称
	 */
	update-friend-nick-name: !(user-id, friend-id, nick-name) ->
		User-controller.update-friend-nick-name user-id, friend-id, nick-name

	/**
	 * @function													update-friend-nick-name
	 * @memberof													Core
	 * @description												核心模块中处理用户获取好友个人信息业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{Number}user-id				发起读取好友个人信息操作的用户的id		
	 * @param				{Number}friend-id			被读取信息的好友的用户id
	 */
	read-friend-info: !(user-id, friend-id) ->
		User-controller.read-friend-info user-id, friend-id

	/**
	 * @function													read-friend-list
	 * @memberof													Core
	 * @description												核心模块中处理用户获取好友列表信息业务逻辑的方法，调用用户模块控制器进行具体细节的操作
	 * @param				{Number}user-id				发起读取好友列表操作的用户的id	
	 */
	read-friend-list: !(user-id) ->
		User-controller.read-friend-list user-id

	/**
	 * @function													read-friend-list
	 * @memberof													Core
	 * @description												核心模块中处理用户创建图片业务逻辑的方法，调用图片模块控制器进行具体细节的操作
	 * @param				{Number}user-id				创建图片的用户的id
	 * @param				{String}pic-url				新创建图片的url
	 */
	create-picture: !(user-id, pic-url) ->
		Picture-controller.create-picture user-id, pic-url

	/**
	 * @function													read-friend-list
	 * @memberof													Core
	 * @description												核心模块中处理用户删除图片业务逻辑的方法，调用图片模块控制器进行具体细节的操作
	 * @param				{Number}user-id				删除图片的用户的id
	 * @param				{Number}pic-id				被删除图片的id
	 */
	delete-picture: !(user-id, pic-id) ->
		Picture-controller.delete-picture user-id, pic-id

	/**
	 * @function													read-friend-list
	 * @memberof													Core
	 * @description												核心模块中处理用户获取图片信息业务逻辑的方法，调用图片模块控制器进行具体细节的操作
	 * @param				{Number}user-id				要读取图片的用户的id
	 * @param				{Number}pic-id				被读取的图片的id
	 */
	read-picture: !(user-id, pic-id) ->
		Picture-controller.read-picture user-id, pic-id

	/**
	 * @function													read-friend-list
	 * @memberof													Core
	 * @description												核心模块中处理根据特定用户获取与其相关的多张图片业务逻辑的方法，调用图片模块控制器进行具体细节的操作
	 * @param				{Number}user-id				被指定的特定用户的id
	 */
	read-pictures-by-user: !(user-id) ->
		Picture-controller.read-pictures-by-user

module.exports = Core

