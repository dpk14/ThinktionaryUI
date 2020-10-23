import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";

export default class MakeAccount extends Request{
    constructor(user, pwd, email, key) {
        let url = BASE_URL + "/users/?user=" + user + "&pwd=" + pwd + "&email=" + email + "&key=" + key
        console.log(url);
        super(url, PUT, null, true)
    }
}
