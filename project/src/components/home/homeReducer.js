export default function HomeReducer(state = {}, action){
    switch(action.type){
        case 'shelve':
            state.routePath = action.type;
            break;
        case 'unShelve':
            state.routePath = action.type;
            break;
    }
    return state;
}