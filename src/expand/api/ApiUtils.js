//基础网络请求

let testUrl = 'https://test.huazilive.com/api/hudong';
// let testUrl = 'https://api.huazilive.com/api/hudong';

export default class ApiUtils{
    static get(url){
        let tempUrl = testUrl ;

        return new Promise((resolve,reject) => {
            fetch (tempUrl+url)
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static post(url,data){

        let tempUrl = testUrl ;

        console.log("url: ",tempUrl+url,'请求参数：',JSON.stringify(data));
        return new Promise((resolve,reject) => {
            fetch(tempUrl+url,{
                method:'POST',
                header:{
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:data
            })
                .then(response => response.json())
                .then(result => {
                    console.log('resultresult',result);

                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
}
