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
			number:1,
			tempData:[],
		}
	},
	created() {
		this.$store.commit("switchHeaderType", 6);
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
		this._hot();
		
		
		
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
			console.log(code,'code');
			let _this = this;
			_this.articleList = [];
			_this.isArticleContent = false;
			_this.nextPage = false;
			_this.current = 1;
			_this.number = 1;
			_this.tempData = [];
			if(code != undefined)
				_this.channelCode = code;
				_this.articalist();
			if(_this.recommendList.length <= 0){
				_this._recommend();
			}
		}
		,articalist(){
			var _this = this;
			this.axios.get("article/list?top=1&recommend="+ _this.recommend +"&channelCode="+_this.channelCode+"&size="+this.size+"&current="+this.current)
			.then(function(re){
					if(_this.current>1){
						if(re.records.length>0)
							_this.tempData = _this.tempData.concat(re.records);
							$.each(_this.tempData,function(index, el) {
								_this.articleList.push(el);
							});
					}else{
                   		_this.articleList = _this.articleList.concat(re.records);
						
					}
					_this.total = re.total;
					_this.pages = re.pages;
					if(re.pages > _this.current){
						_this.nextPage = true;
					}else{
						_this.nextPage = false;
					}
				_this.loading = false;
				
			})
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
			_this.loading = true;
			this.axios.get("article/list?hot=1&channelCode="+_this.channelCode)
			.then(function(re){
				_this.hotList = re.records;
				_this.loading = false;
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
			this.number++;
      this.current = this.number;
			this.articalist();
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