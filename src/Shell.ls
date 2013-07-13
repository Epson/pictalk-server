
require! [express,
	"./EventCenter",
	"./Facade"]

app = express!

# 指定通用环境下的参数
do
	<-! app.configure
	app.use express.bodyParser!
	app.use express.static __dirname + "/../public"

/**
 * @description 								用户注册
 * @function 										user-register
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
user-register = !(req, res) ->
	username = req.body.username
	password = req.body.password
	do 
		(ack) <-! Event-center.bind 'res-user-register'
		result = ack: ack
		res.end JSON.stringify result
	Facade.user-register username, password
	

/**
 * @description 								用户登陆
 * @function 										user-login
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
user-login = !(req, res) ->
	username = req.body.username
	password = req.body.password
	Facade.user-login username, password 
	Event-center.bind "res-user-login", !(ack)->
		result = ack: ack
		res.end result

/**
 * @description 								用户修改密码
 * @function 										user-password-update
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
user-password-update = !(req, res) ->
	new-password = req.body.new-password
	old-password = req.body.old-password
	user-id = req.body.user-id
	Facade.user-password-update new-password, old-password, user-id 
	Event-center.bind "res-user-password-update", !(ack)->
		result = 
			ack: ack
		res.end result

/**
 * @description 								用户修改个人信息
 * @function 										user-info-update
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
user-info-update = !(req, res) ->
	user-id = req.body.user-id
	email = req.body.email
	Facade.user-info-update user-id, email 
	Event-center.bind "res-user-info-update", !(ack, email, gender)->
		result = 
			ack: ack,
			email: email,
			gender: gender
		res.end result

/**
 * @description 								用户注销帐号
 * @function 										user-destroy
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
user-destroy = !(req, res) ->
	user-id = req.body.user-id
	Facade.user-destroy user-id
	Event-center.bind "res-user-destroy", !(ack)->
		result = 
			ack: ack
		res.end result

/**
 * @description 								获取用户个人信息
 * @function 										user-info-read
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
user-info-read = !(req, res) ->
	user-id = req.body.user-id
	Facade.user-info-read user-id 
	Event-center.bind "res-user-info-read", !(ack, user-name, email, gender)->
		result = 
			ack: ack,
			user-name: user-name,
			email: email,
			gender: gender
		res.end result

/**
 * @description 								创建一条聊天记录
 * @function 										create-chat
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
create-chat = !(req, res) ->
	pic-id = req.body.pic-id
	from-user-id = req.body.from-user-id
	to-user-id = req.body.to-user-id
	msg-type = req.body.msg-type
	content = req.body.content
	Facade.create-chat pic-id, from-user-id, to-user-id, msg-type, content 
	Event-center.bind "res-create-chat", !(ack, content)->
		result = 
			ack: ack,
			content: content
		res.end result

/**
 * @description 								删除一条聊天记录
 * @function 										delete-chat
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
delete-chat = !(req, res) ->
	chat-id = req.body.chat-id
	Facade.delete-chat chat-id 
	Event-center.bind "res-delete-chat", !(ack)->
		result = 
			ack: ack
		res.end result

/**
 * @description 								获取同一张图片上的所有聊天记录
 * @function 										read-several-chat
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
read-several-chat = !(req, res) ->
	pic-id = req.body.pic-id
	Facade.read-several-chat pic-id
	Event-center.bind "res-read-several-chat", !(ack, chats, pic-id)->
		result = 
			ack: ack,
			chats: chats,
			pic-id: pic-id
		res.end result

/**
 * @description 								添加一位好友
 * @function 										create-friend
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
create-friend = !(req, res) ->
	user-id = req.body.user-id
	friend-id = req.body.friend-id
	nick-name = req.body.nick-name
	Facade.create-friend user-id, friend-id, nick-name 
	Event-center.bind "res-create-friend", !(ack)->
		result = 
			ack: ack
		res.end result

/**
 * @description 								删除一位好友
 * @function 										delete-friend
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
delete-friend = !(req, res) ->
	user-id = req.body.user-id
	friend-id = req.body.friend-id
	Facade.delete-friend user-id, friend-id 
	Event-center.bind "res-delete-friend", !(ack)->
		result = 
			ack: ack
		res.end result

/**
 * @description 								更新好友昵称信息
 * @function 										update-friend-nick-name
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
update-friend-nick-name = !(req, res) ->
	user-id = req.body.user-id
	friend-id = req.body.friend-id
	nick-name = req.body.nick-name
	Facade.update-friend-nick-name user-id, friend-id, nick-name 
	Event-center.bind "res-update-friend-nick-name", !(ack)->
		result = 
			ack: ack
		res.end result

/**
 * @description 								获取某个好友的个人信息
 * @function 										read-friend-info
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
read-friend-info = !(req, res) ->
	user-id = req.body.user-id
	friend-id = req.body.friend-id
	Facade.read-friend-info user-id, friend-id 
	Event-center.bind "res-read-friend-info", !(ack, user-id, user-name, email, gender)->
		result = 
			ack: ack,
			user-id: user-id,
			user-name: user-name,
			email: email,
			gender: gender
		res.end result

/**
 * @description 								获取好友列表中所有好友的基本信息，包括好友的id和昵称
 * @function 										read-friend-list
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
read-friend-list = !(req, res) ->
	user-id = req.body.user-id
	Facade.read-friend-list user-id 
	Event-center.bind "res-read-friend-list", !(ack, users-info)->
		result = 
			ack: ack,
			users-info: users-info
		res.end result

/**
 * @description 								创建一张图片
 * @function 										create-picture
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
create-picture = !(req, res) ->
	user-id = req.body.user-id
	pic-url = req.body.pic-url
	Facade.create-picture user-id, pic-url 
	Event-center.bind "res-create-picture", !(ack, pic-url)->
		result = 
			ack: ack,
			pic-url: pic-url
		res.end result

/**
 * @description 								删除一张图片，同时还会附带删除所有与该图片相关的聊天记录
 * @function 										delete-picture
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
delete-picture = !(req, res) ->
	user-id = req.body.user-id
	pic-id = req.body.pic-id
	Facade.delete-picture user-id, pic-id 
	Event-center.bind "res-delete-picture", !(ack)->
		result = 
			ack: ack
		res.end result

/**
 * @description 								获取一张图片
 * @function 										read-picture
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
read-picture = !(req, res) ->
	user-id = req.body.user-id
	pic-id = req.body.pic-id
	Facade.read-picture user-id, pic-id 
	Event-center.bind "res-read-picture", !(ack, pic-url)->
		result = 
			ack: ack,
			pic-url: pic-url
		res.end result

/**
 * @description 								根据特定用户获取多张图片，包含每张图片的id和url
 * @function 										read-pictures-by-user
 * @memberof										Shell
 * @param 			{Object}req 		请求对象	
 * @param				{Object}res 		响应对象
 */
