import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import {AccountRequest} from "./AccountRequest";

export default class SendConfKey extends AccountRequest {
    constructor(user, email) {
        super(POST, "/users/forgotpwd", false, user, null, email)
    }
}
