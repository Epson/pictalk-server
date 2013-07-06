
require! [
	"./EventCenter"]

/** 
 * @namespace										UserModel
 * @description				
 * @requires 										EventCenter
 * @author 											赵剑（Cyril.Zhao）
 */
User-model = 

	/**
	 * @function									save-user
	 * @memberof									Facade
	 * @description								处理用户注册业务逻辑的接口，处理完毕后将结果通过res-user-register事件返回给shell模块
	 * @param					username		用户输入的用户名
	 * @param					password 		用户输入的密码
	 */
	save-user: !(username, password) ->
		Event-center.trigger "res-user-register", [true]


module.exports = User-model