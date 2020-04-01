import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";

export default class removeTopic extends Request {
    constructor(userId, topicName) {
        let url = BASE_URL + "/users/" + userId + "/topics/remove/?name=" + topicName
        super(url, DELETE, null, false)
    }
}
