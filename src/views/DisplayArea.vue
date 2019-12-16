<template>
  <div id="area" :style="displayArea">
    <histogram-chart></histogram-chart>
    <line-chart></line-chart>
    <data-table></data-table>
  </div>
</template>

<script>
import HistogramChart from '../components/data_anaylsis/HistogramChart.vue'
import LineChart from '../components/data_anaylsis/LineChart.vue'
import DataTable from '../components/data_anaylsis/DataTable.vue'
export default {
  components: { HistogramChart, LineChart, DataTable },
  name: 'display-area',
  data() {
    return {
      displayArea: { height: '0px', width: '0px' }
    }
  },
  created() {
    this.initPage()
  },
  mounted() {
    window.onresize = function() {
      // console.log("页面更新了");
      location.reload()
    }
  },
  updated() {
    window.onresize = function() {
      // console.log("页面更新了");
      location.reload()
    }
  },
  methods: {
    initPage() {
      this.displayArea.height = window.innerHeight + 'px'
      this.displayArea.width = window.innerWidth + 'px'
    }
  }
}
</script>

<style scoped>
#area {
  display: flex;
  flex-wrap: wrap;
  background: rgb(253, 253, 248);
}
</style>
