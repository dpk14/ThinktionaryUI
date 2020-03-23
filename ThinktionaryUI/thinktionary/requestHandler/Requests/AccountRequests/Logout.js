import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";

export default class Logout extends Request{
    constructor(user, pwd) {
        let url = BASE_URL+"/users/logout?user=" + user + "&pwd=" + pwd
        super(url, GET, null, true)
    }

}
