import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";

export default class makeAccount extends Request{
    constructor(user, pwd) {
        let url = BASE_URL + "/users/?user=" + user + "&pwd=" + pwd
        super(url, PUT, null, false)
    }
}
