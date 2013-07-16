###用户注册：
```
	URL：users/user-register
	HTTP请求方式：POST
  	请求参数json示例：
		{
			email: "121927532@qq.com",
			password: "123456"
		}
	返回响应json示例：
		{
			err: err						// 如果注册不成功则返回err属性为err对象，成功则返回err属性为null
		}
```

###用户登陆：
```
	URL：users/user-login
	HTTP请求方式：POST
  	请求参数json示例：
		{
			email: "121927532@qq.com",
			password: "123456"
		}
	返回响应json示例：
		{
			err: err						// 如果登陆失败则返回err属性为err对象，成功则返回err属性为null
		}
```
###用户修改密码：
```
	URL: users/user-password-update
	HTTP请求方式: POST
	请求参数json示例：
		{
			userId: "121927532@qq.com",
			oldPassword: "123456",										
			newPassword: "abc123"				// 要更改的新密码的值
		}
	返回响应json示例：
		{
			err: err						// 如果更改不成功则返回err属性为err对象，成功则返回err属性为null
		}
```

###用户信息更新：
```
	URL: users/user-info-update
	HTTP请求方式: POST
	请求参数json示例：
		{
			userId: "121927532@qq.com",			
			avatar: "http://xxx.xx.xx.png",								
			mobile: "15902094760",
		}
	返回响应json示例：
		{
			err: err						// 如果更改不成功则返回err属性为err对象，成功则返回err属性为null
		}
```

###用户注销帐号:
```
	URL: users/user-destroy
	HTTP请求方式: DELETE
	请求参数json示例：
		{
			userId: "121927532@qq.com"
		}
	返回响应json示例：
		{
			err: err						// 如果删除不成功则返回err属性为err对象，成功则返回err属性为null
		}
```
###获取用户信息：
```	
	URL: users/user-info-read
	HTTP请求方式: GET
	请求参数json示例：
		{
			userId: "121927532@qq.com"										
		}
	返回响应json示例：
		{
			err: err						// 如果获取不成功则返回err属性为err对象，成功则返回err属性为null
			user: user 						// 如果获取不成功则该项为null或undefined，成功则返回user对象的信息
		}
```

###发出聊天信息：
```
	URL: chats/create-chat
	HTTP请求方式: POST
	请求参数json示例：
		{
			picId: 2,
			fromUserId: 1,
			toUserId: 3,
			msgType: "text",				// 如果是声音消息则msgType为"voice"，且有与之对应的属性例如"voiceUrl"
			content: "哈哈",				// 与文本消息对应的属性为text		
		}
	返回响应json示例：
		{
			ack: true						// 如果发送不成功则返回false
			content: "哈哈"					// 返回该条聊天记录的内容 (这里有待商榷)
		}
```

###删除聊天信息：
<!-- ```
	URL: chats/delete-chat
	HTTP请求方式: DELETE
	请求参数json示例：
		{
			chatId: 10						// 要删除的聊天信息的ID												
		}
	返回响应json示例：
		{
			ack: true						// 如果删除不成功则返回false
		}
``` -->
###读取一条聊天信息:
```
	URL: chats/read-chat
	HTTP请求方式: GET
	请求参数json示例：
		{
			chatId: 10						// 要获取的聊天信息的ID												
		}
	返回响应json示例：
		{
			ack: true						// 如果获取失败则返回false
			chatId: 10,										
			picId: 2,											
			fromUserId: 1,
			toUserId: 3,
			content: "哈哈",													
		}
```

