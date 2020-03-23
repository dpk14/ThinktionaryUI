import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";

export default class getRandom extends Request {
    constructor(userID, topics) {
        let url = BASE_URL + "/users/" + userID + "/entries/getRand"
        super(url, POST, topics, true)
    }
}
