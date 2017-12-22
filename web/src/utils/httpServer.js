const LOCAL_SERVER = 'http://localhost:1133/';

const DEV_SERVER = '';
const PRO_SERVER = '';

let xhr = new XMLHttpRequest()


function getUrl(path) {
    if (path.startsWith('http') || path.startsWith('https')) {
        return path;
    }
    return `${LOCAL_SERVER}${path}`;
}

const http = {
    get :(path,params={})=>new Promise((resolve,reject)=>{
        var url = getUrl(path)
        var par = '?'
        if(params){
            for(var key in params){
                par+=key+"="+params[key]+'&'
            }
            url+=par.slice(0,-1)

        }
        xhr.onload = function(){
            if(xhr.status==200 || xhr.status==304){
                var res = JSON.parse(xhr.responseText);
                resolve(res)
            }
        }
        xhr.open('get',url,true);
        xhr.send()
    }),

    post:(path,params={})=>new Promise((resolve,reject)=>{
        var url = getUrl(path)
        var par=''
        if(params){
            for(var key in params){
                par+=key+"="+params[key]+'&'
            }
        }
        xhr.onload = function(){
            if(xhr.status==200 || xhr.status==304){
                var res = JSON.parse(xhr.responseText);
                resolve(res)
            }
        }
        xhr.open('post',url,true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(par.slice(0,-1))
    })

}

export default http