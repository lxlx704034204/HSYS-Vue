// 服务模块
import Servicebox from "./Servicebox";
import storage from "store2";
import loginauct from "@/pages/loginauct";
export default {
	name: 'headers',
	components: {
		Servicebox,
		loginauct
	},
	props: {
		userInfor: {},
	},
    data() {
        return {
            // 接收登陆者名称
            isFindShow: true,
            isFindeHide: false,
            boxStatus: 1,
            name: "",
            isLogin: false, //判断是否登录
            needlogin: false,
            needlogins: false,
            activeName: 'second',
            swinput: '',
            stall: true,
            prod: [],
            ishave: true,
            companyshow: false,
            cominf: [],
            logoUrl: '',
            keyWord: [],
            userName: '',
            isShow: false,
        }
    },
    created() {
        // 获取热搜数据
     if(this.$store.state.headerType == 1 ){
        this.axios.get("/word/1").then((res) => {
            this.keyWord = res;
        });
     }
		var data = storage.get("userName");
		if(data == undefined) {
			this.needlogin = false;
			this.needlogins = true;
		} else {
			this.needlogins = false;
			this.needlogin = true;
			this.name = storage.get("userName");
		}

		//  企业logo
		var u = document.location.toString();
		console.log(u, '123')
		if(u.indexOf("&") != 1) {
			if(u.indexOf("?") != -1) {
				var x = u.split("?")[1];
				var y = x.split("=")[1];　　　　　　
				this.$route.query.userId = y　　　　
			}
		}
		if(u.indexOf("&") != -1) {
			var x = u.split("&")[1];
			console.log(x, 'xxxxx')
			var y = x.split("=")[1];　　　　　　
			this.$route.query.userId = y　　　
		}
		console.log(this.$route.query.userId)
		if(this.$route.query.userId) {
			var that = this;
			var userId = that.$route.query.userId;
			that.axios.get("customer/detail/" + userId)
				.then(function(data) {
					that.cominf = data;
					if(that.cominf.logoUrl) {

						that.logoUrl = that.cominf.logoUrl;
					}
				})
				.catch(error => console.log(error))
		}

	},
	computed: {

	},
	mounted() {},
	updated() {},
	methods: {
		logining() {
			this.isLogin = false;
			this.token = storage.get("token");
		},
		search() {
			this.$emit('search');
		},
		changas() {
			$("#ph1").css("borderBottom", "2px solid #009EE3");
			$("#ph2").css("borderBottom", "2px solid #FFF");
			$("#ph3").css("borderBottom", "2px solid #FFF");
			$("#ph4").css("color", "#009EE3");
			$("#ph5").css("color", "#333");
			$("#ph6").css("color", "#333");
			var userId = this.$route.query.userId;
			this.$router.push('company?userId=' + userId)
		},
		changbs() {
			$("#ph2").css("borderBottom", "2px solid #009EE3");
			$("#ph1").css("borderBottom", "2px solid #FFF");
			$("#ph3").css("borderBottom", "2px solid #FFF");
			$("#ph5").css("color", "#009EE3");
			$("#ph4").css("color", "#333");
			$("#ph6").css("color", "#333");
			var userId = this.$route.query.userId;
			this.$router.push('mainproduct?userId=' + userId)
		},
		changcs() {
			$("#ph3").css("borderBottom", "2px solid #009EE3");
			$("#ph2").css("borderBottom", "2px solid #FFF");
			$("#ph1").css("borderBottom", "2px solid #FFF");
			$("#ph6").css("color", "#009EE3");
			$("#ph5").css("color", "#333");
			$("#ph4").css("color", "#333");
			var userId = this.$route.query.userId;
			this.$router.push('customcontact?userId=' + userId)
		},
		// 接收数据
		getusername() {
			var msg = sessionStorage.getItem("data");
			this.user = msg;
		},
		// 登陆管理者
		controllerbtn() {
			this.$router.push('login');
		},
		// 向子组件传递
		movein() {
			this.$refs.child.parentMsg(this.isFindShow)
		},
		moveout() {
			// 向子组件传递
			this.$refs.child.parent(this.isFindeHide)
		},

		// 切换searchType
		switchType(type) {
			console.log(type,'tupe');
			this.$store.commit('switchSearchType', type);
			if(type == 1) {
				this.stall = true;
			} else if(type == 2) {
				this.stall = false;
			}
		},

		// input框搜索
		switbtn() {
			this.$emit('search');
			window.open('#/searchResult?name=' + this.swinput || "")
			this.$emit('search');
		},
		exitlogon() {
			this.axios.post("/logout").then((res) => {
				storage.remove("token");
				// storage.remove("userName");//+
				this.$store.commit('setUesrInfor', {
					userName: ''
				});
				this.$store.commit('setCustomer', {});
				this.$router.push('/login');
			})
			// this.needlogin = false;
			// this.needlogins = true;
		},
		//企业中心
		companycenter() {
			const token = storage.get("token");
			if(!token) {
				// this.$router.push('/login');
				this.isLogin = true;
			} else {
				this.$router.push('/companycenter');
				this.ishave = false

			}
		},
		finanbtn() {
			this.$router.push('/financial');
			this.ishave = false
		},
		//  搜客户
		searchcus() {
			this.$emit('search');
			location.href = "#/autotrophy?name=" + this.swinput;
			this.$emit('search');
		},
		finClick() {
			window.open('#/financial')
		},
		infoClick() {
			window.open('#/information')
		}
	},

}