read-pictures-by-user = !(req, res) ->
	user-id = req.body.user-id
	Facade.read-pictures-by-user user-id 
	Event-center.bind "res-read-pictures-by-user", !(ack, pics-info)->
		result = 
			ack: ack,
			pic-info: pic-info
		res.end result

/**
 * @namespace 									Shell
 * @description 								负责与客户端进行数据交互的模块
 * @requires 										fs
 * @requires 										express
 * @requires 										EventCenter
 * @requires 										Facade
 * @author
 */
Shell = 
	/**
	 * @description								初始化路由设置
	 * @function
	 * @memberof									Shell
	 */
	route: !->
		app.post "/users/user-register", user-register
		app.post "/users/user-login", user-login
		app.post "/users/user-password-update", user-password-update
		app.post "/users/user-info-update", user-info-update
		app.delete "/users/user-destroy", user-destroy
		app.get "/users/user-info-read", user-info-read
		app.post "/chats/create-chat", create-chat
		app.delete "/chats/delete-chat", delete-chat
		app.get "/chats/read-several-chat", read-several-chat
		app.post "/friends/create-friend", create-friend
		app.delete "/friends/delete-friend", delete-friend
		app.post "/friends/update-friend-nick-name", update-friend-nick-name
		app.get "/friends/read-friend-info", read-friend-info
		app.get "/friends/read-friend-list", read-friend-list
		app.post "/pics/create-picture", create-picture
		app.delete "/pics/delete-picture", delete-picture
		app.get "/pics/read-picture", read-picture
		app.get "/pics/read-pictures-by-user", read-pictures-by-user

	/**
	 * @description								初始化模块的函数
	 * @function
	 * @memberof									Shell
	 */
	init: !->
		# 初始化路由设置
		@route!

		# Configuration
		app.configure !->
			app.set "port", process.env.PORT || 8888
			app.use app.router

		app.configure "development" , !->
			app.use express.errorHandler!

		# 监听8888端口
		do
			<-! app.listen app.get "port"
			console.log "server is listening to port " + app.get "port"

module.exports = Shell

