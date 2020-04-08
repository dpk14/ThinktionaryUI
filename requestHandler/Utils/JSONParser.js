import {Journal} from "../../components/structs/Journal";
import {Entry} from "../../components/structs/Entry";

export default class JSONParser{
    static parseJournal = (response) => {
        return new Journal(response["myEntries"], response["myEntryMap"], response["myTopics"], response["myUserID"])
    }

    static parseEntry = (response)  => {
        console.log(response)
        let topics = new Set()
        response["myTopics"].forEach((topic) => topics.add(topic["myTopic"]))
        return new Entry(response["myTitle"], response["myText"], topics, response["myID"], response["myCreated"], response["myModfied"])
    }


}
