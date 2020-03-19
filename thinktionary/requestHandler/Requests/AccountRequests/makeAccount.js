import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";

export default class makeAccount extends Request{
    constructor(user, pwd) {
        console.log(user);
        let url = BASE_URL + "/users/?user=" + "&pwd=" + pwd
        super(url, PUT, null, false)
    }
}
