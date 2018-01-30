export default {
  name: 'forgetpwd-4',
  components: {}, 
  props: [],
  data () {
    return {

    }
  },
  created () {
    // 调用数据
    var urlId = this.$route.path;
    if(urlId.indexOf('forgetpwd4') >0){
      this.$store.state.headerType = 3;
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
