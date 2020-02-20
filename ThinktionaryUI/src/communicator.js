var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
let BASE_URL = 'http://localhost:8090'
const DELETE = "DELETE"
const GET = "GET"
const PUT = "PUT"
const POST = "POST"

function buildEntry(title, text, topics, year, month, day, hour=0, minute=0, second=0) {

    var created = JSONBUILDER.buildDate(year, month, day, hour, minute, second)
    var entry = {
        TITLE: title,
        TEXT: text,
        CREATED: created,
        TOPICS : topics
    }
}

function getEntry(userId){
    url = BASE_URL+ "/users/" + userId + "/entries/getEntry"
    request(url, GET, null, true)
}

function createEntry(userID, entry){
    url = BASE_URL+ "/" + userID + "/entries"
    request(url, POST, entry, false)
}

function makeAccount(user, pwd){
    url = BASE_URL+"/users/?user=" + user + "&pwd=" + pwd
    request(url, PUT, null, false)
}

function login(user, pwd){
    url = BASE_URL+"/?user=" + user + "&pwd=" + pwd
    request(url, GET, null, true)
}


function request(url, type, json, hasReturn){
    var xhr = new XMLHttpRequest()
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open(type, url)
    if(hasReturn) xhr.setRequestHeader('Content-Type', 'application/json')
    // send the request
    if(json!=null) xhr.send(JSON.stringify(json))
    else xhr.send()
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

//makeAccount("dpk14", "1234")
//sleep(1000)
//login("dpk14", "1234")
getEntry(1)
