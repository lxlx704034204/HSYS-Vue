export default {
    name: 'addstaff',
    components: {},
    props: [],
    data() {
        return {
            value3: '',
            value4: '',
            name: "",
            namea: "",
            namez: false,
            phone: "",
            phonea: "",
            phonez: false,
            email: "",
            emaila: "",
            emailz: false,
            position: '',
            positionx: '',
            positionz: false,
            mystId: '',
            submit: true
        }
    },
    computed: {

    },
    created() {
        this.mystId = this.$route.query.id;
        if (this.mystId != undefined) {
            this._mystafftable();
        }
    },
    mounted() {

    },
    methods: {
        _mystafftable() {
            var that = this;
            if (that.mystId == '') {

            } else {
                // 获取要修改数据
                this.axios.get("user/init/" + that.mystId).then(function(data) {
                        that.submit = false;
                        that.name = data.userName;
                        that.phone = data.mobileNo;
                        that.position = data.position;
                        that.email = data.email;
                        that.value3 = data.active;
                        that.value4 = data.admin;
                    })
                    .catch(error => console.log(error))
            }
        },

        // 修改数据
        onSubmit2() {
            if (this.name == "" || this.phone == "" || this.email == "" || this.position == "") {
                this.names()
                this.phones()
                this.emails()
                this.positions()
            } else if (this.namez || this.phonez || this.emailz || this.positionz) {
                return;
            } else {
                this.namez = false;
                this.phonez = false;
                this.emailz = false;
                this.positionz = false;
                var that = this;
                this.axios.put("user/update", {
                        id: this.mystId,
                        userName: this.name,
                        mobileNo: this.phone,
                        position: this.position,
                        email: this.email,
                        active: this.value3,
                        admin: this.value4
                    }, { params: { noInterceptor: 1 } }).then(function(data) {
                        if (data.code == 0) {
                            that.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });
                            // location.href = "#/companycenter/mystaff"
                            that.$router.push("/companycenter/mystaff");
                        } else {
                            that.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    })
                    .catch(error => console.log(error))
            }
        },

        names() {
            if (this.name == "") {
                this.namea = "姓名不能为空";
                this.namez = true;
            } else if (this.name.length > 45) {
                this.namea = "姓名长度不能超过45个";
                this.namez = true;
            } else {
                this.namez = false;
            }
        },
        phones() {
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if (this.phone == "") {
                this.phonea = "手机号码不能为空";
                this.phonez = true;
            } else if (!reg.test(this.phone)) {
                this.phonea = "请输入正确手机号码";
                this.phonez = true;
            } else {
                this.phonez = false;
            }
        },
        positions() {
            if (this.position == '') {
                this.positionx = "请输入员工职位";
                this.positionz = true;
            } else if (this.position.length > 30) {
                this.positionx = "员工职位名称长度不能超过30个";
                this.positionz = true;
            } else {
                this.positionz = false;
            }
        },
        emails() {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (this.email == "") {
                this.emaila = "邮箱不能为空";
                this.emailz = true;
            } else if (!reg.test(this.email)) {
                this.emaila = "请输入正确邮箱";
                this.emailz = true;
            } else if (this.email.length > 45) {
                this.emaila = "邮箱长度最多不超过45";
                this.emailz = true;
            } else {
                this.emailz = false;
            }
        },
        onSubmit() {
            if (this.name == "" || this.phone == "" || this.email == "" || this.position == "") {
                // this.namea = "姓名不能为空";
                this.names()
                    // this.namez = true;
                    // this.phonea = "手机号码不能为空";
                this.phones()
                    // this.phonez = true;
                    // this.emaila = "邮箱不能为空";
                this.emails()
                    // this.emailz = true;
                    // this.positionx = "请输入员工职位";
                this.positions()
                    // this.positionz = true;
            } else if (this.namez || this.phonez || this.emailz || this.positionz) {
                return;
            } else {
                this.namez = false;
                this.phonez = false;
                this.emailz = false;
                this.positionz = false;
                var that = this;
                this.axios.post("user/add", {
                        userName: this.name,
                        mobileNo: this.phone,
                        position: this.position,
                        email: this.email,
                        active: this.value3,
                        admin: this.value4
                    }, { params: { noInterceptor: 1 } }).then(function(data) {
                        if (data.code == 0) {
                            that.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            location.href = "#/companycenter/mystaff"

                        } else {
                            that.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                        }

                    })
                    .catch(error => console.log(error))
            }
        }
    }
}