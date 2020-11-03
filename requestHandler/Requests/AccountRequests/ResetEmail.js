import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import {AccountRequest} from "./AccountRequest";

export default class ResetEmail extends AccountRequest {
    constructor(user, email, key) {
        super(POST, "/users/resetemail/", false, user, null, email, key)
    }
}
