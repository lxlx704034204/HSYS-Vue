import storage from "store2";
import { mapState } from "vuex";
import initializeMap from "./map";
export default {
  name: 'product-detail',
  components: {},
  props: [],
  data() {
    return {
      //接收数据
      showsquires: false,
      number: 0,
      dw:'',
      images:[],
      name:'',
      intervals:[],
      unitCode:'',
      masterImage:'',
      productContent:'',
      goodinf:[],
      cominf:[],
      rexiao:[],
      recom:[],     
      dwjson:[],
      proinfjson:[],
      leftshow:false,
      quyu:[],
      longitude:'', 
      latitude:'',
      detailshow:false,
      btnsho:false,
      userId:'',
      companyName:'',
      salePrice:'',
    }
  },
    computed: {
        ...mapState(["token"])
    },
    created() {
        this.userId = this.$route.query.userId;
        this.$store.state.headerType = 5;
        var that = this;
        this.dw = this.$util.getCodeMap("UNIT");
        var json2 = {};
        this.dw.forEach(v => {
            json2[v.dictCode] = v.dictName
        })
        this.dwjson = json2; // 单位
        this.detailinf();
        this.custominf();

        //  用户产品
        that.axios.get("customerproduct/all?user_id=" + this.userId)
            .then(function(data) {
                console.log(data, 'lloolo');
                that.rexiao = data.records.slice(0, 3);
                that.recom = data.records;
                if ($(that.recom).length > '6') {
                    that.btnsho = true;
                } else if (($(that.recom).length <= '6')) {
                    that.btnsho = false;
                }
            });
    },

    mounted() {
        this.$nextTick(function() {
            initializeMap().then(BMap => {
                let point = {};
                this.initMaps(BMap, point);
            });
        })
    },
    updated() {
        $('.leftBtm_img').find('p').css('width', '919px');
        $('.leftBtm_img p').find('img').css('width', '100%');
    },
    methods: {
        custominf() {
            var that = this;
            this.$nextTick(function() {
                this.axios.get("customer/detail/" + this.userId)
                    .then(function(data) {
                        console.log(data, 'dllsf');
                        that.longitude = data.longitude;
                        that.latitude = data.latitude;
                        that.cominf = [data];
                        console.log(data.description,'123')
                    });
            })
        },
        detailinf() {
            var that = this;
            this.axios.get("customerproduct/info?id=" + this.$route.query.id, { params: { noInterceptor: 1 } })
                .then(function(data) {
                    if (data.code == 500) {

                    } else if (data.code == 0) {
                        console.log(data, 'datasss');
                        that.goodinf = data.data;
                        //          列表开始
                        that.name = data.data.name;
                        that.salePrice = data.data.salePrice;
                        //          参考区间
                        that.intervals = that.transform(data.data.customerProductIntervals); // 价格
                        that.proinfjson = [data.data];
                        console.log(that.proinfjson, 'porinf');
                        that.unitCode = data.data.unitCode;
                        that.intervals = that.goodinf.customerProductIntervals;
                        //      表格下面
                        that.masterImage = data.data.masterImage;
                        that.companyName = data.data.companyName;
                        //          产品内容
                        that.productContent = data.data.productContent;
                        console.log(data.data.images, 'imagessss');
                        if (data.data.images == '' || data.data.images == null) {} else {
                            that.images = data.data.images.split(",");
                            console.log(that.images, 'success');
                        }
                        if ($(that.images).length > '5') {
                            that.leftshow = true;
                        } else if (($(that.images).length <= '5')) {
                            that.leftshow = false;
                        }
                    }
                });
        },

        transform(data = []) {
            data.forEach(item => {
                String.prototype.getAns = function() {
                    var pattern = /(?=((?!\b)\d{3})+$)/g;
                    return this.replace(pattern, ',');
                }
                item.saleprice = JSON.stringify(item.salePrice).getAns();
                //         表格上方结束
            });
            return data;
        },
        jumpto(index, id) {
            window.open('/#/productDetail?id=' + id + '&userId=' + this.userId);
        },
        compy() {
            window.open('/#/company?userId=' + this.userId);
            var that = this;
	  		that.axios.post("customer/browse/" + that.userId)
			.then(function(data) {
				console.log(data,'33')
			});
        },
        // 厂商推荐
        show(index) {
            $('.btmImg_div').css("display", "none");
            $($('.btmImg_div')[index]).css("display", "block");
        },

        hide: function() {
            $(".btmImg_div").hide();
        },

        // 厂商推荐切换
        btmImgright: function() {
            var left = $(".btmImg_con2").position().left;
            var span = -($(".btmImg_con2").width());
            var left = left - 1116;
            if (left <= span) {
                return false;
            } else {
                $(".btmImg_con2").css("left", left + "px");
            }
        },
        btmImgleft: function() {
            var left = $(".btmImg_con2").position().left;
            if (left == 0) {
                return false;
            } else {
                var left = left + 1116;
                $(".btmImg_con2").css("left", left + "px");
            }
        },
        initMaps(BMap, point) {
            const map = new BMap.Map('allmap');
            console.log(this.longitude, 'dfdfd');
            map.centerAndZoom(new BMap.Point(this.longitude, this.latitude), 13);
            var marker = new BMap.Marker(new BMap.Point(this.longitude, this.latitude)); // 创建标注
            map.addOverlay(marker)

        },
        // 小图切换
        img2left: function() {
            var left = $(".img2_main").position().left;
            if (left == 0) {
                return false;
            } else {
                var left = left + 305;
                $(".img2_main").css("left", left + "px");
            }
        },
        img2right: function() {
            var left = $(".img2_main").position().left;
            var span = -($(".img2_main").width());
            var left = left - 305;
            if (left <= span) {
                return false;
            } else {
                $(".img2_main").css("left", left + "px");
            }
        },
        init() {
            const self = this;
        },
        leftBtn() {
            if (this.number > 0) {
                this.number--;
            } else {
                this.num = 0
            }
            if ($('.small-wrap-list img').length <= 3) {
                $('.small-wrap-list').css('left', 0);
                return false;
            }
            if (this.number <= 0) {
                $('.small-wrap-list').css('left', 0)
            } else {
                $('.small-wrap-list').css('left', -(this.number) * 69)
            }

        },
        rightBtn() {
            this.number++;
            if ($('.small-wrap-list img').length <= 3) {
                $('.small-wrap-list').css('left', 0);
                return false;
            } else if (this.number <= $('.small-wrap-list img').length - 3) {
                $('.small-wrap-list').css('left', -this.number * 69)
            } else {
                this.number = $('.small-wrap-list img').length - 3
                $('.small-wrap-list').css('left', -($('.small-wrap-list img').length - 3) * 69)
            }

        },
        dataDetails(e) {
            var e = e || window.event;
            this.showsquire = true;
            var x = e.offsetX - $(this.$refs.squire).width() / 2;
            var y = e.offsetY - $(this.$refs.squire).height() / 2;
            if (x <= 0) {
                x = 0;
            } else if (x >= $(this.$refs.smallimg).width() - $(this.$refs.squire).width()) {
                x = $(this.$refs.smallimg).width() - $(this.$refs.squire).width();
            }
            if (y <= 0) {
                y = 0;
            } else if (y >= $(this.$refs.smallimg).height() - $(this.$refs.squire).height()) {
                y = $(this.$refs.smallimg).height() - $(this.$refs.squire).height()
            }
            $(this.$refs.squire).css('left', x).css('top', y);
            var w = x / ($(this.$refs.smallimg).width() - $(this.$refs.squire).width());
            var h = y / ($(this.$refs.smallimg).height() - $(this.$refs.squire).height());
            var rightimg_w = ($(this.$refs.rightimg).width() - $(this.$refs.rightimgwrap).width()) * w;
            var rightimg_h = ($(this.$refs.rightimg).height() - $(this.$refs.rightimgwrap).height()) * h;
            $(this.$refs.rightimg).css("left", -rightimg_w);
            $(this.$refs.rightimg).css("top", -rightimg_h);
        },
        dataDetailout() {
            this.showsquire = false;

        },
        proimg(event) {
            $(this.$refs.leftimg).attr('src', $(event.currentTarget).attr('src'))
            $(this.$refs.rightimg).attr('src', $(event.currentTarget).attr('src'))

        }
    }
}