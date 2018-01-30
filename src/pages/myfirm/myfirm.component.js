import storage from "store2";
export default {
    name: 'myfirm',
    components: {},
    props: [],
    data() {
        return {
            companyList: [], // 公司
            companyimg: [],
            tabPosition: "",
            activeName: '',
            auth: false,
            auth1: false,
            auth2: false,
            auth3: false,
            auth4: false,
            auth5: false,
            auth6: false,
            auth7: false,
            imageUrl: "",
            name: "",
            money: '',
            ordernum: '',
            pendingpayment: '', //待付款
            pendingdelivery: '', //待发货
            per: [],
            perd: [],
            id: '',
            one: null,
            failReasonl: '',
        }
    },
    computed: {

    },
    mounted() {

    },
    created() {
        this.app();
        var that = this;
        var id = storage.get("id");
        this.axios.get('customer/detail/' + id)
            .then(function(data) {
                if (data != "") {
                    that.per = data;
                    console.log(data, '3')
                    that.imageUrl = that.per.logoUrl;
                    that.name = that.per.name;
                    that.failReasonl = that.per.failReasonl;
                    console.log(that.failReasonl)
                    that.id = data.id;
                    if (that.per.status == 'AWAIT') {
                        that.auth = false;
                        that.auth1 = false;
                        that.auth2 = false;
                        that.auth3 = true;
                        that.auth4 = false;
                        that.auth5 = false;
                        that.auth6 = true;
                        that.auth7 = false;
                    } else if (that.per.status == 'SUCCESS') {
                        that.auth = true;
                        that.auth1 = false;
                        that.auth2 = false;
                        that.auth3 = false;
                        that.auth4 = false;
                        that.auth5 = false;
                        that.auth6 = true;
                        that.auth7 = false;
                    } else if (that.per.status == 'FAIL') {
                        that.auth = false;
                        that.auth1 = false;
                        that.auth2 = true;
                        that.auth3 = false;
                        that.auth4 = false;
                        that.auth5 = false;
                        that.auth6 = true;
                        that.auth7 = false;
                    } else if (that.per.status == 'NOT_AUTHENTICATION') {
                        that.auth = false;
                        that.auth1 = false;
                        that.auth2 = false;
                        that.auth3 = false;
                        that.auth4 = true;
                        that.auth5 = false;
                        that.auth6 = true;
                        that.auth7 = false;
                    } else if (that.per.status == 'FROZEN') {
                        that.auth = false;
                        that.auth1 = true;
                        that.auth2 = false;
                        that.auth3 = false;
                        that.auth4 = false;
                        that.auth5 = true;
                        that.auth6 = false;
                        that.auth7 = true;
                    }
                }
            })

    },
    methods: {
        tomyc() {
            window.open('#/company?userId=' + this.id)
            if (!this.auth) {
                this.$alert('公司信息尚未完善', '提示', {
                    confirmButtonText: '完善企业信息',
                    type: 'warning',
                    callback: action => {
                        this.$router.push("/companycenter/publish");
                    }
                })
            }
        },
        app() {
            var that = this;
            this.axios.get('order/my/order-dashboard')
                .then(function(data) {
                    if (data != "") {
                        that.perd = data;
                        that.money = that.perd[0].orderSum;
                        that.ordernum = that.perd[0].orderCount;
                        that.pendingpayment = that.perd[0].statusCount.AWAITING_PAYMENT;
                        that.pendingdelivery = that.perd[0].statusCount.AWAITING_DELIVERY;
                    }

                })
        },
        handleClick({ index }) {
            var that = this;
            if (index == 0) {
                that.money = that.perd[0].orderSum;
                that.ordernum = that.perd[0].orderCount;
                that.pendingpayment = that.perd[0].statusCount.AWAITING_PAYMENT;
                that.pendingdelivery = that.perd[0].statusCount.AWAITING_DELIVERY;
            } else if (index == 1) {
                that.money = that.perd[1].orderSum;
                that.ordernum = that.perd[1].orderCount;
                that.pendingpayment = that.perd[1].statusCount.AWAITING_PAYMENT;
                that.pendingdelivery = that.perd[1].statusCount.AWAITING_DELIVERY;
            } else if (index == 2) {
                that.money = that.perd[2].orderSum;
                that.ordernum = that.perd[2].orderCount;
                that.pendingpayment = that.perd[2].statusCount.AWAITING_PAYMENT;
                that.pendingdelivery = that.perd[2].statusCount.AWAITING_DELIVERY;
            } else if (index == 3) {
                that.money = that.perd[3].orderSum;
                that.ordernum = that.perd[3].orderCount;
                that.pendingpayment = that.perd[3].statusCount.AWAITING_PAYMENT;
                that.pendingdelivery = that.perd[3].statusCount.AWAITING_DELIVERY;
            }
        },

    }
}