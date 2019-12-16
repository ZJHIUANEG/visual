<template>
  <div id="Histogram"></div>
</template>

<script>
import { Histogram } from '../../assets/js/datajs/Histogram.js'
// 引入基本模板
import echarts from 'echarts'
import Vue from 'vue'

export default {
  data() {
    return {
      hisgChart: null
    }
  },
  created() {
    Vue.prototype.$echarts = echarts
  },
  mounted() {
    this.initECharts()
  },
  destroyed() {
    this.clearEcharts()
  },
  methods: {
    initECharts() {
      this.hisgChart = this.$echarts.init(document.getElementById('Histogram'))

      let hisgChart = this.hisgChart

      let shadows = []

      hisgChart.setOption(Histogram)

      // 异步加载数据
      hisgChart.showLoading()
      this.$http({
        url: './static/data.json',
        type: 'get',
        dataType: 'json'
        // success: function(data) {
        //   console.log(data);
        // }
      })
        .catch(function(error) {
          alert(error)
        })
        .then(function(data) {
          hisgChart.hideLoading()
          // console.log(data)
          // for (let i = 0; i < Object.keys(data.data).length; i++) {
          //   shadows.push(20);
          // }

          // 填入数据
          hisgChart.setOption({
            xAxis: { data: data.data.dataAxis },
            series: [{ data: shadows }, { data: data.data.data }]
          })
        })
    },
    clearEcharts() {
      this.hisgChart.dispose()
    }
  }
}
</script>

<style>
#Histogram {
  width: 50%;
  height: 40%;
}
</style>
