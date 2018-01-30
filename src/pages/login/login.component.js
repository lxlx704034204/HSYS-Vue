// 引入JQ
import axios from 'axios'
import storage from "store2";
import { mapActions } from "vuex";
// 引入后台数据
const setStorage = (data) => {
    storage.set("token", data.token);
    storage.set("userName", data.login.userName);
    storage.set("id", data.customer.id);
    storage.set("mobileNo", data.login.mobileNo);
};

export default {
    name: 'login',
    components: {},
    props: [],
    data() {
        return {
            // 账号   密码  手机号
            username: '',
            pwd: '',
            telnumber: '',
            // 账号·密码 手机号 提示是否显示隐藏
            pwdisshow: false,
            nameisshow: false,
            phoneisshow: false,
            phonea: '',
            phones: false,
            verifa: '',
            verifs: false,
            pwdtext: "",
            usernametext: "",
            disabled: false,
            time: 0,
            btntxt: "获取验证码",
            phone: '',
            biz: 1,
            verif: '',
            errmsg: '',
            formMess: {
                email: this.email,
                phone: this.phone
            },
            // 定义数据
            logindata: [],
            showphone: false,
        }
    },
    created() {
        var urlId = this.$route.path;
        if (urlId.indexOf('login') > 0) {
            this.$store.state.headerType = 2;
        }
    },
    computed: {},
    mounted() {},
    methods: {
        ...mapActions(["login"]),
        // 点击提交数据
        loginbtn(e) {
            if (this.username == '' && this.pwd == '') {
                this.usernametext = "账号不能为空";
                this.pwdisshow = true;
                this.pwdtext = "密码不能为空";
                this.nameisshow = true;
                return false;
            } else if (this.username != '' && this.pwd == '') {
                this.pwdtext = "您输入的密码有误请重新输入"
                this.pwdisshow = true;
                return false;
            } else if (this.username == '' && this.pwd != '') {
                this.usernametext = "账号不能为空";
                this.pwdisshow = true;
                return false;
            } else if (this.username != '' && this.pwd != '') {
                this.pwdisshow = false;
                this.nameisshow = false;
                var that = this;
                if (!/^[0-9a-zA-Z_]+$/.test(this.username)) {
                    this.usernametext = "账户只能有英文字母、数字和_组成";
                    this.nameisshow = true;
                    return false;
                }
                if (!/^\w{5,14}$/.test(this.username)) {
                    this.usernametext = "请输入5-15位的正确账号";
                    this.nameisshow = true;
                    return false;
                }
                that.pwd = encodeURIComponent(that.pwd);
                console.log(that.pwd);
                this.axios.post('login?login=' + that.username + '&password=' + that.pwd).then((res) => {
                    if (res.code && res.code.toString() !== "0") {
                        $("#tsm1").css("display", "block");
                        this.errmsg = '*' + res.msg;
                        console.log(res.msg, '444')
                        return false;
                    }
                    if (typeof res === "string") {
                        this.$alert(res, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                        return false;
                    }
                    const { userName } = res.login;
                    setStorage(res);
                    that.login(userName);
                    $("#tsm1").css("display", "none");
                    this.errmsg = '';
                    $("#tsm2").css("display", "none");
                    that.$message({
                        showClose: true,
                        message: '登陆成功',
                        type: 'success'
                    });
                    // location.href = "/#/home"
                    console.log(res);
                    this.$store.commit('setUesrInfor', res.login);
                    this.$store.commit('setCustomer', res.customer);
                    this.$router.push({
                        path: "/home",
                        query: {
                            userId: res.customer.id
                        }
                    })
                }, (rej) => {
                    that.pwdisshow = true;
                    that.pwdtext = data.msg;
                    return false;
                })
            }
        },
        // 活动条
        clickToggleItem(type) {
            let activeBar = $(this.$refs.loginTabs.$el).find(".el-tabs__active-bar");
            if (type === 1) { // 登录账号，translateX(0)
                activeBar.removeClass('translateX150');
                this.usernametext = "";
                this.pwdisshow = false;
                this.pwdtext = "";
                this.nameisshow = false;
            } else {
                this.phones = false;
                this.phonea = "";
                this.verifs = false;
                this.verifa = "";
                activeBar.addClass('translateX150');
            }
        },
        // 正则验证账号
        testusername() {
            const regu = /^\w{5,14}$/;
            if (this.username == '') {
                this.usernametext = "账号不能为空 "
                this.nameisshow = true;
            } else if (!regu.test(this.username)) {
                this.nameisshow = true;
                this.usernametext = "请输入5-15位的正确账号 "
            } else {
                this.nameisshow = false;
                this.usernametext = ""
            }
        },
        ftestusername() { //得到焦点事件
            this.nameisshow = false;
        },
        // 正则验证密码
        testpwd() { //失去焦点事件
            // var regu = /^\w{5,14}$/;
            if (this.pwd == '') {
                this.pwdtext = "密码不能为空"
                this.pwdisshow = true;
            } else if (this.pwd.length < 6 || this.pwd.length > 15) {
                this.pwdtext = "密码长度为6-15位的正确密码"
                this.pwdisshow = true;
            }
            // else if (regu.test(this.pwd)) {
            //     this.pwdisshow = false;
            // } else {
            //     this.pwdisshow = true;
            //     this.pwdtext = "您输入的密码有误请重新输入"
            // }
        },
        ftestpwd() { //得到焦点事件
            this.pwdisshow = false;
        },
        // 正则验证手机号
        //验证手机号码部分
        sendcode() {
            var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if (this.phone == '') {
                this.phones = true;
                this.phonea = "手机号不能为空"
            } else if (!reg.test(this.phone)) {
                this.phones = true;
                this.phonea = "输入正确的手机号"
            } else {
                this.phones = false;
                this.phonea = ""
                var that = this;
                this.axios.get('customer/checkPhone/' + that.phone).then((res) => {
                    if (!!res) {
                        that.phones = true;
                        that.phonea = "您的手机号码尚为注册，请注册后登录。"
                    } else {
                        that.time = 60;
                        that.disabled = true;
                        that.timer();
                        var msgs = {
                            // msgType: 1,
                            bizType: 1,
                            phones: [that.phone],
                        }
                        this.axios.post("msg/sendVerificationCodeNoLogin", msgs).then((res) => {
                            that.time = 60;
                            that.disabled = true;
                            that.timer();
                            //            that.$alert("验证码已发送", '提示', {
                            //              confirmButtonText: '确定',
                            //            })
                        })
                    }
                }, (rej) => {
                    that.$alert(rej.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    })
                })
            }

        },

        login_btn() {
            if (this.phone == "" && this.verif == "") {
                this.phones = true;
                this.phonea = "手机号码不能为空";
                this.verifs = true;
                this.verifa = "验证码不能为空";
            } else if (this.phone != "" && this.verif == "") {
                this.phones = false;
                this.phonea = "";
                this.verifs = true;
                this.verifa = "验证码不能为空";
            } else if (this.phone == "" && this.verif != "") {
                this.phones = true;
                this.phonea = "手机号码不能为空";
                this.verifs = false;
                this.verifa = "";
            } else {
                this.phones = false;
                this.phonea = "";
                this.verifs = false;
                this.verifa = "";
                var that = this;
                var msgs = {
                    bizType: 1,
                    phone: that.phone,
                    verificationCode: that.verif
                }
                this.axios.post('phonelogin', msgs).then((res) => {
                    console.log(res, '333')
                    if (res.code && res.code.toString() !== "0") {
                        that.showphone = true;
                        return false;
                    }
                    if (typeof res === "string") {
                        this.$alert(res, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                        return false;
                    }
                    if (res != "") {
                        setStorage(res);
                        that.$message({
                            showClose: true,
                            message: '登陆成功',
                            type: 'success'
                        });
                        this.$store.commit('setUesrInfor', res.login);
                        this.$store.commit('setCustomer', res.customer);
                        // storage.set("token", res.token);//+
                        location.href = "/#/home"
                    }
                }, (rej) => {
                    that.$alert(rej.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                });
            }

        },
        timer() {
            if (this.time > 0 && this.timer) {
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
        query() {
            var formMess = this.formMess
            this.axios.post("/order/select/reception", formMess).then((res) => {
                this.productResult = res.data.data;
                this.productResult.length = 3;
            })
        },
        phoneq() {
            var reg = /^1[3|5|8|7][0-9]\d{8}$/;
            if (this.phone == '') {
                this.phones = true;
                this.phonea = "手机号码不能为空";
            } else if (!reg.test(this.phone)) {
                this.phones = true;
                this.phonea = "手机号码格式不正确";
            } else {
                this.phones = false;
                this.phonea = "";
                var that = this;
                this.axios.get('customer/checkPhone/' + that.phone).then((res) => {
                    if (!!res) {
                        that.phones = true;
                        that.phonea = "请先注册";
                    }
                })
            }
        },
        verifq() {
            if (this.verif == "") {
                this.verifs = true;
                this.verifa = "验证码不能为空";
            } else {
                this.verifs = false;
                this.verifa = "";
                var that = this;
                var msgs = {
                    bizType: that.biz,
                    phone: that.phone,
                    verificationCode: that.verif
                }
            }
        },
    }
}