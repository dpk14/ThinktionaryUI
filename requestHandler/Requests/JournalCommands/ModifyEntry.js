import JSONBuilder from "../../Utils/JSONBuilder"
import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import JSONParser from "../../Utils/JSONParser";

export default class modifyEntry extends Request{
    constructor(userID, entryID, title, text, topics) {
        let entry = JSONBuilder.buildEntryWithCreated(title, text, topics)
        let url = BASE_URL + "/users/" + userID + "/entries/" + entryID
        super(url, PUT, entry, true, JSONParser.parseEntry)
    }
}
