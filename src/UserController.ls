require! [
	"./EventCenter",
	"./UserModel"]

/**
 * @description 												检查用户输入的用户名是否合法
 * @function 														check-is-username-valid
 * @memberof														UserController
 * @param 			{String}username				用户输入的用户名
 * @returns			{Boolean}true						检测用户名合法则返回
 * @returns 		{Boolean}false 					检测用户名非法则返回
 */
check-is-username-valid = (username) ->
	if !username? || username.length > 6
		return false
	else 
		return true

/**
 * @description 												检查用户输入的密码是否合法
 * @function 														check-is-password-valid
 * @memberof														UserController
 * @param 			{String}password 				用户输入的密码	
 * @returns			{Boolean}true						检测密码合法则返回
 * @returns 		{Boolean}false 					检测密码非法则返回
 */
check-is-password-valid = (password) ->
	if !password? || password.length > 6
		return false
	else 
		return true


/** 
 * @namespace														UserController
 * @description													用户模块控制器，负责与用户相关的业务逻辑的处理
 * @requires 														EventCenter
 * @requires 														UserModel
 * @author 															赵剑（Cyril.Zhao）
 */
User-controller = 

	/**
	 * @function													userRegister	
	 * @memberof													Facade
	 * @description												处理用户注册业务逻辑的接口，处理完毕后将结果通过res-user-register事件返回给shell模块
	 * @param				{String}username			用户输入的用户名
	 * @param				{String}password 			用户输入的密码
	 * @fires															res-user-register
	 */
	user-register: !(username, password) ->
		is-username-valid = check-is-username-valid username
		is-password-valid = check-is-password-valid password
		if is-username-valid && is-password-valid
			User-model.save-user username, password
		else
			/* @event res-user-register */
			Event-center.trigger "res-user-register", [false]
			
module.exports = User-controller
