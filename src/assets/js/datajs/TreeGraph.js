//前序遍历非递归实现
let PreOrderTraversal = function(rootNode) {
  let stack = [] //存放结果的栈
  let temp = [] //暂存结点的栈
  temp.push(rootNode)
  while (temp.length > 0) {
    let node = temp.shift()
    stack.push(node)
    let childrens = node.childrens
    if (childrens && childrens.length > 0) {
      for (let i = childrens.length - 1; i >= 0; i--) {
        temp.unshift(childrens[i])
      }
    }
  }
  let result = []
  while (stack.length > 0) {
    result.push(stack.shift().data)
  }
  return result
}
//后序遍历非递归实现
let PostOrderTraversal = function(rootNode) {
  let stack = [] //存放结果的栈
  let temp = [] //暂存结点的栈
  temp.push(rootNode)
  //暂存数组不为空，即未遍历所有结点时一直循环
  while (temp.length > 0) {
    let node = temp.pop()
    stack.push(node)
    let childrens = node.childrens
    //如果栈顶结点存在子节点，则全部入栈
    if (childrens && childrens.length > 0) {
      for (let i = 0; i < childrens.length; i++) {
        temp.push(childrens[i])
      }
    }
  }
  let result = [] //存放遍历结果的数组
  while (stack.length > 0) {
    result.push(stack.pop().data)
  }
  return result
}
//层序遍历
let LeverOrderTraversal = function(tree) {
  let rootNode = JSON.parse(JSON.stringify(tree))
  let result = [],
    floor = 0
  let queue = [],
    index = 0 //队列、遍历索引和队列中结点的数量
  rootNode.floor = 1
  rootNode.widthRatio = 1 //占画布宽度的比例
  queue.push(rootNode)
  rootNode.father = rootNode
  rootNode.which = 0
  while (index != queue.length) {
    let node = queue[index++]
    let len = node.childrens.length
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        node.childrens[i].floor = node.floor + 1
        node.childrens[i].which = i
        node.childrens[i].widthRatio = node.widthRatio / len
        node.childrens[i].father = node
        queue.push(node.childrens[i])
      }
    }
    if (queue.length > 100) break
  }
  for (let i = 0; i < queue.length; i++) {
    result[i] = queue[i]
  }

  return result
}

const treeData = {
  data: '1,1',
  childrens: [
    {
      data: '2,1',
      childrens: [
        {
          data: '3,1',
          childrens: [
            {
              data: '4,1',
              childrens: []
            },
            {
              data: '4,2',
              childrens: [
                {
                  data: '5,1',
                  childrens: []
                },
                {
                  data: '5,2',
                  childrens: []
                }
              ]
            }
          ]
        },
        {
          data: '3,2',
          childrens: [
            {
              data: '4,3',
              childrens: []
            },
            {
              data: '4,4',
              childrens: [
                {
                  data: '5,3',
                  childrens: [
                    {
                      data: '6,1',
                      childrens: []
                    }
                  ]
                },
                {
                  data: '5,4',
                  childrens: []
                }
              ]
            },
            {
              data: '4,5',
              childrens: [
                {
                  data: '5,5',
                  childrens: []
                }
              ]
            }
          ]
        },
        {
          data: '3,3',
          childrens: [
            {
              data: '4,6',
              childrens: []
            },
            {
              data: '4,7',
              childrens: []
            }
          ]
        }
      ]
    }
  ]
}

export { PreOrderTraversal, PostOrderTraversal, LeverOrderTraversal, treeData }
