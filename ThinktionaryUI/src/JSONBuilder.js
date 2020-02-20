const TITLE = "myTitle"
const TEXT = "myText"
const CREATED = "myCreated"
const TOPICS = "myTopics"

function buildDate(year, month, day, hour, minute, second) {
    for(var val in {month, day, hour, minute}){
        if (val.size() !=2) throw Error;
    }
    if (year.size() != 4) throw Error
    var date = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second
    return date
}

function buildEntryWithCreated(title, text, created, topics){
    entry = []
    entry[TITLE] = title
    entry[TEXT] = text
    entry[CREATED] = created
    entry[TOPICS] = topics
    return entry
}

function buildEntry(title, text, topics){
    entry = []
    entry[TITLE] = title
    entry[TEXT] = text
    entry[TOPICS] = topics
    return entry
}
