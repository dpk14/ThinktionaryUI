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

    static returnBlobToException(blob, callback){
        let reader = new FileReader();
        reader.onload = function() {
            callback(reader.result, true);
        }
        reader.readAsText(blob);
    }

}
