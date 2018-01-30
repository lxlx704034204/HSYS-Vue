export default {
    name: 'searchResult',
    components: {},
    props: ['searchData'],
    data() {
        return {
            pleasedid: '',
            hotcom: [],
            keyword: '',
            searchlist: [],
            listrecord: [],
            list_one: [],
            //每页条数
            size: 5,
            // 当前页
            current: 1,
            //总条数
            total: 0,
            // 总页数
            pages: 0,
            // 下一页是否显示
            nextPage: false,
            ishave: false,
            keyname: '',
            num: 1,
            size: 5,
            master_product: [], // 主营产品
            masterjson: [],

        };
    },
    created() {
        this.$store.state.headerType = 2;
        this.isFIndShow = false;
        this.keyword = this.$route.query.name;
        if (this.$route.query.name == '') {
            this.keyname = '全部企业'
        } else {
            this.keyname = this.$route.query.name;
        }
        var that = this;

        this.master_product = this.$util.getCodeMap("MASTER_PRODUCT");
        var json = {};
        this.master_product.forEach(v => {
            json[v.dictCode] = v.dictName
        })
        this.masterjson = json; // 主营产品

        this.companylist();
        this.hotcompny();
    },
    computed: {

    },
    watch: {
        searchData() {
            this.keyword = this.$route.query.name ? this.$route.query.name : '';
            this._ajax();
            this.companylist();
        },
    },
    mounted() {

    },
    methods: {
        hotcompny() {
            //  右侧热门企业
            var that = this;
            this.axios.get("customer/hotcustomer/10", {
                    params: { noInterceptor: 1 }
                })
                .then(function(data) {
                    that.hotcom = data.data;
                    console.log(that.hotcom, '444')
                });
        },
        _ajax() {
            var that = this;
            //  左侧搜索列表
            if (that.keyword == '') {
                this.ishave = false;
                that.keyword = '';
                that.keyname = '全部客户';
                that.companylist();
            } else {
                this.keyword = this.$route.query.name;
                this.ishave = false;
                that.companylist()
            }
        },
        companylist() {
            var arr = [];
            var that = this;
            that.axios.get("customer/list?current=" + this.current + "&size=5" + "&name=" + this.keyword)
                .then(function(re) {
                    that.list_one = that.list_one.concat(re.records);
                    console.log(that.list_one.length,'3')
                    // this.list = this.list.concat(list.data)
                    if (that.list_one.length == 0) {
                        that.ishave = true;
                    }
                    console.log(that.ishave,'5')
                    that.total = re.total;
                    that.pages = re.pages;
                    if (re.pages > that.current) {
                        that.nextPage = true;
                    } else {
                        that.nextPage = false;
                    }
                });
        },
        getNextPage() {
            this.num++;
            console.log(this.num, 'this.num');
            this.current = this.num;
            this.companylist();

            // this.size += 5;
            // if(this.size >= this.total){
            // 	this.size = this.total;
            // 	this.nextPage = false;

            // }

        },

        openhd() {
            $('#ckm').css('display', 'none');
            $('#hdpart').css('display', 'block');
        },
        jump(index, id) {
            var that = this;
            this.axios.post("customer/browse/" + id).then((res) => {
                that.$router.push('/company?userId=' + id);
            })
        },
        jumpto(index, id) {
            var that = this;
            this.axios.post("customer/browse/" + id).then((res) => {
                that.$router.push('/company?userId=' + id)
            })
        }
    }
}