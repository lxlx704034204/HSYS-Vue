import { Loading } from 'element-ui';
export default {
	name: 'information',
	components: {},
	props: [],
	data() {
		return {
			rightlist: [],
			activeName: 'first',
			firstcoverImage: '',

			//栏目
			channel: '',
			//编码 
			channelCode:'',
			//推荐code
			recommend:'',
			//是否是热点
			hot:'',
			articleList:[],
			recommendList:[],
			hotList:[],
			//每页条数
			size:5,
			// 当前页
			current:1,
			//总条数
			total:0,
			// 总页数
			pages:0,
			// 下一页是否显示
			nextPage:false,
			//文章内容
			articleContent:'',
			// 是否是文章内容
			isArticleContent: false,
			cotet:'',
			articleId:0,
			loading: true,
//			tupian:false,
//			wenzhang:false,
//			redian:false,
		}
	},
	created() {
		this.$store.state.headerType = 6;
//		console.log(window.location.href,'222')
		var that = this;
		that.axios.get("dictionary/batch?parentCodes=CHANNEL_CODE")
		.then(function(re){
				var channelCodeinfo = re[0].dictionaries;
				if(channelCodeinfo){
					that.channel = channelCodeinfo;
				}else{
					that.axios.get('dictionary/batch?parentCodes=CHANNEL_CODE')
					.then(function(re){
							let result = re[0].dictionaries;
							that.channel = result;
							localStorage.channelCodeinfo = JSON.stringify(result);
					})
					.catch(function (error) {
					    console.log(error);
					 });
				};
				//默认显示第一个
				that.getArticle(that.channel[0].dictCode);
		});
		
		
		
//		let channelCodeinfo = this.$util.getCodeMap("CHANNEL_CODE")?this.$util.getCodeMap("CHANNEL_CODE"):'';
//		let channelCodeinfo = this.aa;
//		let _this = that;
//		if(channelCodeinfo){
//			alert(1)
//			this.channel = channelCodeinfo;
//			console.log(this.channel,'56')
//		}else{
//			this.axios.get('dictionary/batch?parentCodes=CHANNEL_CODE')
//			.then(function(re){
//					let result = re[0].dictionaries;
//					_this.channel = result;
//					localStorage.channelCodeinfo = JSON.stringify(result);
//			})
//			.catch(function (error) {
//			    console.log(error);
//			 });
//		};
//		console.log(_this.channel[0],'123')
//		//默认显示第一个
//		_this.getArticle(_this.channel[0].dictCode);
	},
	computed: {

	},
	mounted() {

	}
	,watch:{
		articleId(){
			this.getArticleContent(this.articleId);  
		}
	}
	,methods: {
		getArticle(code){
			let _this = this;
			_this.isArticleContent = false;
			_this.articleList = [];
//			_this.tupian = false;
//			_this.wenzhang = false;
//			_this.redian = false;
			_this.nextPage = false;
//			_this.redian = false;
			if(code != undefined)
				_this.channelCode = code;
			this.axios.get("article/list?top=1&recommend="+ _this.recommend +"&channelCode="+_this.channelCode+"&size="+this.size+"&current="+this.current)
			.then(function(re){
					if(_this.current>1){
						if(re.records.length>0)
							var tempData = re.records;
							$.each(tempData,function(index, el) {
								_this.articleList.push(el);
							});
					}else{
						_this.articleList = re.records;
					}
//					if(_this.articleList.length == 0){
//						_this.tupian = true;
//						_this.wenzhang = true;
//					} else if(_this.articleList.length == 1){
//						_this.wenzhang = true;
//					}
					_this.total = re.total;
					_this.pages = re.pages;
					if(re.pages > _this.current){
						_this.nextPage = true;
					}else{
						_this.nextPage = false;
					}
				_this.loading = false;
				
			})
			if(_this.recommendList.length <= 0){
				_this._recommend();
			}
			// if(_this.hotList.length <= 0)
			_this._hot();
		}
		,_recommend(){
			let _this = this;
			_this.loading = true;
			this.axios.get("article/list?recommend=1")
			.then(function(re){
					_this.recommendList = re.records;
				_this.loading = false;
			})
		}
		,_hot(){
			let _this = this;
//			_this.redian = false;
			_this.loading = true;
			this.axios.get("article/list?hot=1&channelCode="+_this.channelCode)
			.then(function(re){
				_this.hotList = re.records;
				_this.loading = false;
//				if(_this.hotList.length == 0){
//					_this.redian = true
//				}
			})
		}
		,_top(){
			let _this = this;
			this.axios.get("article/list?top=1&channelCode="+_this.channelCode)
			.then(function(re){
					_this.hotList = re.records;
			})
		}
		,getNextPage(){
			if(this.current < this.pages){
//				this.current++;
//			下方新增
				this.size = Number(this.size) + Number(this.size);
				this.getArticle();
			}else{
				this.nextPage = false;
			}
			
		}
		,setArticleId(articleId){
			if(articleId != '' || articleId != undefined){
				this.articleId = articleId;
			}
		}
		,getArticleContent(pleasedid){
			let _this = this;
			_this.loading = true;
			_this.isArticleContent = true;
			this.axios.get("article/info?id=" + pleasedid)
			.then(function(re){
					_this.articleContent = re;
					if( re.articleContent != null){
						_this.cotet = re.articleContent.content;
					}else{
						_this.cotet = '';
					}
				_this.loading = false;
			})
		},
		tosy(){
			window.open('#/home')
		}
	}
}