import JSONBuilder from "../../Utils/JSONBuilder"
import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../../Request";

export default class buildEntry extends Request{
    constructor(userID, title, text, topics, created=null) {
        let entry = {}
        if(created == null){
            entry = JSONBuilder.buildEntryWithCreated(title, text, topics)
        }
        else{
            entry = JSONBuilder.buildEntryWithCreated(title, text, topics, created)
        }
        let url = BASE_URL+"/users/" + userID + "/entries"
        super(url, POST, entry, true)
    }
}
