import Request, {BASE_URL, PUT} from "../Request";

const JSONBuilder = require("../../Utils/JSONBuilder");

export class AccountRequest extends Request {

    constructor(type,
                path,
                hasReturn,
                username = null,
                password = null,
                email = null,
                confirmationKey = null,
                parser = () => {}) {
        let url = BASE_URL + path;
        console.log(url);
        super(url, type, JSONBuilder.buildCredentials(username, password, email, confirmationKey), hasReturn, parser);
    }
}
