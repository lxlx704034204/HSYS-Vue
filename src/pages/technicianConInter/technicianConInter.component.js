import { getExpertList } from "@/api/api";
export default {
  name: 'technician-consultation',
  components: {},
  props: [],
  data() {
    return {
      consultationUser: []
    }
  },
  created() {
    this._getExpertList();
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //专家数据
    _getExpertList() {
      let params = {
        params: {}
      }
      getExpertList(this.params).then(res => {
        this.consultationUser = res.data.slice(0, 1);
      })
    },
  }
}
