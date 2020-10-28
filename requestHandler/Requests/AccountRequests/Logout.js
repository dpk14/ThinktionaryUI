import {POST} from "../Request";
import {AccountRequest} from "./AccountRequest";

export default class Logout extends AccountRequest{
    constructor(user, pwd) {
        super(POST, "/users/logout", true, user, pwd);
    }

}
