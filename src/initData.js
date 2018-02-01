/**
 * File: /Users/youngcao/Desktop/syweb/src/initData.js
 * Project: /Users/youngcao/Desktop/syweb
 * Created Date: Saturday January 20th 2018 1:51:40 pm
 * Author: caoyang
 * -----
 * Last Modified:Saturday January 20th 2018 1:51:40 pm
 * Modified By: caoyang
 * -----
 * Copyright (c) 2018 MagCloud
 */
//初始化数据字典；
import storage from "store2";
import axios from './http'
export default function initCodeMapData() {
  return new Promise(resolve => {
    // if (!!storage.get("codeMap")){
    //   resolve();
    // } else {
      axios.get("dictionary/batch?parentCodes=GRADE,UNIT,PRODUCINGAREA,KUBE,SHIPPING_METHOD,CAMPANY,MODEL,ACCOUNT,MASTER_PRODUCT,FINANCING&callback=" + Math.random())
      .then((res) => {
        if (res && res instanceof Array && res.length > 0) {
          storage.set("codeMap", res);
        }
        resolve();
      });
    // }
  })
}
