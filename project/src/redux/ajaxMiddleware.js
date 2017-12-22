import http from '../utils/ajax'

export function ajaxMiddleware(api){
    return function(dispatch){
        return function(action){
            const {types, url, method = 'get', params} = action
            if(!url){
                return dispatch(action)
            }
            
            console.log(url, method)

            api.dispatch({
                type: 'beforeRequest'
            })
            if(url){
                if(method === 'get'){
                    http.get(url, {params}).then(res => {
                        api.dispatch({
                            type: 'Requested',
                            response: res.data
                        })
                    }).catch(error => {
                        api.dispatch({
                            type: 'requestError',
                            error
                        })
                    })
                }else if(method === 'post'){
                    http.post(url, params).then(res => {
                        api.dispatch({
                            type: 'Requested',
                            response: res.data
                        })
                    }).catch(error => {
                        api.dispatch({
                            type: 'requestError',
                            error
                        })
                    });
                }
            }
        }
    }
}