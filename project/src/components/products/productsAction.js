export function getData(url, params){
    return {
        types: ['beforeRequest', 'Requested', 'requestError'],
        method: 'post',
        url: url,
        params: params
    }
}