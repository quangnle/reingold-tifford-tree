class TreeNodeUI {
    constructor(node, width, height, margin, hLevel){
        this.node = node;
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.hLevel = hLevel;
        this.children = [];
    }

    draw() {
        const w = this.width + 2*this.margin;
        stroke("#000");
        if (this.children.length > 0){
            line(this.node.x * w, this.node.y * this.hLevel, this.node.x * w, this.node.y * this.hLevel + this.hLevel*0.5);
            // draw connectors
            for (let i=0; i<this.children.length; i++){
                const gap = this.hLevel - this.height;            
                const child = this.children[i];
                line(child.node.x * w, child.node.y * this.hLevel, child.node.x*w, child.node.y*this.hLevel - 0.5*this.hLevel);
                line(child.node.x * w, child.node.y*this.hLevel - 0.5*this.hLevel, this.node.x * w, child.node.y*this.hLevel - 0.5*this.hLevel);
            }
        }

        // draw box        
        fill("#000");
        stroke("#EABC00");
        rect(this.node.x * w - 0.5*w + this.margin, (this.hLevel * this.node.y) - (this.height*0.5), this.width, this.height);
        fill("#EABC00");

        // title
        fill("#fff");
        textSize(10);
        text(this.node.content.title, this.node.x * w - 0.5*w + 2*this.margin, (this.hLevel * this.node.y) - (this.height*0.5) + this.margin*1.5);
        
        // body
        fill("#EABC00");
        rect(this.node.x * w - 0.5*w + 2*this.margin, (this.hLevel * this.node.y) - (this.height*0.5) + 25, this.width - 2*this.margin, 40);
        fill("#fff");
        textSize(20);
        text(this.node.content.body, this.node.x * w - 0.5*w + 2*this.margin, (this.hLevel * this.node.y) - (this.height*0.5) + this.margin*5);

        // footer
        fill("#fff");
        textSize(10);
        text(this.node.content.footer, this.node.x * w - 0.5*w + 2*this.margin, (this.hLevel * this.node.y) - (this.height*0.5) + this.margin*8);

        for (let i=0; i<this.children.length; i++){
            this.children[i].draw();
        }
    }
}