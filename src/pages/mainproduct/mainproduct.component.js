import storage from "store2";
export default {
	name: 'mainproduct',
	components: {},
	props: [],
	data() {
		return {
			pageNo: 1,
			pageSize: 12,
			pageSizesList: [10, 15, 20, 30, 50],
			// tableData: [],//返回的结果集合
			total: 1, //数据的总数,
			cominf: [],
			goodinf: [],
			comcategory: [],
			name: '',
			commsg: [],
			userId: '',
			cateshow: false,
			cid: '',
			reminshow: false,
			cp: false,
			compaytype: [],
			compayjson: [],
			names: '全部产品',
		}
	},
	computed: {

	},
	created() {
		// this.$store.state.headerType = 5;
		this.$store.commit("switchHeaderType", 5);
		this.compaytype = this.$util.getCodeMap("CAMPANY");
		var json = {};
		this.compaytype.forEach(v => {
			json[v.dictCode] = v.dictName
		})
		this.compayjson = json; // 公司类型
		var that = this;
		this.userId = this.$route.query.userId;
		that.axios.get("customer/detail/" + this.userId)
			.then(function(data) {
				that.cominf = [data];
				that.addr = data.provinceName + data.cityName + data.areaName + data.address;
			});
		//  分类
		that.axios.get("customerproduct/category?id=" + that.userId, {
				params: {
					noInterceptor: 1
				}
			})
			.then(function(data) {
				if(data.data == undefined) {
					that.reminshow = true;
				} else {
					that.comcategory = data.data;
				}
			});
		this.mainlist();
	},
	methods: {
		mainlist() {
			//  用户产品
			var that = this;
			that.cp = false;
			this.axios.get("customerproduct/all?user_id=" + this.userId + '&size=12&current=' + this.pageNo + '&cid=' + this.cid, {
					params: {
						noInterceptor: 1
					}
				})
				.then(function(data) {
					console.log(data,'999')
					if(data.code == 0) {
						that.goodinf = data.data.records;
						that.pageSize = data.data.size;
						that.total = data.data.total;
						that.cp = false;
					} else {
						that.goodinf = [];
						that.pageSize = 1;
						that.total = 0;
						that.cp = true;
					}
				});
		},
		//	sidebar js
		cateClick(index, ids, name) {
			this.cid = ids;
			this.names = name;
			this.cateshow = true;
			this.name = name;
			this.mainlist();
			$('.com_inf3').css('color', '#333');
			$('.com_inf2').css('background', '#FFF');
			$('.com_inf3').css('borderBottom', '1px dashed #dfe5ee');
			$($('.com_inf3')[index]).css('color', '#FFF');
			$($('.com_inf2')[index]).css('background', '#009FE2');
			$($('.com_inf3')[index]).css('borderBottom', '1px solid #009FE2');
		},
		closex() {
			this.cid = '';
			this.cateshow = false;
			this.names = '全部产品'
			this.mainlist();
			$('.com_inf3').css('color', '#333');
			$('.com_inf2').css('background', '#FFF');
			$('.com_inf3').css('borderBottom', '1px dashed #dfe5ee');
		},
		openx(index, name) {
			this.cid = index;
			this.name = name
			this.names = name
			this.cateshow = true;
			this.mainlist();
			$('.com_inf3').css('color', '#333');
			$('.com_inf2').css('background', '#FFF');
			$('.com_inf3').css('borderBottom', '1px dashed #dfe5ee');
		},
		// 分页
		pageChange(num) {
			this.pageNo = num;
			this.mainlist()
		},

		// 上一页
		prevPage() {
			this.pageNum--;
			if(this.pageNum === 1) {
				this.pageNum = 1
				return pageNum
			}
		},
		// 下一页
		nextPage() {
			this.pageNum++;
			if(this.pageNum === this.total / this.pageSize) {
				this.pageNum = this.total / this.pageSize
				return pageNum
			}
		},
	}
}