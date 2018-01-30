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
        this.phonea = storage.get("mobileNo");
    },
    mounted() {

    },
    methods: {
        code() {
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if (this.phonea == "") {
                this.phone = "您的电话不能为空";
                this.phones = true;
            } else if (!reg.test(this.phonea)) {
                this.phone = "请输入正确手机号码";
                this.phones = true;
            } else {
                this.phones = false;
                this.phone = "";
                var that = this;
                this.axios.post('msg/sendVerificationCodePhone', {
                        msgType: '1',
                        bizType: "3",
                        phones: [this.phonea]
                    }).then(function(data) {
                        that.time = 60;
                        that.disabled = true;
                        that.timer();
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

                this.axios.post('msg/verifyRandomCode', {
                        bizType: "3",
                        phone: that.phonea,
                        verificationCode: that.verif
                    }, { params: { noInterceptor: 1 } }).then(function(data) {
                        console.log(data, 'datad');
                        if (data.data == false) {
                            that.verifs = true;
                            that.verifa = '验证码输入错误'
                        } else {
                            that.verifs = false;
                            that.time = 0;
                            that.btntxt = "获取验证码";
                            that.disabled = false;
                            document.getElementById('fg').style.background = '#009FE2';
                            that.$router.push({ path: '/companycenter/myinform2' })
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
    }
}