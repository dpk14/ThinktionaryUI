import JSONBuilder from "../../Utils/JSONBuilder"
import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";
import JSONParser from "../../Utils/JSONParser";

export default class modifyEntry extends Request{
    constructor(userID, entryID, title, text, topics, created) {
        let entry = {}
        if (created == null) {
            entry = JSONBuilder.buildEntryWithCreated(title, text, topics)
        } else {
            entry = JSONBuilder.buildEntryWithCreated(title, text, topics, created)
        }
        let url = BASE_URL + "/users/" + userID + "/entries/" + entryID
        super(url, PUT, entry, true, JSONParser.parserEntry)
    }
}
