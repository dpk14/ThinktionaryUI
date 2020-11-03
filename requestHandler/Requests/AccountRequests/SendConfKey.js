import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import {AccountRequest} from "./AccountRequest";

export default class SendConfKey extends AccountRequest {
    constructor(user, email, verify) {
        super(POST, "/users/sendconfkey?verify=" + verify, false, user, null, email)
    }
}
