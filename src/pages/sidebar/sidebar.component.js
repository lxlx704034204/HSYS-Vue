export default {
  name: 'sidebar',
  components: {},
  data() {
    return {
    	commsg:[],
    	comcategory:[],
      compaytype:[],
      compayjson:[],
      fle:false,
      addr:'',
    }
  },
  created() {
    this.compaytype = this.$util.getCodeMap("CAMPANY");
    var json = {};
    this.compaytype.forEach(v => {
      json[v.dictCode] = v.dictName
    })
    this.compayjson = json;    // 公司类型

  	var that = this;
  	var userId = this.$route.query.userId;
  	that.axios.get("customer/detail/" + userId + '?date='+new Date().getTime())
		.then(function(data) {
			that.commsg = [data];
      that.$store.state.customerdetail = data;
			that.addr = data.provinceName + data.cityName + data.areaName + data.address;
		});
  	that.axios.get("customerproduct/category?id=" + userId + '&date='+new Date().getTime())
		.then(function(data) {
      if(!data || data.length == 0){
      	that.fle = true;
      } else {
      	that.comcategory = data;
      }
			
		});
  },
  computed: {

  },
//  mounted(){
//      //百度地图
//      var map = new BMap.Map("allmap");
//      map.centerAndZoom("北京", 12);
//      map.enableScrollWheelZoom(true);
//  },
  methods:{
  	tomain(){
  		var userId = this.$route.query.userId;
    	this.$router.push('mainproduct?userId='+userId);
    	$('#ph1').css('borderBottom','2px solid #FFF');
    	$('#ph2').css('borderBottom','2px solid #009FE2');
    	$('#ph3').css('borderBottom','2px solid #FFF');
    	$('#ph4').css('color','#333');
    	$('#ph5').css('color','#009FE2');
    	$('#ph6').css('color','#333');
  	},
  }
}