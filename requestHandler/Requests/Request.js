import XMLHttpRequest from "react-native";
import ResponseHandler from "../Utils/ResponseHandler";
import {ABSTRACT_CLASS} from "../../components/utils/abstraction";
import {Alert} from "react-native";

export const BASE_URL = 'https://thinktionary-backend-alpha.herokuapp.com'
export const DELETE = "DELETE"
export const GET = "GET"
export const PUT = "PUT"
export const POST = "POST"

const TITLE = "myTitle"
const TEXT = "myText"
const CREATED = "myCreated"

export default class Request{

    constructor(url, type, json, hasReturn, parser=(value)=>{return value}) {
        this.url = url
        this.type = type
        this.json = json
        this.hasReturn = hasReturn
        this.parser = parser
        if (this.constructor === Request) {
            ABSTRACT_CLASS()
        }
    }

    request(url, type, json, hasReturn, callBack, errorCallBack, errorHandler){
        errorCallBack = errorCallBack == undefined ? ()=>{} :
                        Array.isArray(errorCallBack) ? ()=>errorCallBack.forEach((callBack) => callBack()) : errorCallBack
        errorHandler = errorHandler == undefined ? (message)=>{Alert.alert("Oh no!", message); errorCallBack()} : ()=>{errorHandler(); errorCallBack()}

        let init = { method: type};
        init.headers = {};
        if (hasReturn || json!= undefined) {
            init.headers['Content-Type'] = 'application/json';
            init.headers['Accept'] = 'application/json';
        }
        if (json != undefined) {
            init.body = JSON.stringify(json);
        }
            return fetch(url, init)
                .then(response => {
                    let checkedResponse = ResponseHandler.checkStatusOk(response)
                    this.translateBody(checkedResponse, callBack, hasReturn)
                })
                .catch(e => {
                    this.translateException(e, errorHandler);
                })
        }

    fetchAndExecute(callBack=(parsedResponse)=>{}, errorCallBack=(parsedError)=>{}, errorHandler){
        this.request(this.url, this.type, this.json, this.hasReturn, callBack, errorCallBack, errorHandler);
    }

    translateBody(response, callBack, hasReturn) {
        hasReturn ?
            response.json().
                then(json => this.parser(json)).
                then(parsedResponse => Array.isArray(callBack) ? callBack.forEach((func) => func(parsedResponse)) : callBack(parsedResponse))
            : Array.isArray(callBack) ? callBack.forEach((func) => func()) : callBack()
    }

    translateException(e, errorHandler){
        e.response.blob().then(blob => {
            ResponseHandler.returnBlobToText(blob, errorHandler)
        })
    }
}
