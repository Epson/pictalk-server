

require! [async,
	"./core/modules/user",
	"./core/modules/friend",
	"./core/modules/message",
	"./core/modules/picture",
	"./EventCenter"]
	
/**
 * @description													核心程序与路由程序进行交互的接口，实现了内部机制的隐藏
 * @namespace 													Facade
 * @requires 														Core
 * @requires 														EventCenter
 * @author															赵剑（Cyril.Zhao）
 */
Facade = 
	/**
	 * @function													user-register	
	 * @memberof													Facade
	 * @description												处理用户注册业务逻辑的接口，处理完毕后将结果通过res-user-register事件返回给shell模块
	 * @param				{String}email					用户输入的电子邮件地址
	 * @param				{String}password 			用户输入的密码
	 */															
	user-register: !(email, password) ->
		user-obj = 
			email: email,
			password: password
		callback = !(err)->
			EventCenter.trigger "res-user-register", [err]
		user.register user-obj, callback

	/**
	 * @function													user-login	
	 * @memberof													Facade		
	 * @description												处理用户登陆业务逻辑的接口，处理完毕后将结果通过res-user-login事件返回给shell模块
	 * @param				{String}email					用户输入的电子邮件地址
	 * @param				{String}password			用户输入的密码
	 */
	user-login: !(email, password) ->	
		user-obj = 
			user-id: email,
			password: password
		callback = !(err)->
			EventCenter.trigger "res-user-login", [err]
		user.login user-obj, callback
		

	/**
	 * @function													user-password-update	
	 * @memberof													Facade	
	 * @description												处理用户更改密码业务逻辑的接口，处理完毕后将结果通过res-user-password-update事件返回给shell模块
	 * @param				{String}new-password	用户输入的新密码
	 * @param				{String}old-password	用户输入的旧密码
	 * @param				{Number}user-id				用户的id
	 */
	user-password-update: !(new-password, old-password, user-id) ->
		user-obj = 
			user-id: user-id,
			password: old-password,
			new-password: new-password
		callback = !(err) ->
			EventCenter.trigger "res-user-password-update", [err]
		user.change-password user-obj, callback

	/**
	 * @function													user-info-update	
	 * @memberof													Facade						
	 * @description												处理用户修改个人信息业务逻辑的接口，处理完毕后将结果通过res-user-info-update事件返回给shell模块
	 * @param				{Number}user-id				用户的id
	 * @param				{String}email					用户要更新的电子邮件地址
	 */
	user-info-update: !(user-id, avatar, mobile) ->
		user-obj = 
			user-id: user-id
		if avatar? 
			user-obj.avatar = avatar
		if mobile? 
			user-obj.mobile = mobile
		callback = !(err) ->
			EventCenter.trigger "res-user-info-update", [err]
		user.update-user-info user-obj, callback

	/**
	 * @function													user-destroy	
	 * @memberof													Facade	
	 * @description												处理用户注销账户业务逻辑的接口，处理完毕后将结果通过res-user-destroy事件返回给shell模块
	 * @param				{Number}user-id				用户的id
	 */
	user-destroy: !(user-id) ->
		user-obj = 
			user-id: user-id
		callback = !(err) ->
			EventCenter.trigger "res-user-destroy", [err]
		user.delete-user user-obj, callback

	/**
	 * @function													user-info-read	
	 * @memberof													Facade				
	 * @description												处理用户获取个人信息业务逻辑的接口，处理完毕后将结果通过res-user-info-read事件返回给shell模块
	 * @param				{Number}user-id				用户的id
	 */
	user-info-read: !(user-id) ->
		user-obj = 
			user-id: user-id
		callback = !(err, user) ->
			EventCenter.trigger "res-user-info-read", [err, user]
		user.get-a-user user-obj, callback

	/**
	 * @function													create-chat		
	 * @memberof													Facade
	 * @description												处理发送聊天消息业务逻辑的接口，处理完毕后将结果通过res-create-chat事件返回给shell模块
	 * @param				{Number}pt-id					图片的id
	 * @param				{Number}from-user-id	消息发送者的用户id
	 * @param				{Number}to-user-id		消息接收者的用户id
	 * @param				{String}msg-type			消息类型，可以是文本或者声音
	 * @param				{String}content				消息内容
	 */
	create-chat: !(pt-id, from-user-id, to-user-id, msg-body, time, anchor) ->
		msg-object = 
			pt-id: pt-id,
			sender: from-user-id,
			receiver: to-user-id,
			msg-body: msg-body,
			time: time,
			anchor: anchor
		callback = !(err) ->
			EventCenter.trigger "res-create-chat", [err]
		message.create-a-message msg-object, callback

	# /**
	#  * @function													delete-chat		
	#  * @memberof													Facade	
	#  * @description												处理删除聊天记录业务逻辑的接口，处理完毕后将结果通过res-delete-chat事件返回给shell模块
	#  * @param				{Number}chat-id				要删除的消息的id
	#  */
	# delete-chat: !(chat-id) ->

	/**
	 * @function														read-several-chat	
	 * @memberof														Facade
	 * @description													处理读取与特定图片相关的多条聊天记录业务逻辑的接口，处理完毕后将结果通过res-read-several-chat事件返回给shell模块
	 * @param				{Number}pt-id						要指定获取聊天记录的图片id
	 */
	read-several-chat: !(pt-id) ->
		msg-object = 
			pt-id: pt-id
		callback = !(err, chats) ->
			EventCenter.trigger "res-read-several-chat", [err, chats]
		message.get-message-list-by-picture msg-object, callback

	/**
	 * @function												  create-friend	
	 * @memberof												  Facade		
	 * @description											  处理添加好友业务逻辑的接口，处理完毕后将结果通过res-create-friend事件返回给shell模块
	 * @param				{Number}user-id				发起添加好友操作的用户的id
	 * @param				{Number}friend-id			被添加为好友的用户的id
	 * @param				{String}nick-name			为好友添加的昵称
	 */
	create-friend: !(user-id, friend-id, friend-nickname) ->
		friend-obj = 
			user-id: user-id,
			friend-id: friend-id,
			friend-nickname: friend-nickname
		callback = !(err) ->
			EventCenter.trigger "res-create-friend", [err]
		friend.add-friend friend-obj, callback

	/**
	 * @function												delete-friend		
	 * @memberof												Facade				
	 * @description											处理删除好友业务逻辑的接口，处理完毕后将结果通过res-delete-friend事件返回给shell模块	
	 * @param				{Number}user-id			发起删除好友操作的用户的id
	 * @param				{Number}friend-id		被从好友列表中删除的用户的id
	 */
	delete-friend: !(user-id, friend-id) ->
		friend-obj = 
			user-id: user-id,
			friend-id: friend-id
		callback = !(err) ->
			EventCenter.trigger "res-delete-friend", [err]
		friend.add-friend friend-obj, callback

	/**
	 * @function												update-friend-nick-name		
	 * @memberof												Facade			
	 * @description											处理修改好友昵称业务逻辑的接口，处理完毕后将结果通过res-update-friend-nick-name事件返回给shell模块
	 * @param				{Number}user-id			发起修改好友昵称操作的用户的id
	 * @param				{Number}friend-id		被修改昵称的好友的用户id
	 * @param				{String}nick-name		要修改的昵称
	 */
	update-friend-nick-name: !(user-id, friend-id, friend-nickname) ->
		friend-obj = 
			user-id: user-id,
			friend-id: friend-id,
			friend-nickname: friend-nickname
		callback = !(err) ->
			EventCenter.trigger "res-update-friend-nick-name", [err]
		friend.add-friend friend-obj, callback

	/**
	 * @function												read-friend-info	
	 * @memberof												Facade
	 * @description											处理读取好友个人信息业务逻辑的接口，处理完毕后将结果通过res-read-friend-info事件返回给shell模块
	 * @param				{Number}user-id			发起读取好友个人信息操作的用户的id		
	 * @param				{Number}friend-id		被读取信息的好友的用户id
	 */
	read-friend-info: !(user-id, friend-id) ->
		friend-obj = 
			user-id: friend-id
		callback = !(err, friend) ->
			EventCenter.trigger "res-read-friend-info", [err, friend]
		user.get-a-user friend-obj, callback

	/**
	 * @function												read-friend-list		
	 * @memberof												Facade
	 * @description											处理读取好友列表信息业务逻辑的接口，处理完毕后将结果通过res-read-friend-list事件返回给shell模块
	 * @param				{Number}user-id			发起读取好友列表操作的用户的id
	 */
	read-friend-list: !(user-id) ->
		friend-obj = 
			user-id: user-id
		callback = !(err, friends) ->
			EventCenter.trigger "res-read-friend-list", [err, friends]
		friend.get-friends-by-user friend-obj, callback

	/**
	 * @function												create-picture	
	 * @memberof												Facade		
	 * @description											处理创建图片业务逻辑的接口，处理完毕后将结果通过res-create-picture事件返回给shell模块
	 * @param				{Number}user-id			创建图片的用户的id
	 * @param				{String}pic-url			新创建图片的url
	 */
	create-picture: !(user-id, pic-url) ->
		picture-obj = 
			establisher: user-id,
			pic-url: pic-url
		callback = !(err) ->
			EventCenter.trigger "res-create-picture", [err]
		picture.create-a-picture picture-obj, callback

	/**
	 * @function												delete-picture	
	 * @memberof												Facade
	 * @description											处理删除图片业务逻辑的接口，处理完毕后将结果通过res-delete-picture事件返回给shell模块
	 * @param				{Number}user-id			删除图片的用户的id
	 * @param				{Number}pic-id			被删除图片的id
	 */
	delete-picture: !(user-id, pic-id) ->
		picture-obj = 
			pic-id: pic-id
		callback = !(err) ->
			EventCenter.trigger "res-delete-picture", [err]
		picture.delete-picture picture-obj, callback

	/**
	 * @function												read-picture	
	 * @memberof												Facade	
	 * @description											处理读取图片业务逻辑的接口，处理完毕后将结果通过res-read-picture事件返回给shell模块
	 * @param				{Number}user-id			要读取图片的用户的id
	 * @param				{Number}pic-id			被读取的图片的id
	 */
	read-picture: !(user-id, pic-id) ->
		picture-obj = 
			user-id: user-id,
			pic-id: pic-id
		callback = !(err, picture) ->
			EventCenter.trigger "res-read-picture", [err, picture]
		picture.get-a-picture picture-obj, callback

	/**
	 * @function												read-picture-by-user
	 * @memberof												Facade			
	 * @description											处理读取与特定用户相关的所有图片业务逻辑的接口，处理完毕后将结果通过res-read-pictures-by-user事件返回给shell模块
	 * @param				{Number}user-id			被指定的特定用户的id
	 */
	read-pictures-by-user: !(user-id) ->
		picture-obj = 
			user-id: user-id
		callback = !(err, pictures) ->
			EventCenter.trigger "res-read-pictures-by-user", [err, pictures]
		picture.get-pictures picture-obj, callback

	/**
	 * @function												subscribe-events	
	 * @memberof												Facade					
	 * @description											绑定事件的方法，将所有的处理函数作为相应事件的回调函数托管到事件中心EventCenter中
	 */
	subscribe-events: !->
		Event-center.bind "user-register", @user-register
		Event-center.bind "user-login", @user-login
		Event-center.bind "user-password-update", @user-password-update
		Event-center.bind "user-info-update", @user-info-update
		Event-center.bind "user-destroy", @user-destroy
		Event-center.bind "user-info-read", @user-info-read
		Event-center.bind "create-chat", @create-chat
		Event-center.bind "delete-chat", @delete-chat
		Event-center.bind "read-several-chat", @read-several-chat
		Event-center.bind "create-friend", @create-friend
		Event-center.bind "delete-friend", @delete-friend
		Event-center.bind "update-friend-nick-name", @update-friend-nick-name
		Event-center.bind "read-friend-info", @read-friend-info
		Event-center.bind "read-friend-list", @read-friend-list
		Event-center.bind "create-picture", @create-picture
		Event-center.bind "delete-picture", @delete-picture
		Event-center.bind "read-picture", @read-picture
		Event-center.bind "read-pictures-by-user", @read-pictures-by-user

	/**
	 * @function												init			
	 * @memberof												Facade
	 * @description											初始化函数，完成事件的托管
	 */
	init: !->
		@subscribe-events!

module.exports = Facade
