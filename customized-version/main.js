class Node {
  constructor(parent=null, children=[]) {
    this.id = numUser
    this.parent = parent
    this.children = children
    this.x = 0
    this.y = 0
    this.mod = 0
    this.name = "user_" + numUser
    numUser ++
  }
  addChild(childId) {
    this.children.push(childId)
  }
}

const nodeHashTable = {}
const nodeListByDepth = {}
let numUser = 0
let maxDepth = 0

function depthFirstSearch(nodeId, func, prop=0) {
  const stack = [{ nodeId, prop }]
  while (stack.length) {
    const { nodeId, prop } = stack.pop()
    const node = nodeHashTable[nodeId]
    const newProp = func(nodeId, prop)
    for (let i = 0; i < node.children.length; i++) {
      stack.push({
        nodeId: node.children[i],
        prop: newProp
      })
    }
  }
}

function init(nodeId, depth) {
  const node = nodeHashTable[nodeId]
  if (nodeListByDepth[depth]) {
    nodeListByDepth[depth].push(nodeId)
  } else {
    nodeListByDepth[depth] = [nodeId]
  }
  node.x = nodeListByDepth[depth].length - 1
  node.y = depth
  maxDepth = Math.max(maxDepth, depth)
  return depth + 1
}

function final(nodeId, mod) {
  const node = nodeHashTable[nodeId]
  node.x += mod
  return mod + node.mod
}

function process(nodeId) {
  // first traversal
  depthFirstSearch(nodeId, init)
  // process tree
  for (let i = maxDepth - 1; i >= 0; i--) {
    const list = nodeListByDepth[i]
    let prev = -1
    let shft = 0
    for (const n of list) {
      const node = nodeHashTable[n]
      if (node.children.length) {
        const left = nodeHashTable[node.children[0]].x
        const right = nodeHashTable[node.children[node.children.length - 1]].x
        const mid = (left + right) / 2 + shft
        if (prev + 1 > mid) {
          node.x = prev + 1
          node.mod = node.x - mid + shft
          shft = node.mod
        } else {
          node.x = mid
          node.mod = shft
        }
      } else {
        node.x = prev + 1
      }
      prev = node.x
    }
  }
  // final traversal
  depthFirstSearch(nodeId, final)
}

// for testing
function genTest() {
  let listNode = [numUser]
  nodeHashTable[numUser] = new Node()
  for (let i = 0; i < Math.floor(Math.random() * 5) + 5; i++) {
    let listRChild = []
    for (let j = 0; j < listNode.length; j++) {
      listRChild = listRChild.concat(genChild(listNode[j]))
    }
    listNode = listRChild
  }
}

function genChild(nodeId) {
  const node = nodeHashTable[nodeId]
  const rChild = []
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    node.addChild(numUser)
    if (Math.floor(Math.random() * 2)) {
      rChild.push(numUser)
    }
    nodeHashTable[numUser] = new Node(nodeId)
  }
  return rChild
}

function printNode(nodeId, depth) {
  const node = nodeHashTable[nodeId]
  console.log("  ".repeat(depth) + "id:", nodeId, "x:", node.x, "y:", node.y)
  return depth + 1
}

// for drawing
const BOXW = 130, BOXH = 90, MARGIN = 10, HLEVEL = 150
const BOUNDW = BOXW + 2 * MARGIN

function drawNode(nodeId) {
  stroke("#FFFFFF")
  const node = nodeHashTable[nodeId]
  if (node.children.length) {
    line(
      node.x * BOUNDW,
      node.y * HLEVEL,
      node.x * BOUNDW,
      node.y * HLEVEL + 0.5 * HLEVEL
    )
    for (let i = 0; i < node.children.length; i++) {
      const child = nodeHashTable[node.children[i]]
      line(
        child.x * BOUNDW,
        child.y * HLEVEL,
        child.x * BOUNDW,
        child.y * HLEVEL - 0.5 * HLEVEL
      )
      line(
        child.x * BOUNDW,
        child.y * HLEVEL - 0.5 * HLEVEL,
        node.x * BOUNDW,
        child.y * HLEVEL - 0.5 * HLEVEL
      )
    }
  }

  fill("#000000")
  stroke("#98C861")
  rect(
    node.x * BOUNDW - 0.5 * BOUNDW + MARGIN,
    node.y * HLEVEL - 0.5 * BOXH,
    BOXW,
    BOXH
  )
  fill("#98C861")
  
  // title
  fill("#FFFFFF")
  textSize(10)
  text(
    "X-cord: " + node.x + "  Y-cord: " + node.y,
    node.x * BOUNDW - 0.5 * BOUNDW + 1.5 * MARGIN,
    node.y * HLEVEL - 0.5 * BOXH + 1.5 * MARGIN
  )

  // body
  fill("#98C861")
  rect(
    node.x * BOUNDW - 0.5 * BOUNDW + 2 * MARGIN,
    node.y * HLEVEL - 0.5 * BOXH + 25,
    BOXW - 2 * MARGIN,
    40
  )
  fill("#FFFFFF")
  textSize(20)
  text(
    "ID: " + node.id,
    node.x * BOUNDW - MARGIN - 4 * ((node.id.toString()).length + 3),
    node.y * HLEVEL - 0.5 * BOXH + 5.2 * MARGIN
  )

  // footer
  fill("#FFFFFF")
  textSize(10)
  text(
    "mod: " + node.mod,
    node.x * BOUNDW - 0.5 * BOUNDW + 1.5 * MARGIN,
    node.y * HLEVEL - 0.5 * BOXH + 8 * MARGIN
  )
}

// p5 setup
function setup() {
  genTest()
  process(0)
  createCanvas(8000, 1500)
  background(1)
  push()
  translate(100, 100)
  depthFirstSearch(0, drawNode)
  pop()
}
