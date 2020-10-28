import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";

export default class getByTopic extends Request {
    constructor(userID, topics) {
        let url = BASE_URL + "/users/" + userID + "/entries/get"
        super(url, POST, topics, true)
    }
}
