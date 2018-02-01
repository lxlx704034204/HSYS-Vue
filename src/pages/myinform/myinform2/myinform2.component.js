import storage from "store2";
export default {
    name: 'myinform',
    components: {},
    props: [],
    data() {
        return {
            form: {},
            name: "",
            phone: "",
            phonea: "",
            phones: false,
            btntxt: "获取验证码",
            disabled: false,
            time: 0,
            per: [],
            biz: 1,
            verif: '',
            verif1: '',
            verifs: false,
            verifa: '',
            verifs1: false,
            verifa1: '',
            floag: false,
            flage: false
        }
    },
    computed: {

    },
    created() {
        this.name = storage.get("userName");
        this.num = storage.get("mobileNo");
    },
    mounted() {

    },
    methods: {
        ph() {

            var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if (this.phonea == "") {
                this.phone = "您的手机号码不能为空";
                this.phones = true;
            } else if (!reg.test(this.phonea)) {
                this.phone = "请输入正确手机号码";
                this.phones = true;
            } else if (this.phonea == this.num) {
                this.phone = "与原手机号相同,请更换手机号";
                this.phones = true;
            } else {
                this.phones = false;
                this.phone = "";
                var that = this;
                this.axios.get('customer/checkPhone/' + that.phonea)
                    .then(function(data) {
                        if (data == true) {
                            that.axios.post('msg/sendVerificationCode', {
                                    msgType: '1',
                                    bizType: "3",
                                    phones: [that.phonea]
                                })
                                .catch(error => console.log(error))
                        } else {
                            that.phones = true;
                            that.phone = '手机号已使用'
                        }
                    })
                    .catch(error => console.log(error))
            }
        },

        code() {
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if (this.phonea == "") {
                this.phone = "您的电话不能为空";
                this.phones = true;
            } else if (!reg.test(this.phonea)) {
                this.phone = "请输入正确手机号码";
                this.phones = true;
            } else if (this.phonea == this.num) {
                this.phone = "与原手机号相同,请更换手机号";
                this.phones = true;
            } else {
                this.phones = false;
                this.phone = "";
                var that = this;
                this.axios.get('customer/checkPhone/' + that.phonea)
                    .then(function(data) {
                        if (data == true) {
                            that.axios.post('msg/sendVerificationCode', {
                                    msgType: '1',
                                    bizType: "3",
                                    phones: [that.phonea]
                                }).then(function(data) {
                                    that.time = 60;
                                    that.disabled = true;
                                    that.timer();
                                })
                                .catch(error => console.log(error))
                        } else {

                            that.phones = true;
                            that.phone = '手机号已使用'
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                this.btntxt = this.time + "s后重新获取";
                setTimeout(this.timer, 1000);
                $(this.$refs.sendcodebtn).css("background", "#D1D1D1");
                $(this.$refs.sendcodebtn).css("border", "#D1D1D1 1px solid");
            } else {
                this.time = 0;
                this.btntxt = "获取验证码";
                this.disabled = false;
                $(this.$refs.sendcodebtn).css("background", "#009FE2");
                $(this.$refs.sendcodebtn).css("border", "#009FE2 1px solid");
            }
        },
        data: function() {
            return {
                disabled: false,
                time: 0,
                btntxt: "获取验证码"
            }
        },
        cancel() {
            this.$router.push({ path: '/companycenter/myinform' })
        },
        nextstep() {
            if (this.phonea == "" && this.verif == "") {
                this.phone = "您的手机号码不能为空";
                this.phones = true;
                this.verifa = "您的验证码不能为空";
                this.verifs = true;
            } else if (this.phonea != "" && this.verif == "") {
                this.phone = "";
                this.phones = false;
                this.verifa = "您的验证码不能为空";
                this.verifs = true;
            } else if (this.phonea == "" && this.verif != "") {
                this.phone = "您的手机号码不能为空";
                this.phones = true;
                this.verifa = "";
                this.verifs = false;
            } else {
                this.phone = "";
                this.phones = false;
                this.verifa = "";
                this.verifs = false;
                var that = this;
                this.axios.put('customer/phone?id=' + sessionStorage.id + '&phone=' + that.phonea + '&verificationCode=' + that.verif)
                    .then(function(data) {
                        console.log(data, 'l');
                        if (data == null) {
                            storage.set("mobileNo", that.phonea);
                            that.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });
                            that.$router.push({ path: '/companycenter/myinform' })

                        } else {
                            that.phone = '';
                            that.verif = '';
                            that.verifs = true;
                            that.verifa = '验证码输入错误'
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
    }
}