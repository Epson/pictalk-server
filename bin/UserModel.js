(function(){
  var EventCenter, UserModel;
  EventCenter = require('./EventCenter');
  /** 
   * @namespace										UserModel
   * @description				
   * @requires 										EventCenter
   * @author 											赵剑（Cyril.Zhao）
   */
  UserModel = {
    /**
     * @function									save-user
     * @memberof									Facade
     * @description								处理用户注册业务逻辑的接口，处理完毕后将结果通过res-user-register事件返回给shell模块
     * @param					username		用户输入的用户名
     * @param					password 		用户输入的密码
     */
    saveUser: function(username, password){
      EventCenter.trigger("res-user-register", [true]);
    }
  };
  module.exports = UserModel;
}).call(this);
