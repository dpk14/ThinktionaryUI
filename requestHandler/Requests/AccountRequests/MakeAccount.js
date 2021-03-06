import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import {AccountRequest} from "./AccountRequest";

export default class MakeAccount extends AccountRequest {
    constructor(user, pwd, email, key) {
        super(PUT, "/users/", true, user, pwd, email, key);
    }
}
