export default function Myclick(state={},action){
    console.log(action)
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "home":
            newState=action.routers ? action.routers : [];
            break;

    }
    return newState;
}