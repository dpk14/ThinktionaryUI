const TITLE = "myTitle"
const TEXT = "myText"
const CREATED = "myCreated"
const TOPICS = "myTopics"

const USERNAME = "username";
const PASSWORD = "pwd";
const EMAIL = "email";
const CONF_KEY = "confKey";

function buildDate(year, month, day, hour="00", minute="00", second="00.000") {
    let dates = {}
    dates["month"] = month
    dates["day"] = day
    dates["hour"] = hour
    dates["minute"] = minute
    for(val in dates){
        if (dates[val].length !=2) throw val + " is incorrect size";
    }
    if (year.length != 4) throw "year is incorrect size"
    var date = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second
    return date
}

function buildEntryWithCreated(title, text, topics, created=undefined){
    let entry = {}
    entry[TITLE] = title
    entry[TEXT] = text
    if (created != undefined) entry[CREATED] = created
    entry[TOPICS] = setToArray(topics)
    return entry
}

function buildCredentials(username, password, email, confirmationKey){
    let entry = {}
    entry[USERNAME] = username
    entry[PASSWORD] = password
    entry[EMAIL] = email
    entry[CONF_KEY] = confirmationKey
    console.log(entry)
    return entry
}


function setToArray(set){
    let arr = []
    set.forEach((entry) => arr.push({myColor : '#FFFFFF', myTopic: entry}))
    return arr
}

function buildEntry(title, text, topics){
    var entry = {}
    entry[TITLE] = title
    entry[TEXT] = text
    entry[TOPICS] = topics
    return entry
}

module.exports = {buildDate, buildEntry, buildCredentials, buildEntryWithCreated}
