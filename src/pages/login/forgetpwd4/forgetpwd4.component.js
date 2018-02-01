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
    this.$store.commit("switchHeaderType", 3);
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
