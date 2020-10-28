import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import {AccountRequest} from "./AccountRequest";

export default class ResetPassword extends AccountRequest {
    constructor(user, pwd, email, key) {
        super(POST, "/users/resetpwd/", false, user, pwd, email, key)
    }
}
