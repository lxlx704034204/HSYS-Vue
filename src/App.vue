<template>
  <div id="app">
    <header-box v-on:search="search" v-show="infor" :userInfor="$store.state.uesrInfor"></header-box>
   <!-- <chart-demo></chart-demo> -->
    <router-view v-bind:search-data="searchData" />


    <footer-box v-show="infor"></footer-box>
  </div>
</template>

<script>
import HeaderBox from "@/components/Header";
import FooterBox from "@/components/Footer";
import chartDemo from '@/examples/chart/index' // 测试
export default {
  name: 'app',
  data(){
    return{
      infor:true,
      //搜索关键词
      searchData:''
    }
  }
  ,
  components: {
    HeaderBox,
    FooterBox,
    chartDemo
  },
  created () {
    
//  var urlId = this.$route.path;
//  if(urlId.indexOf('information') >0){
//    this.infor = false
//  }
//  var urlId = this.$route.path;
//  if(urlId.indexOf('pleaseconsult') >0){
//    this.infor = false
//  }
  },
  methods:{
    search(){
      this.searchData = this.$route.query.name;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: PingFangSC-Regular, sans-serif,Microsoft YaHei,tahoma,arial,Hiragino Sans GB;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


//立即下单
 .spendActive .el-dialog{
    width: 70%;
}
.el-dialog--center .el-dialog__header {
    background-color: #009FE2;
}
.el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #fff;
    font-size: 18px;
}

/*.qutaSele  .el-button:focus,.el-button:hover {
    color: #494949;
    border-color: #D8DCE5;
    background-color: #fff;
}*/


/* 我的企业 */
.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #fff; 
    z-index: 1;
}
.el-tabs__nav{
  margin-left: 31px;
}
.el-progress-bar__outer{
  width: 80px;
}

</style>
