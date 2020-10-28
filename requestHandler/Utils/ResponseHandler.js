import FetchError from "../ErrorHandling/FetchError";

export default class responseHandler {

    static checkStatusOk(response) {
        if (!response.ok) {
            throw new FetchError(response.statusText, response.status, response);
        } else {
            return response;
        }
    }

    static returnBlobToText(blob, callback){
        let reader = new FileReader();
        reader.onload = function() {
            callback(reader.result);
        }
        reader.readAsText(blob);
    }
}
