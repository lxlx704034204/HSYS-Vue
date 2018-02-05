import storage from "store2";
export default {
    name: 'myasset',
    components: {},
    props: [],
    data() {
        return {
            activeName: 'second',
            avaliable: '', // 可用余额
            amount: '', // 余额
            freeze: '', // 冻结余额
            pdcom: '',
        }
    },
    computed: {

    },
    mounted() {

    },
    created() {
        this.assetlist();
    },
    methods: {
        assetlist() {
            var _this = this;
            this.axios.get("account/my" + '?t=' + Math.random())
                .then(function(data) {
                    console.log(data, 'd');
                    String.prototype.getAns = function() {
                        var pattern = /(?=((?!\b)\d{3})+$)/g;
                        return this.replace(pattern, ',');
                    }
                    _this.avaliable = JSON.stringify(data.avaliableAmount).getAns();
                    _this.amount = JSON.stringify(data.amount).getAns();
                    _this.freeze = JSON.stringify(data.freezeAmount).getAns();
                })
                .catch(error => console.log(error))

        },
        torecharge() {
            var that = this;
            if (storage.get("token")) {
                // 验证是否完善信息
                var ids = storage.get("id");
                this.axios.get("customer/" + ids + '?t=' + Math.random())
                    .then(function(data) {
                        that.pdcom = data;
                        if (that.pdcom.status == 'SUCCESS') {
                            if (that.amount == '5,000') {
                                that.$alert('您的账户余额不能超过' + that.amount + '元', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning',
                                })
                            } else {
                                that.$router.push('/recharge')
                            }
                        } else if (that.pdcom.status != 'SUCCESS') {
                            // 去完善企业信息
                            that.$alert('请到企业中心完善信息', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                            }).then(() => {
                                that.$router.push('/companycenter/myfirm')
                            }).catch(() => {

                            });
                        }
                    });
            } else {
                this.$router.push('/login')
            }
        },
        toenchashment() {
            if (this.avaliable == 0 && this.freeze == 0) {
                this.$alert('您的账户没有余额，不能提现', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                });
            } else if (this.avaliable == 0 && this.freeze != 0) {
                this.$alert('您的余额因缴纳保证金已被冻结，请解冻后提现', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                });
            } else {
              this.$router.push('/enchashment')
            }

        },
    }
}