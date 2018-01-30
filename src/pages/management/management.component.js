import storage from "store2";
export default {
    name: 'management',
    components: {},
    props: [],
    data() {
        return {
            managementable: [],
            option: [],
            value: '',
            pageNum: 1,
            value1: '',
            tableData: [],
            input: '',
            current: 1,
            pageSize: 6,
            total: 0,
            grade: localStorage.gradeinfo,
            unitCods: localStorage.unitinfo,
            line: [],
            shows: false,
            totals: '',
            dw: ''
        }
    },
    computed: {

    },
    created() {
        var ws = new WebSocket("wss://echo.websocket.org");
        ws.onopen = function(evt) {
            console.log("Connection open ...");
            ws.send("Hello WebSockets1·!");
        };

        ws.onmessage = function(evt) {
            console.log("Received Message: " + evt.data);
            ws.close();
        };

        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };

        this._managementable();
        this.dw = this.$util.getCodeMap("UNIT");

    },
    mounted() {

    },
    methods: {
        // 发布产品
        publishbnt() {
            // let customer = this.$store.state.customer;
            // if (customer.status !== 'SUCCESS') {
            //     // this.$alert('请先完善公司信息，等待审核通过才能发布产品', '提示', {
            //     //     confirmButtonText: '完善企业信息',
            //     //     type: 'warning',
            //     //     callback: action => {
            //     //         this.$router.push("/companycenter/publish");
            //     //         this.$emit('publish');
            //     //     }
            //     // })
            //     this.$alert('请先完善公司信息，等待审核通过才能发布产品', '温馨提示', {
            //         confirmButtonText: '完善企业信息',
            //         type: 'warning',
            //     }).then(() => {
            //         this.$router.push("/companycenter/publish");
            //         this.$emit('publish');
            //     }).catch(() => {

            //     });
            // } else {
            //     this.$router.push('/companycenter/bidding');
            // }
            var that = this;
            var userId = storage.get("id");
            //判断企业验证状态
            if (!!userId) {
                this.axios.get('customer/detail/' + userId)
                    .then(function(data) {
                        if (data != "") {
                            if (data.status !== 'SUCCESS') {
                                that.$alert('请先完善公司信息，等待审核通过才能发布产品', '温馨提示', {
                                    confirmButtonText: '完善企业信息',
                                    type: 'warning',
                                }).then(() => {
                                    that.$router.push("/companycenter/publish");
                                    that.$emit('publish');
                                }).catch(() => {

                                });
                            } else {
                                that.$router.push('/companycenter/bidding');
                            }
                        }
                    })
            }
        },
        likeSearch() {
            this._managementable()
        },
        _managementable() {
            var data = 'current=' + this.pageNum + '&size=6' + '&name=' + this.value;
            var that = this;
            this.axios.get(`customerproduct/list?${data}`).then(res => {
                if (typeof res !== 'string') {
                    that.managementable = res.records;
                    that.total = res.total;
                    that.pageNum = res.current;
                    // for (var i = 0; i <  that.managementable.length; i++) {
                    //    if(that.managementable[i].unitCode == 'TON'){
                    //       that.managementable[i].unitCode = '吨'
                    //    }else{
                    //       that.managementable[i].unitCode = '千克'
                    //    }
                    // }
                } else {
                    // this.$message({ type: 'warning', message: '未找到相关产品' });
                }
            });
        },
        // 获取单位
        getDwName(code) {
            let name = '';
            this.dw.some(v => {
                if (v.dictCode === code) {
                    name = v.dictName;
                }
            })
            return name;
        },
        pageChange(num) {
            this.pageNum = num++;
            this._managementable();
        },

        // 上一页
        prevPage() {
            this.pageNum--
                if (this.pageNum === 1) {
                    this.pageNum = 1
                    return pageNum
                }
        },
        // 下一页
        nextPage() {
            this.pageNum++
                if (this.pageNum === this.total / this.size) {
                    this.pageNum = this.total / this.size
                    return pageNum
                }
        },

        handleEdit(index, row) {
            this.$router.push({ path: '/companycenter/bidding', query: { id: row.id } })
        },

        handleactive(index, row) {
            if (row.show) {
                this.$confirm('确定下架?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.putActive(row);
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消下架' });
                });
            } else {
                this.putActive(row);
            }
        },
        // 上下架请求
        putActive(row) {
            var data = {
                show: !row.show,
                id: row.id
            }
            this.axios.put(`customerproduct/active`, data).then(res => {
                console.log(res);
                if (!res) {
                    if (!row.show) {
                        this.$message({ type: 'success', message: '上架成功' });
                    } else {
                        this.$message({ type: 'success', message: '下架成功' });
                    }
                    row.show = !row.show
                } else {
                    this.$message({ type: 'error', message: res });
                }
            });
        }

    }
}