import XMLHttpRequest from "react-native";
import ResponseHandler from "./Utils/ResponseHandler";
import fetchError from "./ErrorHandling/FetchError";
import {ABSTRACT_CLASS} from "../components/utils/abstraction";

export const BASE_URL = 'https://thinktionary-backend.herokuapp.com'
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
        if(this.constructor === Request) {
            ABSTRACT_CLASS()
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

    request(url, type, json, hasReturn, callBack, errorHandler=(message)=>{alert(message)}){
        let init = { method: type};
        if (hasReturn) {
            init.headers = {
                'Content-Type': 'application/json',
            }
        }
        if(json != undefined) {
            init.headers['Accepts'] = 'application/json'
            init.body = JSON.stringify(json);
        }
            return fetch(url, init)
                .then(response => {
                    return ResponseHandler.checkStatusOk(response)
                })
                .then(checkedResponse => {
                    this.translateBody(checkedResponse, callBack)
                })
                .catch(e => {
                    //console.warn(e.message);
                    //if(e instanceof fetchError && ResponseHandler.isUserException(e)){
                        this.translateException(e, errorHandler);
                    //}
                    //else throw e;
                })

        }

    fetchAndExecute(callBack=(parsedResponse)=>{}, params={}){
        this.request(this.url, this.type, this.json, this.hasReturn, callBack);
    }

    translateBody(response, callBack){
        response.json().
        then(json => this.parser(json)).
        then(parsedResponse => Array.isArray(callBack) ? callBack.forEach((func) => func(parsedResponse)) : callBack(parsedResponse))
    }

    translateException(e, errorHandler){
        e.response.blob().then(blob => {
            ResponseHandler.returnBlobToText(blob, errorHandler)
        })
    }
}
