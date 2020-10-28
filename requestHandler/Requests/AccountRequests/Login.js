import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import JSONParser from "../../Utils/JSONParser";
import {Journal} from "../../../components/structs/Journal";
import {AccountRequest} from "./AccountRequest";

export default class Login extends AccountRequest{

    constructor(user, pwd) {
        super(POST, "/users/login", true, user, pwd, null, null, JSONParser.parseJournal);
    }

}
