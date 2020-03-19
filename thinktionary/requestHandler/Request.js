import XMLHttpRequest from "react-native";
import ResponseHandler from "./Utils/ResponseHandler";
const ABSTRACT_CLASS = "Cannot instantiate abstract class";
const ABSTRACT_METHOD = "Cannot call abstract method";

export const BASE_URL = 'https://thinktionary-backend.herokuapp.com'
export const DELETE = "DELETE"
export const GET = "GET"
export const PUT = "PUT"
export const POST = "POST"

const TITLE = "myTitle"
const TEXT = "myText"
const CREATED = "myCreated"

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

    request(url, type, json, hasReturn, callBack){
        let init = { method: type};
        if (hasReturn) {
            init.headers = {
                'Content-Type': 'application/json',
            }
        }
        if(json != null) {
            init.body = JSON.stringify(json);
        }
            return fetch(url, init)
                .then(response => {
                    ResponseHandler.checkStatusOk(response)
                })
                .then(checkedResponse => {this.translateBody(checkedResponse, callBack)})
                .catch(e => {
                     if(ResponseHandler.isUserException(e)){
                         this.translateException(e, callBack);
                     }
                     else throw e;
                })
        }

    fetchAndExecute(callBack){
        callBack(this.request(this.url, this.type, this.json, this.hasReturn, callBack));
    }

    translateBody(response, callBack){
        return response.blob().
        then(blob => {
            console.log(blob.type())
            return blob});
    }

    translateException(e, callBack){;
        e.response.blob().
        then(blob => {
            ResponseHandler.returnBlobToException(blob, callBack)})
    }
}
