// import { mystafftable } from "@/api/api";

export default {
    name: 'mystaff',
    components: {},
    props: [],
    data() {
        return {
            mystafftable: [],
            tableData: [],
            option: [],
            pageNum: 1,
            total: 0,
            pageSize: 5,
            value: '',
            value1: '',
            value2: true,
            value3: true,
            tokon: '',
            dialogVisible: false,
            rowid: '',
            rowlist: '',
            number: '',
        }
    },
    computed: {

    },
    created() {
        this._mystafftable();
    },
    mounted() {

    },
    methods: {
        editBtn(row) {
            this.$router.push({ path: '/companycenter/addstaff', query: { id: row.id } });
        },

        delete_btn(id, index, row) {
            var that = this;
            this.dialogVisible = true;
            this.rowid = id.id;
            this.rowlist = row;
            this.number = index;

        },
        handleClose(done) {
            done();
        },
        confirmbtn() {
            var that = this;
            this.axios.delete("user/" + this.rowid).then(function(data) {
                    that._mystafftable();
                })
                .catch(error => console.log(error))
            this.dialogVisible = false;

        },

        likeSearch() {
            var that = this;
            this.axios.get("user/all?userName=" + that.value).then(function(data) {
                    that.mystafftable = data.records;
                    that.pageNum = data.current;
                    that.pageSize = data.size;
                    that.total = data.total;
                })
                .catch(error => console.log(error))
        },

        _mystafftable() {
            var that = this;
            this.axios.get("user/all?current=" + that.pageNum + '&size=5').then(function(data) {
                    console.log(data, 'data');

                    that.mystafftable = data.records;
                    that.pageNum = data.current;
                    that.total = data.total;
                })
                .catch(error => console.log(error))
        },
        // 分页
        pageChange(num) {
            this.pageNum = num;
            this._mystafftable();
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
                if (this.pageNum === this.total / this.pageSize) {
                    this.pageNum = this.total / this.pageSize
                    return pageNum
                }
        }

    }
}