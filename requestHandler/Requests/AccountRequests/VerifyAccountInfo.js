import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import {AccountRequest} from "./AccountRequest";

export default class VerifyAccountInfo extends AccountRequest{
    constructor(user, email) {
        super(POST, "/users/verify", false, user, null, email)
    }
}
