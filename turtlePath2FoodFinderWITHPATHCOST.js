//The Node class used to represent paths in the puzzles.
class Node{
    constructor(value, parent, children, pathcost){
        this.value = value;
        this.parent = parent;
        this.children = children;
        this.pathcost = pathcost;
    }
}

//This object represents the legal moves you can make at squares where not all 4 are possible.
//The key represents the col and row of a piece as a string. "45" = row:4, col:5
//The value represents the available moves as a list. "D" = Down, "L" = Left...
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

//given a location as a string and the action the resulting location is returned
//ex: location= "45", action= "U" => "35"
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

//given a node the childNodes are computed
function computeChildNodes(node){
    let moves = ["U","D","L","R"];
    let childNodes = [];
    if (specialPiecesMap.hasOwnProperty(node.value)){
        moves = specialPiecesMap[node.value]
    }
    //for each available move calculate the according new location
    for(let move of moves){
        let positionValue = computePosition(node.value, move);
        let positionNode = new Node(positionValue, node, [], node.pathcost + 1);
        childNodes.push(positionNode);
    }
    return childNodes;
}

//draws the path from a given node back to the start.
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

//computes the coordinates for a given string representing a location
function coordinateToString(coordinate){
    let c = coordinate.split('');
    return `row:${c[0]} col: ${c[1]}`
}

//determine what action was taken when comparing two nodes
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
        return "No action can connect these positions."
    }
}

//search first for some breath and then go ahead and search the tree, breadth first. #joke
function breadthfirstsearch_Analyzed(node, goalValue){
    console.log("analyzation of algorithm")
    // stores how many times was each position was visited
    let mapOfExploration = {}
    let frontiered = []
    let explored = []
    if(node.value === goalValue){
        return node;
    }
    else{
        frontiered.push(node);
        while(frontiered.length != 0){
            let testNode = frontiered.shift();
            if(!mapOfExploration.hasOwnProperty(testNode.value)){
                mapOfExploration[testNode.value] = 1
            }else{
                mapOfExploration[testNode.value] = mapOfExploration[testNode.value] + 1
            }
            explored.push(testNode.value);
            //test if currentNode is the goal
            if(testNode.value === goalValue){
                console.log('map of exploration is:');
                console.log(mapOfExploration);
                return testNode;
            }
            else{
                let children = computeChildNodes(testNode);
                for(let child of children){
                    //check if the node is not already present in frontiered or explored
                    if(!containsMatch(frontiered, child) && !containsMatch(explored, child)){
                        frontiered.push(child);
                    }
                }
            }
        }
    }
}

//search first for some breath and then go ahead and search the tree, breadth first. #joke
function breadthfirstsearch(node, goalValue){
    let frontiered = []
    let explored = []
    //if start is goal return start
    if(node.value === goalValue){
        //return the node
        return node;
    }
    else{
        frontiered.push(node);
        //if frontiered
        while(frontiered.length != 0){
            //pop a node of the frontiered queue
            let testNode = frontiered.shift();
            //add the node to the explored list
            explored.push(testNode.value);
            //test if testNode is goal
            if(testNode.value === goalValue){
                //return the node
                return testNode;
            }
            else{
                //expand the node
                let children = computeChildNodes(testNode);
                //iterate of expanded nodes
                for(let child of children){
                    //check if the node is not already present in frontiered or explored
                    if(!containsMatch(frontiered, child) && !containsMatch(explored, child)){
                        //add node to frontiered
                        frontiered.push(child);
                    }
                }
            }
        }
    }
    return "No path found!"
}

//returns true if there is a match else returns false
function containsMatch(nodeList, matchNode){
    for (node of nodeList){
        //nodes are equal if the value and the pathcost are equal
        if(node.value == matchNode.value && node.pathcost == matchNode.pathcost){
            return true;
        }
    }
    return false;
}


///PROGRAM START
let start = new Node("53", null, [], 0);
let goal = "22"

console.time('bfs');
let successnode = breadthfirstsearch(start,goal);
console.timeEnd('bfs');
console.log('solution found');

drawPath(successnode);
