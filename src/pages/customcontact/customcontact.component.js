import storage from "store2";
import { mapState } from "vuex";
import initializeMap from "./map";
export default {
    name: 'customcontact',
    components: {},
    props: [],
    data() {
        return {
            cinf: [],
            addinf: [],
            longitude: '',
            latitude: '',
            provinces: '',
        }
    },
    computed: {
        ...mapState(["token"])

    },

    created() {
        console.log(this.$store.state.customerdetail);
        $('#ph4').css('color', '#333')
        $('#ph6').css('color', '#009FE2')
        $('#ph1').css('borderBottom', '#FFF 2px solid')
        $('#ph3').css('borderBottom', '#009FE2 2px solid')
        // this.$store.state.headerType = 5;
        this.$store.commit("switchHeaderType", 5);
        this.$store.commit("switchFooterType", 100);
        var userId = this.$route.query.userId;
        var that = this;
        if(this.$store.state.customerdetail){
            var data = this.$store.state.customerdetail;
            that.cinf = data;
            that.longitude = data.longitude;
            that.latitude = data.latitude;
            var province = data.province;
            var city = data.city;
            var area = data.area;
            that.area(province);
            that.area(city);
            that.area(area);

        }else{
            that.axios.get("customer/detail/" + userId)
            .then(function(data) {
                that.cinf = data;
                that.longitude = data.longitude;
                that.latitude = data.latitude;
                var province = data.province;
                var city = data.city;
                var area = data.area;
                that.area(province);
                that.area(city);
                that.area(area);
            });
        }
       
    },
    mounted() {
        initializeMap().then(BMap => {
            let point = {};
            this.initMap(BMap, point);
        });
    },
    methods: {
        area(item) {
            var that = this;
            that.axios.get("area/list?parent=" + item)
                .then(function(data) {
                    if (data != '') {
                        that.provinces = data[0].mergerName;

                    }
                });
        },
        initMap(BMap, point) {
            const map = new BMap.Map(this.$refs.mapcustom);
            map.centerAndZoom(new BMap.Point(this.longitude, this.latitude), 13);
            var marker = new BMap.Marker(new BMap.Point(this.longitude, this.latitude)); // 创建标注
            map.addOverlay(marker);
            map.enableScrollWheelZoom(true); //启用滚轮放大缩小，默认禁用
            map.enableContinuousZoom(true);
        },
    }
}