import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";

export default class VerifyAccount extends Request{
    constructor(user, email) {
        let url = BASE_URL + "/users/verify?user=" + user + "&email=" + email
        console.log(url);
        super(url, GET, null, false)
    }
}
