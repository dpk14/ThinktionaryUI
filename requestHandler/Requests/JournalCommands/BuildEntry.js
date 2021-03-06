import JSONBuilder from "../../Utils/JSONBuilder"
import Request, {POST, PUT, GET, DELETE, BASE_URL} from "../Request";
import {Journal} from "../../../components/structs/Journal";
import JSONParser from "../../Utils/JSONParser";

export default class buildEntry extends Request{

    constructor(userID, title, text, topics, created=undefined) {
        if(topics == undefined){
            throw Error("topics are undefined in buildEntry")
        }
        let entry = {}
        if(created == undefined){
            entry = JSONBuilder.buildEntryWithCreated(title, text, topics)
        }
        else{
            entry = JSONBuilder.buildEntryWithCreated(title, text, topics, created)
        }
        let url = BASE_URL+"/users/" + userID + "/entries"
        super(url, POST, entry, true, JSONParser.parseEntry)
    }
}
