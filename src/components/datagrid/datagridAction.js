export function getData(){
    return {
        types: ['beforeRequest', 'Requested', 'requestError'],
        url: 'https://cnodejs.org/api/v1/topics?page=1&limit=10'
    }
}