export default  {
  name: 'financial',
  components: {}, 
  props: [],
  data () {
    return {
      title1list:[],
      title2list:[],
      title3list:[],
      ascendlist:[],
    }
  },
  created () {

  },
  computed: {

  },
  mounted () {
    $('.out-type-classification').hide()
    // this.$store.state.headerType = 9;
    this.$store.commit("switchHeaderType", 9);
  },
  methods: {
		tofin(){
			window.open('#/applyFinance')
		}
  }
}
