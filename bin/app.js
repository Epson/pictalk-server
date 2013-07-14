var Shell, Facade, EventCenter, App;
Shell = require('./Shell');
Facade = require('./Facade');
EventCenter = require('./EventCenter');
/**
 * @namespace					App
 * @description				服务端应用程序的启动入口模块
 * @requires 					Shell
 * @requires 					Facade
 * @requires 					EventCenter
 * @author 						赵剑（Cyril.Zhao）
 */
App = {
  /**
   * @function 			
   * @description			初始化函数，控制EventCenter模块和Facade模块的初始化
   */
  init: function(){
    EventCenter.init();
    Facade.init();
    Shell.init();
  }
};
App.init();