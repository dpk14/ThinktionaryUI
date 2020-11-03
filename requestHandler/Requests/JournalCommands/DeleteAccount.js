import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";

export default class DeleteAccount extends Request {
    constructor(userId) {
        let url = BASE_URL + "/users/" + userId
        super(url, DELETE, null, false)
    }
}
