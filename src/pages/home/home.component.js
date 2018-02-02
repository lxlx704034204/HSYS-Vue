import storage from "store2";
import chartDemo from '@/examples/k-line/index';
import loginauct from "@/pages/loginauct";
export default {
  name: 'home',
  components: {
    chartDemo,
    loginauct
  },
  props: [],
  data() {

    return {
      token: '',
      banner: [], // 轮播
      show: false,
      current: 1,
      total: 1,
      goodsList: [],
      getProduct: [],
      pro: [],
      prod: [],
      data: "",
      sale: [],
      io: '', //库别
      dw: "", //单位
      cd: "", //产地
      ph: "", //牌号
      sm: "", //交货方式
      logoUrl: [],
      per: [],
      tabIndex: 0,
      hiden: true,
      hide: false,
      perds: [],
      join: "",
      echartData: [],
      scale: [],
      finan_down: 'first',
      isLogin: false, //判断是否登录
      purchaseid: '', //采购id
      selfid: '', //自选id
    }
  },
  computed: {

  },

  created() {
    this.$store.commit("switchHeaderType", 1);
    this.$store.commit("switchFooterType", 1);
    var that = this;
    const kubeinfo = this.$util.getCodeMap("KUBE");
    if (!kubeinfo) {
      dic();
    } else {
      that.io = this.$util.getCodeMap("KUBE");
      that.dw = this.$util.getCodeMap("UNIT");
      that.cd = this.$util.getCodeMap("PRODUCINGAREA");
      that.ph = this.$util.getCodeMap("GRADE");
      that.sm = this.$util.getCodeMap("SHIPPING_METHOD");
      this._getHomeList();
      this._getProduct();
      $('.out-type-classification').show()
    }
  },
  mounted() {},
  methods: {
    // echart
    pop(row) {
      let that = this;
      that.echartData = [];
      sessionStorage.echartId = row.id;
      this.axios.get('product/record?id=' + row.id)
        .then((res) => {
          let price = [];
          let time = [];
          let len = [];
          for (var i = 0; i < res.length; i++) {
            that.echartData.push({
              value: [res[i].createDate, res[i].price]
            });
          }
          // }
        });
    },
    //客户经理
    service(row) {
      var id = row.userId;
      var _this = this;
      this.axios.get("sys/user/" + id).then((res) => {
        _this.sale = res || {};
      })
    },
    //商品名称
    _getHomeList() {
      this.axios.get("product/category?size=5").then(res => {
        if (res && res instanceof Array && res.length > 0) {
          res.unshift({
            name: "最新现货"
          });
          res = res.slice(0, 4);
          res.push({
            name: "自选产品清单"
          });
          this.goodsList = res;
        }
      });

    },
    //产品列表
    _getProduct(id) {
      const me = this;
      let params = id ? `categoryId=${id}&current=${me.current}&size=5` : "size=5";

      this.axios.get("product/list?" + params).then(res => {
        const {
          records = [], pages = 1
        } = res || {};
        me.total = pages;
        me.prod = me.transform(records);
      });
    },
    handleClick({
      index
    }) {
      const me = this;
      if (index === this.tabIndex) {
        return;
      }
      this.tabIndex = index;
      const item = this.goodsList[index];
      this.current = 1;
      if (index == 4) {
        this._getProducts();
        this.hiden = true;
        this.hide = false;
      } else {
        this._getProduct(item.id);
        this.hiden = false;
        this.hide = true;
      };
      if (index == 0) {
        this.axios.get("product/list?params=5").then(res => {
          if (res.code == 0) {
            const {
              records = [], pages = 1
            } = res || {};
            me.prod = me.transform(records);
          } else if (res.code == 401) {
            me.$router.push('/login')
          }
        });
      }
    },
    //查询自选产品列表
    _getProducts() {
      const me = this;
      let params = `current=${me.current}&size=100`
      var token = storage.get("token");
      if (!token || token === "") {
        me.prod = [];
        return;
      }
      this.axios.get("product/collection?" + params).then(res => {
        const {
          records = [], pages = 1
        } = res || {};
        me.total = pages;
        me.prod = me.transform(records);
        me.prod.forEach((res) => {
          res.collection = "delete";
        })
      })
    },
    transform(data = []) {
      data.forEach(item => {
        var dateStr = item.updateDate;
        var date = new Date(dateStr).getTime();
        var timestamp = Date.parse(new Date());
        var nTime = timestamp - date;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var monthC = nTime / month;
        var weekC = nTime / (7 * day);
        var dayC = nTime / day;
        var hourC = nTime / hour;
        var minC = nTime / minute;
        let updateStr = "";
        // if (monthC >= 1) {
        //   updateStr = parseInt(monthC) + "个月前";
        // }
        // else if (weekC >= 1) {
        //   updateStr = parseInt(weekC) + "周前";
        // }
        // else if (dayC >= 1) {
        //   updateStr = parseInt(dayC) + "天前";
        // }
        // else if (hourC >= 1) {
        //   updateStr = parseInt(hourC) + "个小时前";
        // }
        // else if (minC >= 1) {
        //   updateStr = parseInt(minC) + "分钟前";
        // } else {
        //   updateStr = "刚刚发表";
        // }
        if (monthC >= 1) {
          updateStr = "1天前";
        } else if (weekC >= 1) {
          updateStr = "1天前";
        } else if (dayC >= 1) {
          updateStr = "1天前";
        } else if (hourC >= 1) {
          updateStr = "1小时前";
        } else if (minC >= 1) {
          updateStr = "1分钟前";
        } else {
          updateStr = "刚刚发表";
        }
        item.updateStr = updateStr;

      });
      return data;
    },
    //删除自选产品
    del(id, event) {
      this.$confirm('是否删除产品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = id;
        var that = this;
        this.axios.delete('product/collection/' + data).then((res) => {
          this._getProducts();
        })
      });
    },
    //加入自选
    selection(a, row) {
      var data = {
        skuId: a,
      };
      //BUG修复版本
      //判断登陆状态
      var that = this;
      var token = storage.get("token");
      if (!token || token == "") {
        this.isLogin = true;
        return;
      }
      this.axios.post("product/collection", data).then((res) => {
        row.collection = true;
      });
    },
    //向订单传递信息,登录成功后
    logining(isclose) {
      var that = this;
      this.isLogin = false;
      this.token = storage.get("token");
      var userId = storage.get("id");
      if (isclose) return;
      if (this.purchaseid != '') {
        //判断企业验证状态
        if (!!userId) {
          this.axios.get('customer/detail/' + userId)
            .then(function (data) {
              if (data != "") {
                if (data.status !== 'SUCCESS') {
                  that.$alert('公司信息尚未完善', '提示', {
                    confirmButtonText: '完善企业信息',
                    type: 'warning',
                  }).then(() => {
                    that.$router.push("/companycenter/myfirm");
                  }).catch(() => {

                  });
                } else {
                  that.$router.push({
                    path: '/order',
                    query: {
                      id: that.purchaseid
                    }
                  });
                }
              }
            })
        }
      }
    },
    getRowlist(row) {
      //判断登陆状态
      var that = this;
      var token = storage.get("token");
      var userId = storage.get("id");
      this.purchaseid = row.id;
      if (!token || token == "") {
        this.isLogin = true;
        return;
      }
      //判断企业验证状态
      if (!!userId) {
        this.axios.get('customer/detail/' + userId)
          .then(function (data) {
            if (data != "") {
              if (data.status !== 'SUCCESS') {
                that.$alert('公司信息尚未完善', '提示', {
                  confirmButtonText: '完善企业信息',
                  type: 'warning',
                }).then(() => {
                  that.$router.push("/companycenter/myfirm");
                }).catch(() => {

                });
              } else {
                that.$router.push({
                  path: '/order',
                  query: {
                    id: row.id
                  }
                });
              }
            }
          })
      }
    },
    openQQ(qq) {
      window.open('http://wpa.qq.com/msgrd?v=3&uin=' + qq + '&site=qq&menu=yes', '_brank');
    },
    ser(id) {
      var that = this;
      // echat(){
      this.axios.get('product/record?id=' + id)
        .then(function (response) {
          if (response.data.code == 0) {
            let chartData = response.data.data;
            let seriesData = [];
            chartData.forEach(function (item) {
              let outObj = {};
              let valueKey = Object.keys(item);
              outObj.time = item.createDate;
              outObj.value = item.price;
              seriesData.push(outObj);

            });
            that.series = seriesData;
          }
        })

    },

    tab_Down1() {
      $('.suy_man45').css("borderLeft", "2px solid #FFF");
      $('.suy_man45').css("borderTop", "2px solid #FFF");
      $('.suy_man45').css("borderRight", "2px solid #FFF");
      $('.suy_man45').css("borderBottom", "2px solid #009FE2");
      $('.suy_man44').css("borderLeft", "2px solid #009FE2");
      $('.suy_man44').css("borderTop", "2px solid #009FE2");
      $('.suy_man44').css("borderRight", "2px solid #009FE2");
      $('.suy_man44').css("borderBottom", "2px solid #FFF");
      $('.suy_man44').css("color", "#009FE2");
      $('.suy_man45').css("color", "#333");
      $('.suy_man51').css("display", "none");
      $('.suy_man47').css("display", "block");
    },
    tab_Down2() {
      $('.suy_man44').css("borderLeft", "2px solid #FFF");
      $('.suy_man44').css("borderTop", "2px solid #FFF");
      $('.suy_man44').css("borderRight", "2px solid #FFF");
      $('.suy_man44').css("borderBottom", "2px solid #009FE2");
      $('.suy_man45').css("borderLeft", "2px solid #009FE2");
      $('.suy_man45').css("borderTop", "2px solid #009FE2");
      $('.suy_man45').css("borderRight", "2px solid #009FE2");
      $('.suy_man45').css("borderBottom", "2px solid #FFF");
      $('.suy_man45').css("color", "#009FE2");
      $('.suy_man44').css("color", "#333");
      $('.suy_man47').css("display", "none")
      $('.suy_man51').css("display", "block")
    },
    tzNo1() {
      this.$router.push('/autotrophy')
    },
    tzNo2() {
      window.open('#/financial')
    },
    tzNo3() {
      window.open('#/information')
    },
    tzNo4() {
      this.$router.push('/customer')
    },
    tzNo5() {
      this.$router.push('/auction')
    },
    lunbo1() {
      //  	$(".slider-item").css("animation-duration","0s")
      //  	$(".slider-item1").css("animation-delay","0s")
      //  	$(".slider-item2").css("animation-delay","0s")
      //  	$(".slider-item2").css("display",'none')
      $("#a").css("display", 'block')
    },
    lb1() {
      //  	$(".slider-item").css("animation-duration","8s")
      //  	$(".slider-item1").css("animation-delay","-1s")
      //  	$(".slider-item2").css("animation-delay","3s")
      //  	$(".slider-item2").css("display",'block')
    },
    lunbo2() {
      $("#b").css("display", 'block')
      //  	$(".slider-item").css("animation-duration","0s")
      //  	$(".slider-item1").css("animation-delay","0s")
      //  	$(".slider-item2").css("animation-delay","0s")
      //  	$(".slider-item2").css("opacity",'1')
      //  	$(".slider-item1").css("opacity",'0')
      //			$(".slider-item2").css("opacity",'1')
      //  	$(".slider-item1").css("opacity",'0')
    },
    guanbi1() {
      $("#a").css("display", 'none')
    },
    guanbi2() {
      $("#b").css("display", 'none')
    }
  }
}
