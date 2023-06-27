const root = new TreeNode({title:"Andy    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"});
let treeui = null;
const WIDTH = 1900, HEIGHT = 1000;
const BOXW = 130, BOXH = 90, MARGIN = 10, HLEVEL = 150;

function setup(){
    prepareData();
    calculateNodePositions(root);    
    treeui = new TreeUI(root, BOXW, BOXH, MARGIN, HLEVEL);
    console.log(root.displayString());
    createCanvas(WIDTH, HEIGHT);
}

function draw() {
    background(0);
    push();
    translate(100, 100);
    treeui.draw();
    pop();
}

function prepareData(){
    // Andy
    root.addNode(new TreeNode({title:"Benny    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.addNode(new TreeNode({title:"Becky    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.addNode(new TreeNode({title:"Billy    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));

    // Benny
    root.children[0].addNode(new TreeNode({title:"Candy    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[0].addNode(new TreeNode({title:"Cody    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));

    // Cody
    root.children[0].children[1].addNode(new TreeNode({title:"David    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[0].children[1].addNode(new TreeNode({title:"Dang    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));

    // Becky
    root.children[1].addNode(new TreeNode({title:"Camellia    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[1].addNode(new TreeNode({title:"Cam    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[1].addNode(new TreeNode({title:"Cajun    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[1].addNode(new TreeNode({title:"Cayalla    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));

    // Billy
    root.children[2].addNode(new TreeNode({title:"Calla    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[2].addNode(new TreeNode({title:"Chris    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));

    // Cajun 
    root.children[1].children[2].addNode(new TreeNode({title:"Filleto    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[1].children[2].addNode(new TreeNode({title:"Foe    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[1].children[2].addNode(new TreeNode({title:"Fanato    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[1].children[2].addNode(new TreeNode({title:"Furion    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));

    // Chris
    root.children[2].children[1].addNode(new TreeNode({title:"Emi    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[2].children[1].addNode(new TreeNode({title:"Emma    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[2].children[1].addNode(new TreeNode({title:"Ender    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[2].children[1].addNode(new TreeNode({title:"Elva    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[2].children[1].addNode(new TreeNode({title:"Ella    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));

    // Filleto
    root.children[1].children[2].children[0].addNode(new TreeNode({title:"Femma    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[1].children[2].children[0].addNode(new TreeNode({title:"Fonsi    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));

    // Foe
    root.children[1].children[2].children[1].addNode(new TreeNode({title:"Felma    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
    root.children[1].children[2].children[1].addNode(new TreeNode({title:"Femala    RT0    (1234)", body:"$132,777.5", footer:"$123      $456      $789.12"}));
}