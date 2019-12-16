<template>
  <div id="Linechart"></div>
</template>

<script>
import { Linechart } from '../../assets/js/datajs/LineChart.js'
// 引入基本模板
import echarts from 'echarts'
import Vue from 'vue'

export default {
  data() {
    return {
      LineChart: null
    }
  },
  created() {
    Vue.prototype.$echarts = echarts
  },
  mounted() {
    this.initECharts()
    window.onresize = function() {
      this.LineChart.resize()
    }
  },
  updated() {
    window.onresize = function() {
      this.LineChart.resize()
    }
  },
  destroyed() {
    this.clearEcharts()
  },
  methods: {
    initECharts() {
      this.LineChart = this.$echarts.init(document.getElementById('Linechart'))

      let LineChart = this.LineChart

      LineChart.setOption(Linechart)

      // 异步加载数据
      LineChart.showLoading()
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
          LineChart.hideLoading()
          // alert(data.data)
          // console.log(data.data)
          // 填入数据
          LineChart.setOption({
            xAxis: { data: data.data.dataAxis },
            series: [{ data: data.data.data }]
          })
        })
    },
    clearEcharts() {
      this.LineChart.dispose()
    }
  }
}
</script>

<style>
#Linechart {
  width: 50%;
  height: 40%;
}
</style>
