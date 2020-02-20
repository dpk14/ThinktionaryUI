const TITLE = "myTitle"
const TEXT = "myText"
const CREATED = "myCreated"
const TOPICS = "myTopics"

function buildDate(year, month, day, hour="00", minute="00", second="00") {
    for(var val in {month, day, hour, minute}){
        if (val.size() !=2) throw Error;
    }
    if (year.size() != 4) throw Error
    var date = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second
    return date
}

function buildEntryWithCreated(title, text, topics, created){
    var entry = []
    entry[TITLE] = title
    entry[TEXT] = text
    entry[CREATED] = created
    entry[TOPICS] = topics
    return entry
}

function buildEntry(title, text, topics){
    var entry = []
    entry[TITLE] = title
    entry[TEXT] = text
    entry[TOPICS] = topics
    return entry
}

module.exports = buildDate, buildEntry, buildEntryWithCreated
