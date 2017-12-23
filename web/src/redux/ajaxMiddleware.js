import http from '../utils/httpServer.js'

export function ajaxMiddleware(api){
    return function(dispatch){
        return function(action){
            const {type, url, params,method='post'} = action
            if(!url){
                return dispatch(action)
            }

            // api.dispatch({
            //     type: 'detail_params'
            // })
            if(url){
                http[method](url,params).then(res => {
                    api.dispatch({
                        type: type,
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