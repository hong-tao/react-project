export default function getParams(state={},action){
    var newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case 'detail':
            newState.response = action.response;
            break;
    }
    return newState
}