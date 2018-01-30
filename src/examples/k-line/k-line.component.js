import VueECharts from '@/components/vue-echarts/ECharts.vue'
// Vue.component('chart', VueECharts)
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  name: 'k-line',
  components: {
    "chart":VueECharts
  },
  props: [
      'echartDataChild'
      ],
  data() {
    return {
      echartDataTwoChild:[],
      ids:'',
      polar: {
        // color: ['#3398DB'],  
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效   #
            // type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'time',
          /*data: ['2011-11-1','2011-11-2','2011-11-3','2011-11-5'],
          axisTick: {
            alignWithLabel: true
          }*/
          splitLine: {
            show: false
          }
        }],
        yAxis: [{
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
              show: false
          }
        }],
        series: [{
          name: '价格',
          type: 'line',
          // barWidth: '15%',
          showSymbol: false,
          hoverAnimation: false,
          // data: JSON.parse(localStorage.echartprice)
          data: []
        }]
      }
    }
  },
  created () {
  },
  watch: {
      echartDataChild:function(){
        this.polar.series.data  = this.echartDataChild;
        this.echartDataTwoChild = this.echartDataChild;
      }
    },
  computed: {

  },
  mounted() {

   /* let echarts = require('echarts/lib/echarts');
    let myChart= $("#echarts");

    let mainChart = echarts.init(myChart);
    let option = this.polar;
    mainChart.setOption(option, true)*/
  },
  methods: {
  }
}
