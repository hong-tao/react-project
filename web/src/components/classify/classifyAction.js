export function getData(_url,_params={}){
    return {
        type:'query',
        url : _url,
        params:_params
    }
}

export function getParams(_params){
    return {
        type:"param",
        params:_params
    }
}