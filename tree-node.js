class TreeNode {    
    constructor(content) {
        this.content = content;
        this.parent = null;
        this.children = [];
        this.x = 0, this.y = 0, this.width = 0, this.height = 0;
        this.mod = 0;
        this.index = -1;
    }

    addNode(node){
        node.parent = this;
        node.index = this.children.length;
        this.children.push(node);
    }

    isLeaf() {
        return this.children.length === 0;
    }

    isLeftMost() {
        if (this.parent === null) {
            return true;
        }

        return this.index === 0;
    }

    isRightMost() {
        if (this.parent === null) {
            return true;
        }

        return this.parent.children.length - 1 === this.index;
    }

    getPreviousSibling() {
        if (this.parent === null || this.isLeftMost()) {
            return null;
        }
        
        return this.parent.children[this.index - 1];
    }

    getNextSibling() {
        if (this.parent === null || this.isRightMost()) {
            return null;
        }

        return this.parent.children[this.index + 1];
    }

    getLeftMostSibling() {
        if (this.parent === null) {
            return null;
        }

        if (this.isLeftMost()) {
            return this;
        }

        return this.parent.children[0];
    }

    getLeftMostChild() {
        if (this.children.length === 0) {
            return null;
        }

        return this.children[0];
    }

    getRightMostChild() {
        if (this.children.length === 0) {
            return null;
        }

        return this.children[this.children.length - 1];
    }

    displayString() {
        let str = `${this.content.title} [x:${this.x}, y:${this.y}, w:${this.width}]\r\n`;
        for (let i=0; i<this.children.length; i++){
            str += this.children[i].displayString();
        }
        return str;
    }
}
