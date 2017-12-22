export default function LightReducer(state = {}, action){
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "beforeRequest":
            newState.status = '0'
            break;
        case 'Requested':
            newState.status = '1';
            newState.response = action.response;
            break;

    }

    return newState;
}