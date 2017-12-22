export function getData(_url,_params={}){
    return {
        type:'query',
        url : _url,
        params:_params
    }
}