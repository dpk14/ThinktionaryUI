import XMLHttpRequest from "react-native";
const ABSTRACT_CLASS = "Cannot instantiate abstract class";
const ABSTRACT_METHOD = "Cannot call abstract method";


export default class Request{

    constructor(url, type, json, hasReturn) {
        this.url = url
        this.type = type
        this.json = json
        this.hasReturn = hasReturn
        if(this.constructor === Request) {
            throw new Error(ABSTRACT_CLASS)
        }
    }

    requestXML(url, type, json, hasReturn){
        var request = new XMLHttpRequest()
        // get a callback when the server responds
        request.onreadystatechange = e => {
            if (request.readyState !== 4) {
                return 'could not connect';
            }

            if (request.status === 200) {
                return request;
                console.log('success', request.responseText);
            } else {
                console.warn('error');
            }
        };
        // open the request with the verb and the url
        request.open(type, url)
        if(hasReturn) request.setRequestHeader('Content-Type', 'application/json')
        // send the request
        if(json!=null) request.send(JSON.stringify(json))
        else request.send()
    }

    async request(url, type, json, hasReturn){
        let init = { method: type};
        if (hasReturn) {
            init.headers = {
                'Content-Type': 'application/json',
            }
        }
        if(json != null) {
            init.body = JSON.stringify(json);
        }
        var method = function() {
            return fetch(url, init)
                .then(response => {this.checkStatus(response)})
                .then(checkedResponse => {
                    checkedResponse.json()
                })
                .catch(e => throw e)
        }
        var ans = await method();
        console.log(ans);
        return ans;
    }

    checkStatus(response){
        if (response.ok) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.status = response.status
            error.response = response.json();
            throw error;
        }
    };

    execute(){
        try {
            let response = this.request(this.url, this.type, this.json, this.hasReturn);
            return this.translate(response);
        }
        catch(error){
            return this.translateError(error);
        }
    }

    translate(response){
        throw new Error(ABSTRACT_METHOD)
    }

    translateError(error){
        if(error.status == 404){
            throw error
        }
        return error.statusText
    }
}
