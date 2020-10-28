import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import JSONParser from "../../Utils/JSONParser";

export default class getEntry extends Request {
    constructor(userId) {
        let url = BASE_URL + "/users/" + userId + "/entries/getEntry"
        super(url, GET, null, true, JSONParser.parseEntry)
    }
}
