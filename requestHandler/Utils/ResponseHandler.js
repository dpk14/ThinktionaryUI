import FetchError from "../ErrorHandling/FetchError";

export default class responseHandler {

    static checkStatusOk(response) {
        if (response.ok) {
            return response;
        } else {
            throw new FetchError(response.statusText, response.status, response);
        }
    }

    static isUserException(e){
        return e.response.status == 403;
    }

    static returnBlobToText(blob, callback){
        let reader = new FileReader();
        reader.onload = function() {
            callback(reader.result);
        }
        reader.readAsText(blob);
    }

    static returnBlobToJSON(blob, callback){
        let reader = new FileReader();
        reader.onload = function() {
            callback(JSON.parse(reader.result), true);
        }
        reader.readAsText(blob);
    }

    /*

    static parseOrAlert = (response, exceptionThrown, callBack, parser) =>{
        if(exceptionThrown) {
            alert(response);
        }
        else{
            let parsedResponse = parser(response)
            callBack(parsedResponse)
        }
    }
    */

}
