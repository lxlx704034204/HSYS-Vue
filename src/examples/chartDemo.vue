<template lang="html">

  <section class="chart">
    <chart :options="polar"></chart>
  </section>

</template>

<script lang="js">
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
    export default {
      data () {
        let data = []

        for (let i = 0; i <= 360; i++) {
            let t = i / 180 * Math.PI
            let r = Math.sin(2 * t) * Math.cos(2 * t)
            data.push([r, i])
        }
        console.log(data);
        return {
          polar: {
            title: {
              text: '极坐标双数值轴'
            },
            legend: {
              data: ['line']
            },
            polar: {
              center: ['50%', '54%']
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            angleAxis: {
              type: 'value',
              startAngle: 0
            },
            radiusAxis: {
              min: 0
            },
            series: [
              {
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: data
              }
            ],
            animationDuration: 2000
          }
        }
      }
    }
</script>

<style scoped lang="scss">
.echarts {
  height: 300px;
}
</style>