###根据图片读取多条聊天信息：
```
	URL: chats/read-several-chat
	HTTP请求方式: GET
	请求参数json示例：
		{
			picId: 2						// 与要获取的聊天消息对应的图片id									
		}
	返回响应json示例：
		{
			ack: true						// 如果获取失败则返回false
			chats: [{}, {}, {}, {}, {}]		// 与该图片相关的所有聊天信息						
			picId: 2																						
		}
```
###添加好友：
```
	URL: friends/create-friend
	HTTP请求方式: POST
	请求参数json示例：
		{
			userId: "lhfcws@gmail.com",						// 当前用户的id
			friendId: "chenxuejia@foxmail.com" 				// 要添加为好友的用户id
			nickName: ""					// 好友的备注昵称默认为空
		}
	返回响应json示例：
		{
			err: err						// 如果添加不成功则返回err属性为err对象，成功则返回err属性为null	
		}
```
###删除好友：
```
	URL: friends/delete-friend
	HTTP请求方式: DELETE
	请求参数json示例：
		{
			userId: "lhfcws@gmail.com",						// 当前用户的id
			friendId: "chenxuejia@foxmail.com" 				// 要删除好友的用户id
		}
	返回响应json示例：
		{
			err: err						// 如果删除不成功则返回err属性为err对象，成功则返回err属性为null
		}
```
###更新好友昵称信息：
```
	URL: friends/update-friend-nick-name
	HTTP请求方式: POST
	请求参数json示例：
		{
			userId: "lhfcws@gmail.com",						// 当前用户的id
			friendId: "chenxuejia@foxmail.com" 				// 要修改备注名称的好友的用户id
			nickName: "cyril"								// 要修改的好友昵称
		}
	返回响应json示例：
		{
			err: err						// 如果更新不成功则返回err属性为err对象，成功则返回err属性为null
		}
```
###读取某个好友的用户信息：
```
	URL: friends/read-friend-info
	HTTP请求方式: GET
	请求参数json示例：
		{
			userId: "lhfcws@gmail.com",						// 当前用户的id
			friendId: "chenxuejia@foxmail.com" 				// 要获取信息的好友的用户id
		}
	返回响应json示例：
		{
			err: err						// 如果获取不成功则返回err属性为err对象，成功则返回err属性为null
			friend: friend 					// 如果获取成功则返回好友的用户信息
		}
```
###读取好友列表的信息：
```
	URL: friends/read-friend-list
	HTTP请求方式: GET
	请求参数json示例：
		{
			userId: "lhfcws@gmail.com"		// 当前用户的id
		}
	返回响应json示例：
		{
			err: err						// 如果获取不成功则返回err属性为err对象，成功则返回err属性为null
			friends: friends 				// 如果获取成功则返回好友的用户信息
		}
```
###创建一张图片：
```
	URL: pics/create-picture
	HTTP请求方式: POST
	请求参数json示例：
		{
			userId: 3,						// 当前用户的id
			picUrl: "xxx/xxx/xxx"			// 图片的url
		}
	返回响应json示例：
		{
			ack: true,						// 如果创建失败则返回false		
			picUrl: "xxx/xxx/xxx"			// 图片的url								
		}
```
###删除一张图片：（删除图片之后附着在该图片上的所有聊天记录都会被删除）
```
	URL: pics/delete-picture
	HTTP请求方式: DELETE
	请求参数json示例：
		{
			userId: 3,						// 当前用户的id
			picId: 20						// 图片的id
		}
	返回响应json示例：
		{
			ack: true,						// 如果删除失败则返回false									
		}
```
###读取一张图片：
```
	URL: pics/read-picture
	HTTP请求方式: GET
	请求参数json示例：
		{
			userId: 3,						// 当前用户的id
			picId: 20						// 图片的id
		}
	返回响应json示例：
		{
			ack: true,						// 如果获取失败则返回false
			picUrl: "xxx/xxx/xxx"			// 图片的url								
		}
```
###根据特定用户读取多张图片：
```
	URL: pics/read-pictures-by-user
	HTTP请求方式: GET
	请求参数json示例：
		{
			userId: 3,						// 当前用户的id
		}
	返回响应json示例：
		{
			ack: true,						// 如果获取失败则返回false
			picsInfo: [						// 获取到的图片信息列表
				{
					picId: 20,				// 图片的id
					picUrl: "xxx/xxx/xxx"	// 图片的url
				}, {
					picId: 21,
					picUrl: "xxx/xxx/xxx"
				}
			]					
		}
```

























