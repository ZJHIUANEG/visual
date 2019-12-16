<template>
  <div id="Tree">
    <div class="container">
      <input
        type="button"
        class="control"
        value="生成树"
        @click="createTree()"
      />
      <svg id="svg"></svg>
      <div class="hide" :style="hideSpace"></div>
    </div>
  </div>
</template>

<script>
import {
  LeverOrderTraversal,
  treeData
} from '../../assets/js/datajs/TreeGraph.js'
export default {
  data() {
    return {
      clickCount: 0,
      hideSpace: { width: '0px', height: '0px' }
    }
  },
  created() {},
  mounted() {
    let nodes = LeverOrderTraversal(treeData) //层序遍历生成数组
    this.showTreeTraverse(null, nodes)
  },
  methods: {
    // 储存每层有多少个节点
    floorCount(nodes) {
      let numArr = []
      for (let i = 0; i < nodes.length; i++) {
        if (numArr[nodes[i].floor - 1] === undefined) {
          numArr[nodes[i].floor - 1] = 0
        }
        numArr[nodes[i].floor - 1]++
      }
      return numArr
    },
    //计算树需要的画布尺寸
    TreeSpace(nodes) {
      let numArr = this.floorCount(nodes)
      let max = 0
      // 寻找出拥有最长节点的那行有多少节点
      for (let i = 0; i < numArr.length; i++) {
        if (numArr[i] > max) {
          max = numArr[i]
        }
      }
      //console.log(max);
      let size = {
        width: max * 160,
        height: numArr.length * 100 + 80
      }
      return size
    },
    showTreeTraverse(id) {
      let svg = document.getElementById('svg')
      svg.innerHTML = ''
      let circleStr = ''
      let lineStr = ''
      let textStr = '' //圆、线和文本的HTML字符串
      let nodes = LeverOrderTraversal(treeData) //层序遍历生成数组

      let size = this.TreeSpace(nodes)
      //设置SVG画布尺寸
      this.hideSpace.width = size.width + 'px'
      this.hideSpace.height = size.height + 'px'
      svg.setAttribute('width', size.width)
      svg.setAttribute('height', size.height)
      svg.parentNode.style.width = size.width + 'px'
      let width = size.width

      //遍历所有树的结点，生成圆、线和文本的HTML字符串
      for (let i = 0; i < nodes.length; i++) {
        let nodeColor = nodes[i].data === id ? '#080808' : 'rgb(86, 139, 209)'

        let cx = 0,
          cy = 0 //当前结点的定位像素坐标
        let father = nodes[i].father
        if (i === 0) {
          father.cx = width / 2
        }
        // 父节点宽度的最左边
        let start
        //当前结点的横坐标

        start = father.cx - (width * father.widthRatio) / 2
        cx = start + width * nodes[i].widthRatio * (nodes[i].which + 0.5)
        cy = nodes[i].floor * 100
        nodes[i].cx = cx
        nodes[i].cy = cy
        lineStr +=
          '<line x1="' +
          cx +
          '" y1="' +
          cy +
          '" x2="' +
          nodes[i].father.cx +
          '" y2="' +
          nodes[i].father.cy +
          '" style="stroke:black;stroke-width:2" />'
        circleStr +=
          '<circle cx="' +
          cx +
          '" cy="' +
          cy +
          '" r="20" fill="' +
          nodeColor +
          '"/></circle>'
        //调整文本缩进
        let textcx = nodes[i].cx - 12,
          textcy = nodes[i].cy + 6
        textStr +=
          '<text x="' +
          textcx +
          '" y="' +
          textcy +
          '" fill="white">' +
          nodes[i].data +
          '</text>'
      }
      svg.innerHTML = lineStr + circleStr + textStr
    },
    createTree() {
      this.clickCount++
      if (
        this.clickCount < this.floorCount(LeverOrderTraversal(treeData)).length
      ) {
        this.hideSpace.height = parseInt(this.hideSpace.height) - 100 + 'px'
        // console.log(this.hideSpace.height)
      } else {
        this.clickCount = 0
        this.hideSpace.height =
          this.TreeSpace(LeverOrderTraversal(treeData)).height + 'px'
        // console.log(this.hideSpace.height)
      }
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
#Tree {
  background: rgb(253, 253, 248);
}
.container {
  width: 600px;
  height: 800px;
  margin: 0 auto;
  position: relative;
}
#svg {
  position: absolute;
  z-index: 1;
}
input.control {
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  font-weight: bold;
  font-size: 16px;
  color: aliceblue;
  position: absolute;
  background: rgb(86, 139, 209);
  cursor: pointer;
  z-index: 100;
}
.hide {
  position: absolute;
  bottom: 0;
  z-index: 50;
  background: rgb(253, 253, 248);
  transition: all 0.5s ease;
}
</style>
