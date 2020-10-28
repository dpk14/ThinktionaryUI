import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";

export default class removeEntry extends Request {
    constructor(userId, entryID) {
        let url = BASE_URL + "/users/" + userId + "/entries/" + entryID + "/remove"
        super(url, DELETE, null, false)
    }
}
