<template>
  <div id="data_table">
    <div class="_list">
      <div>
        <div>Id</div>
        <div>First</div>
        <div>Last</div>
        <div>Value</div>
      </div>
      <div v-for="item in dataList" :key="item.id">
        <div>{{ item.id }}</div>
        <div>{{ item.first }}</div>
        <div>{{ item.last }}</div>
        <div>{{ item.value }}</div>
      </div>
    </div>
    <div class="moreBtn">查看更多 =></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    }
  },
  created() {
    this.getDataList()
  },
  mounted() {},
  methods: {
    getDataList() {
      let _list = {}
      let that = this
      // console.log(that.dataList)
      this.$http({
        url: './static/data.json',
        type: 'get',
        dataType: 'json'
      })
        .catch(function(error) {
          alert(error)
        })
        .then(function(data) {
          // console.log(data.data)
          _list = data.data

          for (let j = 0; j < 20; j++) {
            that.dataList.push({
              id: j + 1,
              first: _list.dataAxis[j].substring(0, 6),
              last: _list.dataAxis[j].substring(8),
              value: _list.data[j]
            })

            // console.log(that.dataList)
          }
        })
    }
  }
}
</script>

<style>
#data_table {
  width: 84%;
  height: 20%;
  display: flex;
  margin: 0 8%;
  flex-direction: row;
}
._list {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(86, 139, 209);
  overflow: hidden;
  display: flex;
  flex: 20;
  /* margin-bottom: 26px; */
  flex-direction: row;
  position: relative;
}
._list > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
._list > div > div {
  width: 46px;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(86, 139, 209);
  cursor: pointer;
}
._list > div > div:hover {
  background: white;
  color: rgb(86, 139, 209);
  font-weight: bold;
}
.moreBtn {
  flex: 1;
  height: 100%;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  background: rgb(86, 139, 209);
  border: 1px solid rgb(86, 139, 209);
  cursor: pointer;
}
.moreBtn:hover {
  color: rgb(86, 139, 209);
  background: rgba(209, 227, 248, 0.822);
  border: 1px solid rgba(209, 227, 248, 0.822);
}
</style>
