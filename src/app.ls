require! [
	"./Shell",
	"./Facade",
	"./EventCenter"]

/**
 * @namespace					App
 * @description				服务端应用程序的启动入口模块
 * @requires 					Shell
 * @requires 					Facade
 * @requires 					EventCenter
 * @author 						赵剑（Cyril.Zhao）
 */
App = 

	/**
	 * @function 			
	 * @description			初始化函数，控制EventCenter模块和Facade模块的初始化
	 */
	init: !->
		Event-center.init!
		Facade.init!
		Shell.init!

App.init!


