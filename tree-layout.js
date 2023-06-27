let nodeSize = 1;
let siblingDistance = 0;
let treeDistance = 0;
// first loop
function initializeNodes(node, depth){
	node.x = -1, node.y = depth, node.mod = 0;
	for (let i=0; i< node.children.length; i++) {
		initializeNodes(node.children[i], depth + 1);
	}
}

function calculateInitialX(node) {
	for (let i=0; i< node.children.length; i++) {
		calculateInitialX(node.children[i]);
	}
	if (node.isLeaf())
	{
		if (!node.isLeftMost())
			node.x = node.getPreviousSibling().x + nodeSize + siblingDistance;
		else node.x = 0;
	}
	else if (node.children.length == 1)
	{
		if (node.isLeftMost())
		{
			node.x = node.children[0].x;
		}
		else
		{
			node.x = node.getPreviousSibling().x + nodeSize + siblingDistance;
			node.mod = node.x - node.children[0].x;
		} 
	}
	else
	{
		var leftChild = node.getLeftMostChild();
		var rightChild = node.getRightMostChild();
		var mid = (leftChild.x + rightChild.x) / 2;

		if (node.isLeftMost())
		{
				node.x = mid;
		}
		else
		{
				node.x = node.getPreviousSibling().x + nodeSize + siblingDistance;
				node.mod = node.x - mid;
		}
	}
	
	if (node.children.length > 0 && !node.isLeftMost())
	{
		checkForConflicts(node);
	}
}

// second loop
function checkForConflicts(node) {
	const minDistance = treeDistance + nodeSize;
	let shiftValue = 0;
	const nodeContour = {}
	getLeftContour(node, 0, nodeContour);
	let sibling = node.getLeftMostSibling();
	while (sibling !== null && !isNodeEqual(sibling, node)) {
		const siblingContour = {};
		getRightContour(sibling, 0, siblingContour);
		for (let level = node.y + 1; level <= Math.min(getMaxKey(siblingContour), getMaxKey(nodeContour)); level++) {
			const distance = nodeContour[level+""] - siblingContour[level+""];
			if (distance + shiftValue < minDistance) {
				shiftValue = minDistance - distance;
			}
		}
		
		if (shiftValue > 0) {
			node.x += shiftValue;
			node.mod += shiftValue;
			centerNodesBetween(node, sibling);
			shiftValue = 0;
		}

		sibling = sibling.getNextSibling();
	}
}

function getLeftContour(node, modSum, values) {
    if (typeof (values[node.y + ""]) ===  'undefined') {
      values[node.y + ""] = node.x + modSum;
    } else {
			values[node.y + ""] = Math.min(values[node.y+""] || 0, node.x + modSum);
    }
    modSum += node.mod;
    node.children.forEach(child => {
        getLeftContour(child, modSum, values);
    });
}

function getRightContour(node, modSum, values) {
    if (typeof (values[node.y + ""]) === 'undefined') {
        values[node.y + ""] = node.x + modSum;
    } else {
        values[node.y+""] = Math.max(values[node.y + ""] || 0, node.x + modSum) 
    }

    modSum += node.mod;
    node.children.forEach(child => {
        getRightContour(child, modSum, values);
    });
}

function checkAllChildrenOnScreen(node) {
	const nodeContour = {}
	getLeftContour(node, 0, nodeContour);
	let shiftAmount = 0;
	for (const y of Object.keys(nodeContour)) {
		if (+nodeContour[y] + shiftAmount < 0) {
			shiftAmount = nodeContour[y] * -1;
		}
	}

	if (shiftAmount > 0) {
		node.x += shiftAmount;
		node.mod += shiftAmount;
	}
}

function getMaxKey(obj){
    let max = -1e10;
    for (const y of Object.keys(obj)) {
        if (+y > max) {
            max = +y;
        }
    }
    return max;
}

function centerNodesBetween(leftNode, rightNode) {
    const leftIndex = rightNode.index;
    const rightIndex = leftNode.index;

    const numNodesBetween = (rightIndex - leftIndex) - 1;

    if (numNodesBetween > 0) {
        const distanceBetweenNodes = (leftNode.x - rightNode.x) / (numNodesBetween + 1);
        let count = 1;
        for (let i = leftIndex + 1; i < rightIndex; i++) {
            const middleNode = leftNode.parent.children[i];
            const desiredX = rightNode.x + (distanceBetweenNodes * count);
            const offset = desiredX - middleNode.x;
            middleNode.x += offset;
            middleNode.mod += offset;

            count++;
        }
        checkForConflicts(leftNode);
    }
}

function calculateFinalPositions(node, modSum) {
	node.x += modSum;
	modSum += node.mod;
	node.children.forEach(child => {
		calculateFinalPositions(child, modSum);
	});

	if (node.children.length === 0) {
		node.width = node.x;
		node.height = node.y;
	} else {
		const t = [...node.children].sort(a => a.width).reverse()
		node.width = t[0].width
		const u = [...node.children].sort(a => a.height).reverse()
		node.height = u[0].height
	}
}

function calculateNodePositions(node) {    
    initializeNodes(node, 0);
		
    calculateInitialX(node);
    
    checkAllChildrenOnScreen(node);

    calculateFinalPositions(node, 0);
}

function printMod(node) {
	for (const n of node.children) {
		printMod(n)
	}
	
}

function isNodeEqual(nodeA, nodeB) {
	const currentA = nodeA?.content?.title + nodeA?.content?.body + nodeA?.content?.footer + nodeA?.x + '|' + nodeA?.y
	const currentB = nodeB?.content?.title + nodeB?.content?.body + nodeB?.content?.footer + nodeB?.x + '|' + nodeB?.y
	const parentA = nodeA?.parent?.content?.title + nodeA?.parent?.content?.body + nodeA?.parent?.content?.footer + nodeA?.parent?.x + '|' + nodeA?.parent?.y
	const parentB = nodeB?.parent?.content?.title + nodeB?.parent?.content?.body + nodeB?.parent?.content?.footer + nodeB?.parent?.x + '|' + nodeB?.parent?.y
	return `${currentA}|${parentA}` === `${currentB}|${parentB}`
}