export default function Backtrack(state={},action){
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "back":
            newState = 1;
            break;
    }

    return newState
}