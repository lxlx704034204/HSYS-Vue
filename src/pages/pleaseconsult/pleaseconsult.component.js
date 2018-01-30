export default {
	name: 'pleaseconsult',
	components: {},
	props: [],
	data() {
		return {
			please: [],
			Handoverlist: [],
			Listdetails: [],
			chuanzhi: [this.$route.query.plan],
			liebiao: [this.$route.query.plan],

			tabslist: [this.$route.query.name],

			activeName: 'first',
			rupassage: [],
			rightlist: [],

			title: '',
			createBy: '',
			createDate: '',
			description: '',
			coverImage: '',
			rlist: [],
			cc:[],
			tlist: [],
		}
	},
	computed: {

	},
	created() {
		this.cc = JSON.parse(localStorage.channel_codeinfo);
		var pleasedid = this.$route.query.id;
		var channelcd = sessionStorage.channelcd;
		//		文章部分
		var that = this;
		$.ajax({
			type: "get",
			url: baseURL + "article/info?id=" + pleasedid,
			'Content-Type': 'application/json;charset=UTF-8',
			dataType: 'json',
			success: function(data) {
				if(data.code == 0) {
					that.rightlist = data.data;
					that.title = that.rightlist.title;
					that.createBy = that.rightlist.createBy;
					that.createDate = that.rightlist.createDate;
					that.description = that.rightlist.description;
					that.coverImage = that.rightlist.coverImage;
				}
			}
		})
		//		 右侧推荐
		$.ajax({
			type: "get",
			url: baseURL + "article/list?recommend=1&channelCode=CHANNEL_CODE1",
			'Content-Type': 'application/json;charset=UTF-8',
			dataType: 'json',
			success: function(data) {

				if(data.code == 0) {
					that.rlist = data.data.records;
				}
			}
		})
		//		 热点
		$.ajax({
			type: "get",
			url: baseURL + "article/list?top=1&channelCode=CHANNEL_CODE1",
			'Content-Type': 'application/json;charset=UTF-8',
			dataType: 'json',
			success: function(data) {

				if(data.code == 0) {
					that.tlist = data.data.records;
				}
			}
		})
	},
	mounted() {

	},
	methods: {
		handleClick() {

		},
		toinf(){
			this.$router.push('information');
		},
		info_one(){
			this.$router.push('information?name=second')
		}
	}
}