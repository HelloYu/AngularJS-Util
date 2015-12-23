(function() {
  'use strict';

  angular
    .module('app.util')
    /**
     * 
     * @class app.util.util
     * 工具类集合  
     */
    .factory('util', util);

  util.$inject = [];

  /* @ngInject */
  function util() {
    var service = {
    /**
     * @method getWinSize
     * 获取当前窗口大小。
     *     @example
     *     var win = util.getWinSize();
     *     console.info(win.height);
     *     console.info(win.width);
     * @return {Object} 
     * 返回一个包含当前窗口width和height的对象
     */
    	getWinSize: getWinSize,
    /**
     * @method isArray
     * 判断是否为数组。
     * @param {anything}
     * @return {Boolean} 如果是数组返回true，否则返回false。  
     */
      isArray: isArray,
    /**
     * @method isString
     * 判断是否为字符串。
     * @param {anything}
     * @return {Boolean} 如果是字符串返回true，否则返回false。  
     */
      isString: isString,
    /**
     * @method isFunction
     * 判断是否为函数。
     * @param {anything}
     * @return {Boolean} 如果是函数返回true，否则返回false。  
     */
      isFunction: isFunction,
     /**
     * @method StringBuilder
     * 一个字符串操作构造函数
     *     
     *     var sb = new StringBuilder('&&'); //指定&&为分隔符
   	 *     alert(sb.Length());
     *     sb.Append('hEllo');
     *     sb.Append('wORLD');
     *     alert(sb.ToString()); //将输出 hEllo&&wORLD
     *     sb.Clear();   
     *     sb.AppendFormat("Hello! {0} {1} {2}",['a','b','c']);
     *     sb.AppendFormat("Today is {0}",['周一']);
     *     alert(sb.ToString());  //将输出 Hello! a b c&&Today is 周一
     *     sb.Clear();
     *     sb.AppendFormat("Hello! {0} {1} {2}",'a','b','c');
     *     sb.Append('World');
     *     alert(sb.ToString('__')); //将输出 Hello! a b c__World
     * @return {Object} 
     * 新的字符串操作函数  
     */
      StringBuilder: StringBuilder,
     /**
     * @method Padding
     * 一个字符串填充构造函数
     *     
     *     var string = 'abc';
     *     var padding = util.Padding(2,'&');
     *     console.info(padding.left(string));    // &&abc
     * @param {Number} length 
     * 需要填充的字符数。 
     * @param {String} char
     * 填充的字符数,默认为空格。 
     * @return {String} 
     * 新的字符串填充函数  
     */
      Padding: Padding,
    };
    return service;
  
    ////////////////
  	
    function getWinSize() {
      var winSize = {},
          winWidth,
          winHeight;
      if (window.innerWidth)
        winWidth = window.innerWidth;
      else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
      // 获取窗口高度
      if (window.innerHeight)
        winHeight = window.innerHeight;
      else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
      // 通过深入 Document 内部对 body 进行检测，获取窗口大小
      if (document.documentElement && document.documentElement.clientHeight &&
        document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
      }
      winSize.width = winWidth;
      winSize.height = winHeight;
      return winSize;
    };

   
    function isArray(obj) { 
      return Object.prototype.toString.call(obj) === '[object Array]'; 
    };

    function isString(str) {
      return Object.prototype.toString.call(str) === '[object String]';
    };
    
    function isFunction(fun) {
    	return Object.prototype.toString.call(fun) === '[object Function]';
    };


    function StringBuilder() {
      this._buffers = [];
      this._length = 0;
      this._splitChar = arguments.length > 0 ? arguments[arguments.length - 1] :
        '';
  
      if (arguments.length > 0) {
        for (var i = 0, iLen = arguments.length - 1; i < iLen; i++) {
          this.Append(arguments[i]);
        }
      }
    }
  
    //向对象中添加字符串
    //参数：一个字符串值
    StringBuilder.prototype.Append = function (str) {
      if( typeof str != 'string'){
        str = str.toString();
      }
      this._length += str.length;
      this._buffers[this._buffers.length] = str;
    };
    StringBuilder.prototype.Add = StringBuilder.prototype.append;
  
    //向对象附加格式化的字符串
    //参数：参数一是预格式化的字符串，如：'{0} {1} {2}'
    //格式参数可以是数组，或对应长度的arguments,
    //参见示例
    StringBuilder.prototype.AppendFormat = function () {
      if (arguments.length > 1) {
        var TString = arguments[0];
        if (arguments[1] instanceof Array) {
          for (var i = 0, iLen = arguments[1].length; i < iLen; i++) {
            var jIndex = i;
            var re = eval("/\\{" + jIndex + "\\}/g;");
            TString = TString.replace(re, arguments[1][i]);
          }
        } else {
          for (var i = 1, iLen = arguments.length; i < iLen; i++) {
            var jIndex = i - 1;
            var re = eval("/\\{" + jIndex + "\\}/g;");
            TString = TString.replace(re, arguments[i]);
          }
        }
        this.Append(TString);
      } else if (arguments.length == 1) {
        this.Append(arguments[0]);
      }
    };
  
    //字符串长度（相当于ToString()后输出的字符串长度
    StringBuilder.prototype.Length = function () {
      if (this._splitChar.length > 0 && (!this.IsEmpty())) {
        return this._length + (this._splitChar.length * (this._buffers.length -
          1));
      } else {
        return this._length;
      }
    };
    //字符串是否为空
    StringBuilder.prototype.IsEmpty = function () {
      return this._buffers.length <= 0;
    };
    //清空
    StringBuilder.prototype.Clear = function () {
      this._buffers = [];
      this._length = 0;
    };
    //输出
    //参数：可以指定一个字符串（或单个字符），作为字符串拼接的分隔符
    StringBuilder.prototype.ToString = function () {
      if (arguments.length == 1) {
        return this._buffers.join(arguments[1]);
      } else {
        return this._buffers.join(this._splitChar);
      }
    };

    function Padding(Width, paddingChar) {
    	this._width = Width ? Width : 0;
      this._paddingChar = paddingChar ? paddingChar : ' ';
      for (; i < this._width - 1; i++) {
    		this._paddingChar = this._paddingChar + this._paddingChar;
    	}
    };

    Padding.prototype.left = function (string) {
    	var str = '';
    	return str = this._paddingChar + string;
    };

    Padding.prototype.right = function (string) {
    	var str = '';
    	return str = string + this._paddingChar ;
    };

  }
})();