export default {
	name: 'detailsclass',
	components: {},
	props: [],
	data() {
		return {
			pageNo: 1,
			pageSize: 8,
			pageSizesList: [10, 15, 20, 30, 50],
			total: 1, //数据的总数,
			firstlocal: '',
			secondlocal: '',
			detlist: [],
			dw: '',
			prolist: [],
			newcom: [],
			comcategory: [],
			names: '',
			fstName: '',
			secName: '',
			loading: false,
			ishave: false,
			fstId: '',
			isnothave: false,
			zging: false,
			zqiy: false,
		}
	},
	created() {
		//      this.dw = this.$util.getCodeMap("UNIT");
		//      console.log(this.dw,'dw')
		this.fstId = this.$route.query.fstId;
		this.detaillist(); // 产品列表
		//  获得面包屑name名
		this.list();
		var that = this;
		this.axios.get("dictionary/batch?parentCodes=UNIT")
			.then(function(data) {
				that.dw = data[0].dictionaries;
				//            console.log(that.dw,'dd')
			});
		// 最新供应
		this.axios.get("customerproduct/all?size=5&newest=true")
			.then(function(data) {
				that.prolist = data.records;
				if(!that.prolist) {
					that.zging = true;
				}
			});

		// 最新企业
		this.axios.get("customer/newcomer/8")
			.then(function(data) {
				that.newcom = data;
				if(that.newcom.length == 0) {
					that.zqiy = true;
				}
			});
		//  分类
		this.productclass()
	},
	computed: {

	},
	mounted() {

	},
	methods: {
		productclass() {
			var that = this;
			this.axios.get("product/category?parent=" + this.fstId)
				.then(function(data) {
					that.comcategory = data;
				});
		},
		// 面包屑
		list() {
			var that = this;
			var secId = this.$route.query.secId;
			this.axios.get("product/categoryname?id=" + this.fstId)
				.then(function(data) {
					that.fstName = data.name;
				});
			if(secId == undefined || secId == '') {} else {
				this.axios.get("product/categoryname?id=" + secId)
					.then(function(data) {
						that.secName = data.name;
					});
			}
		},
		// 产品列表
		detaillist() {
			var that = this;
			this.axios.get("customerproduct/all?size=8&current=" + this.pageNo + '&cid=' + this.fstId + "&newest=true", {
					params: {
						noInterceptor: 1
					}
				})
				.then(function(data) {
					if(data.code === 500) {
						that.isnothave = true;
						that.detlist = '';
						that.total = 0;

					} else {
						that.isnothave = false;
						that.detlist = data.data.records;
						console.log(that.detlist, '66')
						that.total = data.data.total;
					}

				});
		},
		custone() {
			alert(2)
			this.fstId = this.fstId;
			this.list();
			this.productclass();

		},
		//	产品分类
		openx(index, names) {
			this.ishave = true;
			this.fstId = index;
			this.names = names;
			//  用户产品
			this.detaillist();

		},
		closex() {
			this.names = '';
			this.fstId = this.$route.query.fstId;
			this.ishave = false;
			this.detaillist();

		},
		//	分类结束
		watch(id, userId) {
			this.$router.push('/productDetail?id=' + id + '&userId=' + userId);
		},
		// 分页
		pageChange(num) {
			this.pageNo = num;
			this.detaillist();
		},

		// 上一页
		prevPage() {
			this.pageNum--
				if(this.pageNum === 1) {
					this.pageNum = 1
					return pageNum
				}
		},
		// 下一页
		nextPage() {
			this.pageNum++
				if(this.pageNum === this.total / this.pageSize) {
					this.pageNum = this.total / this.pageSize
					return pageNum
				}
		},
		//		统计公司点击数
		tocym(id) {
			window.open('#/company?userId=' + id);
			var that = this;
			that.axios.post("customer/browse/" + id)
				.then(function(data) {
					console.log(data, '33')
				});
		},
		two() {
			window.open('#/company?userId=' + id);
		}
	}
}