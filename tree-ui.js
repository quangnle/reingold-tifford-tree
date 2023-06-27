class TreeUI {
    constructor(root, boxWidth, boxHeight, margin, hLevel){
        this.boxWidth = boxWidth, this.boxHeight = boxHeight, this.margin = margin, this.hLevel = hLevel;
        this.root = new TreeNodeUI(root, boxWidth, boxHeight, margin, hLevel);
        this.createContent(this.root, root);
    }

    createContent(nodeui, node){
        nodeui.node = node;
        for(let i=0; i<node.children.length; i++) {
            const childNodeUI = new TreeNodeUI(node.children[i], this.boxWidth, this.boxHeight, this.margin, this.hLevel);
            nodeui.children.push(childNodeUI);
            this.createContent(childNodeUI, node.children[i]);
        }
    }

    draw() {
        this.root.draw();
    }
}