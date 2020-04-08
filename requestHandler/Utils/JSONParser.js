import {Journal} from "../../components/structs/Journal";
import {Entry} from "../../components/structs/Entry";

export default class JSONParser{
    static parseJournal = (response) => {
        let topics = new Set()
        for(let key in response["myTopics"]) {
            topics.add(key)
        }
        return new Journal(response["myEntries"], response["myEntryMap"], topics, response["myUserID"], response['myUsername'], response['myPassword'])
    }

    static parseEntry = (response)  => {
        let topics = new Set()
        response["myTopics"].forEach((topic) => topics.add(topic["myTopic"]))
        return new Entry(response["myTitle"], response["myText"], topics, response["myID"], response["myCreated"], response["myModfied"])
    }


}
