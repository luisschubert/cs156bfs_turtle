class Node{
    constructor(value, parent, children){
        this.value = value;
        this.parent = parent;
        this.children = children;
    }
}

let specialPiecesMap = {
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
    let locationArr = location.split('');
    let row = locationArr[0];
    let col = locationArr[1];
    if (action === "U"){
        let newRow = parseInt(row) - 1;
        return newRow.toString().concat(col);
    }
    else if (action === "D"){
        let newRow = parseInt(row) + 1;
        return newRow.toString().concat(col);
    }
    else if (action === "R"){
        let newCol = parseInt(col) + 1;
        return row.concat(newCol.toString());
    }
    else if (action === "L"){
        let newCol = parseInt(col) - 1;
        return row.concat(newCol.toString());
    }
    else{
        console.error('unrecognized action');
    }
}

function computeChildNodes(node){
    let moves = ["U","D","L","R"];
    let childNodes =[];
    if (specialPiecesMap.hasOwnProperty(node.value)){
        moves = specialPiecesMap[node.value]
    }
    for(let move of moves){
        // console.log(`move:${move}`)
        let positionValue = computePosition(node.value, move);
        let positionNode = new Node(positionValue, node, []);
        // console.log(`positionNode:${JSON.stringify(positionNode)}`)
        childNodes.push(positionNode);
    }
    return childNodes;
}

function drawPath(node){
    if(node.parent !== null){
        let action = coordinatesToAction(node.parent.value, node.value);
        console.log(coordinateToString(node.value));
        console.log("^");
        console.log("|");
        console.log(`| ${action}`);
        console.log("|");
        drawPath(node.parent);
    }
    else{
        console.log(coordinateToString(node.value));
    }
}

function coordinateToString(coordinate){
    let c = coordinate.split('');
    return `row:${c[0]} col: ${c[1]}`
}

function coordinatesToAction(start,end){
    start = parseInt(start)
    end = parseInt(end)
    //end is start + 10
    if((start+10) == end){
        return "Down"
    }
    //end is start - 10
    else if((start-10) == end){
        return "Up"
    }
    //end is start + 1
    else if((start+1) == end){
        return "Right"
    }
    //end is start -1
    else if((start-1) == end){
        return "Left"
    }
    else{
        return "This shouldn't happen"
    }
}

function breadthfirstsearch(node, goalValue){
    let frontiered = []
    let explored = []
    if(node.value === goalValue){
        return node;
    }
    else{
        frontiered.push(node);
        while(frontiered.length != 0){
            // console.log(`frontiered: ${frontiered}`);
            // console.log(`explored: ${explored}`);
            let testNode = frontiered.shift();
            explored.push(testNode);
            // console.log(testNode);
            //test If goal
            if(testNode.value === goalValue){
                return testNode;
            }
            else{
                let children = computeChildNodes(testNode);
                // console.log(`children: ${JSON.stringify(children)}`)
                for(let child of children){
                    frontiered.push(child);
                }
            }
        }
    }

}


///PROGRAM START
let start = new Node("53", null, []);
let goal = "22"

console.time('bfs');
let successnode = breadthfirstsearch(start,goal);
console.timeEnd('bfs');
console.log('solution found');

drawPath(successnode);
