import http from '../utils/ajax'
import qs from 'qs'

export function ajaxMiddleware(api){
    return function(dispatch){
        return function(action){
            const { type, url, method = 'get', params } = action;
            if(!url){
                return dispatch(action);
            }
            api.dispatch({
                type: 'beforeRequest'
            });
            
            if(url){
                if(method === 'get'){
                    http.get(url, {params}).then(res => {
                        api.dispatch({
                            type: 'Requested',
                            response: res.data
                        });
                    }).catch(error => {
                        api.dispatch({
                            type: 'requestError',
                            error
                        });
                    });
                }else if(method === 'post'){
                    http.post(url, qs.stringify(params)).then(res => {
                        api.dispatch({
                            type: 'Requested',
                            response: res.data
                        });
                    }).catch(error => {
                        api.dispatch({
                            type: 'requestError',
                            error
                        });
                    });
                }
            }
        }
    }
}