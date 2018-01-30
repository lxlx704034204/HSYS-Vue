/**
 * File: /Users/youngcao/Desktop/suyun/Suyun-Web/suyun/dxEluiDev/src/common.js
 * Project: /Users/youngcao/Desktop/suyun/Suyun-Web/suyun/dxEluiDev
 * Created Date: Monday January 15th 2018 1:08:37 pm
 * Author: caoyang
 * -----
 * Last Modified:Monday January 15th 2018 2:27:48 pm
 * Modified By: caoyang
 * -----
 * Copyright (c) 2018 MagCloud
 */
import storage from "store2";

const UtilPlugin = {};
UtilPlugin.install = function (Vue, options) {
  const util = {
    // 验证手机号
    isPhone(phoneStr) {
      // var reg = /^1(3|4|5|7|8)[0-9]\d{8}$/ || /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/
      let reg = /^1\d{10}$/;
      if (!reg.test(phoneStr)) {
        return false;
      }
      return true
    },
   // 验证身份证
    checkId(idcard) {
      let reg = ''
      if (idcard.length == 15) {
        reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        return reg.test(idcard);
      } else if (idcard.length == 18) {
        reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        return reg.test(idcard);
      } else {
        return false
      }
    },
    // 获取url参数
    getUrlParam(key) {
      // 获取参数
      const url = window.location.search;
      // 正则筛选地址栏
      const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
      // 匹配目标参数
      const result = url.substr(1).match(reg);
      //返回参数值
      return result ? decodeURIComponent(result[2]) : null;
    },
    /**
     * 根据传入的值获取数据字典里dictCode相同的项，并返回数据字典项
     * @param  {string} code 在数据字典里搜索dictCode的值
     * @return {array}      匹配项的dictionaries值
     */
    getCodeMap (code) {
      const dicMap = storage.get("codeMap");
      return dicMap.filter(v => v.dictCode === code)[0].dictionaries;
    },
    test() {
      console.log(11111);
    },
    // 判断是不是数字类型
    isNumber( s ){
      var regu = /^\d+(?=\.{0,1}\d+$|$)/ ;
      var re = new RegExp(regu);
      if (re.test(s)) {
      return true;
      } else {
      return false;
      }
    },
    /**
     * 保留两位小数（非负）
     * @param {*object} obj
     */
    limitTowDecimals(value,num) {
      value = value.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
      value = value.replace(/^\./g, ''); // 验证第一个字符是数字
      value = value.replace(/\.{2,}/g, '.'); // 只保留第一个, 清除多余的
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      value = value.replace(/^()*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
      if(num === 1){
        value = value.replace(/^()*(\d+)\.(\d).*$/, '$1$2.$3'); // 只能输入一个小数
      }else if(num === 0){
        value = value.replace(/^()*(\d+)\.(\d).*$/, '$1$2'); // 只能输入整数
      }
      return value;
    }
  }
  Vue.prototype.$util = util;
}
export default UtilPlugin
