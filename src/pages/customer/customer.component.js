import storage from "store2";
export default {
	name: 'customer',
	components: {},
	props: [],
	data() {

		return {
			companyList: [], // 公司
			total: 400,
			pageSize: 8,
			pageNum: 1,

			// 条件
			params: {
				// 搜索关键字
				keyword: '',

			},
			placevalue: '',
			companyvalue: '',
			mainvalue: '',
			value: '',

			//				新增
			adrlist: [],
			adrlist_up: [],
			adrlist_down: [],
			test: '',
			prolist: [],
			newcom: [],
			olist: [],
			mlist: [],
			pdcom: [],
			lieId: '',
			lieName: '',
			hangId: '',
			list_fath: '',
			sonlist: [],
			ulist: [],
			dlist: [],
			up_name: '',
			down_name: '',
			upId: '',
			downId: '',
			parId: '',
			token: '',
			productitle: [],
			adlistshow: true,
			ishaveinf: false,
			zging: false,
			zqiy: false,
			icon1:true,
			icon2:false,
			i: -1,
		}

	},
	computed: {

	},
	created() {
		this.$store.state.headerType = 1;
		this.token = storage.get("token");
		var that = this;
		// 最新供应
		this.axios.get("customerproduct/all?size=8&newest=true")
			.then(function(data) {
				that.prolist = data.records;
				if(!that.prolist || that.prolist.length == 0) {
					// if(!that.prolist || that.prolist.length() == 0){ //解决报错 1/25
					that.zging = true;
				}
			});

		// 最新企业
		this.axios.get("customer/newcomer/10")
			.then(function(data) {
				that.newcom = data;
				that.newcom = data;
				if(that.newcom.length == 0) {
					that.zqiy = true;
				}
			});

		this.typelist();
	},
	mounted() {

	},
	methods: {
		//	统计公司点击数
		tocym(id) {
			window.open('#/company?userId=' + id);
			var that = this;
			that.axios.post("customer/browse/" + id)
				.then(function(data) {});
		},
		//	免费入驻
		justfy() {
			var that = this;
			if(this.token) {
				var ids = storage.get("id");
				that.axios.get("customer/" + ids)
					.then(function(data) {
						that.pdcom = data;
						if(that.pdcom.status == 'SUCCESS') {
							that.$alert('您已入驻本商城，请前往企业中心、产品管理发布自己的产品，让更多的用户看到您的产品', '提示', {
								confirmButtonText: '确定',
								type: 'success',
							});
						} else if(that.pdcom.status != 'SUCCESS') {
							that.$alert('暂未入驻，请到企业中心完善信息', '提示', {
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
		// 二级菜单
		showId(id, lieId) {
			this.$router.push('/detailsclass?fstId=' + lieId + '&secId=' + id);
		},
		loMore1(id, userId) {
			this.$router.push('/detailsclass?fstId=' + id);
		},

		//	上方列表接口
		openlist(index, id) {
			//			打开第二层列表
			$('.cus_res45').css('display', 'block');
			$('.cus_res45').siblings().css('display', 'none');
			$('.cus_res43').css('display', 'block');
			$('.cd-index').val(index);
			$('.cus_res48').css('color', '#333');
			this.icon1 = false;
			this.icon2 = true;
//			$('.dyicon').css('background', "red")
			$($(".cus_res48")[index]).css("color", "#009FE2");
//			console.log()
//			$($(".dyicon")[index]).css('background', "green")
//			console.log($(".dyicon")[index],'鼠标所在的li')
//			console.log($('.dyicon'),'其余li')
			this.lieId = id;
			var lieId = this.lieId;
			var that = this;
			that.axios.get("product/category?parent=" + lieId)
				.then(function(data) {
					that.mlist = (data || []).map(item => {
						item.lieId = lieId;
						return item;
					});
				});
			this.i = index;
		},

		// 分类列表
		typelist() {
			//  上方列表
			var that = this;
			this.axios.get("product/category?parent=10000") // 一级
				.then(function(data) {
					that.olist = data;
					(that.olist || []).forEach((item, index) => {
						if(index > 1) {
							return;
						}
						that.getProduct(item);
					});
				});
		},
		getProduct(item) {
			//		console.log(item.id,'item.id');
			this.axios.get("customerproduct/all?cid=" + item.id + '&size=12&newest=true', {
				params: {
					noInterceptor: 1
				}
			}).then(result => {
				let data = [];
				if(result.code === 0) {
					data = result.data.records || [];
				}
				item.adrlist_up = data;
				this.$forceUpdate();
			});
		},
		//二级菜单关闭
		clos() {
			$('.cus_res45').css('display', 'none');
			$('.cus_res48').css('color', '#333');
      this.i = -1;
		},

		//分页
		pageChange(num) {
			this.pageNum = num
		},

		// 上一页
		prevPage() {
			this.pageNum--
				if(this.pageNum === 0) {
					this.pageNum = 1
					return
				}
		},
		// 下一页
		nextPage() {
			this.pageNum++
				if(this.pageNum === this.total / this.pageSize) {
					this.pageNum = this.total / this.pageSize
					return
				}
		},

	}
}
