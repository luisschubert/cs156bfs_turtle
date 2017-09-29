class Node{
    constructor(value, parent, children){
        this.value = value;
        this.parent = parent;
        this.children = children;
    }
}

var specialPiecesMap = {
    "00": ["D", "R"],
    "01": ["D", "L", "R"],
    "02": ["D", "L", "R"],
    "03": ["D", "L", "R"],
    "04": ["D", "L", "R"],
    "05": ["D", "L", "R"],
    "06": ["D", "L", "R"],
    "07": ["D", "L"],
    "10": ["D", "U", "R"],
    "17": ["D", "U", "L"],
    "20": ["D", "U", "R"],
    "22": ["R", "U", "L"],
    "23": ["R", "U", "L"],
    "24": ["R", "U", "L"],
    "25": ["R", "U", "L"],
    "26": ["R", "U", "L"],
    "27": ["D", "U", "L"],
    "30": ["R", "U", "D"],
    "31": ["U", "L"],
    "37": ["U", "D"],
    "40": ["U", "D"],
    "42": ["R"],
    "43": ["R", "L", "D"],
    "44": ["R", "L", "D"],
    "45": ["R", "L", "D"],
    "46": ["R", "L"],
    "47": ["U", "L", "D"],
    "50": ["R", "U", "D"],
    "51": ["L", "D"],
    "53": ["R", "U", "D"],
    "55": ["L", "U", "D"],
    "57": ["U", "D"],
    "60": ["R", "U", "D"],
    "62": ["R", "L", "D"],
    "66": ["R", "L", "D"],
    "67": ["U", "L", "D"],
    "70": ["R", "U"],
    "71": ["R", "U", "L"],
    "72": ["R", "U", "L"],
    "73": ["R", "U", "L"],
    "74": ["R", "U", "L"],
    "75": ["R", "U", "L"],
    "76": ["R", "U", "L"],
    "77": ["U", "L"],
}

function computePosition(location, action){
    var locationArr = location.split('');
    var row = locationArr[0];
    var col = locationArr[1];
    if (action === "U"){
        var newRow = parseInt(row) - 1;
        return newRow.toString().concat(col);
    }
    else if (action === "D"){
        var newRow = parseInt(row) + 1;
        return newRow.toString().concat(col);
    }
    else if (action === "R"){
        var newCol = parseInt(col) + 1;
        return row.concat(newCol.toString());
    }
    else if (action === "L"){
        var newCol = parseInt(col) - 1;
        return row.concat(newCol.toString());
    }
    else{
        console.error('unrecognized action');
    }
}

function computeChildNodes(node){
    var moves = ["U","D","L","R"];
    var childNodes =[];
    if (specialPiecesMap.hasOwnProperty(node.value)){
        moves = specialPiecesMap[node.value]
    }
    for(var move of moves){
        // console.log(`move:${move}`)
        var positionValue = computePosition(node.value, move);
        var positionNode = new Node(positionValue, node, []);
        // console.log(`positionNode:${JSON.stringify(positionNode)}`)
        childNodes.push(positionNode);
    }
    return childNodes;
}

function drawPath(node){
    if(node.parent !== null){
        console.log(node.value);
        console.log("^")
        console.log("|")
        drawPath(node.parent);
    }
    else{
        console.log(node.value);
    }
}

function breadthfirstsearch(node, goalValue){
    var frontiered = []
    var explored = []
    if(node.value === goalValue){
        return node;
    }
    else{
        frontiered.push(node);
        while(frontiered.length != 0){
            // console.log(`frontiered: ${frontiered}`);
            // console.log(`explored: ${explored}`);
            var testNode = frontiered.shift();
            explored.push(testNode);
            // console.log(testNode);
            //test If goal
            if(testNode.value === goalValue){
                return testNode;
            }
            else{
                var children = computeChildNodes(testNode);
                // console.log(`children: ${JSON.stringify(children)}`)
                for(var child of children){
                    frontiered.push(child);
                }
            }
        }
    }

}


///PROGRAM START
var start = new Node("53", null, []);
var goal = "22"

console.time('bfs');
var successnode = breadthfirstsearch(start,goal);
console.timeEnd('bfs');
console.log('solution found');

drawPath(successnode);
