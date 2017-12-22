import http from '../utils/httpServer.js'

export function ajaxMiddleware(api){
    return function(dispatch){
        return function(action){
            const {type, url, params} = action
            if(!url){
                return dispatch(action)
            }

            // api.dispatch({
            //     type: 'beforeRequest'
            // })
            if(url){
                http.post(url,params).then(res => {
                    api.dispatch({
                        type: 'Requested',
                        response: res
                    })
                }).catch(error => {
                    api.dispatch({
                        type: 'requestError',
                        error
                    })
                })
            }
        }
    }
}