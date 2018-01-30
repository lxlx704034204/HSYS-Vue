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
  	this.$store.state.headerType = 9;
  },
  computed: {

  },
  mounted () {
    $('.out-type-classification').hide()

  },
  methods: {
		tofin(){
			window.open('#/applyFinance')
		}
  }
}
