var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
let JSONBuilder = require("./JSONBuilder")
let testTools = require("./testTools")
let BASE_URL = 'http://localhost:8090'
const DELETE = "DELETE"
const GET = "GET"
const PUT = "PUT"
const POST = "POST"

const TITLE = "myTitle"
const TEXT = "myText"
const CREATED = "myCreated"

function buildEntryWithDate(userID, title, text, topics, created) {
    let entry = JSONBuilder.buildEntryWithCreated(title, text, topics, created)
    buildEntryHelper(userID, entry)
}

function buildEntry(userID, title, text, topics) {
    let entry = JSONBuilder.buildEntryWithCreated(title, text, topics)
    buildEntryHelper(userID, entry)
}

function buildEntryHelper(userID, entry) {
    url = BASE_URL+"/users/" + userID + "/entries"
    request(url, POST, entry, true)
}

function getEntry(userId){
    url = BASE_URL+ "/users/" + userId + "/entries/getEntry"
    request(url, GET, null, true)
}

function removeEntry(userId, entryID){
    url = BASE_URL+ "/users/" + userId + "/entries/" + entryID + "/remove"
    request(url, DELETE, null, false)
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
    url = BASE_URL+"/users/login?user=" + user + "&pwd=" + pwd
    request(url, GET, null, true)
}

function logout(user, pwd){
    url = BASE_URL+"/users/logout?user=" + user + "&pwd=" + pwd
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

function run(){
    //makeAccount("dpk14", "1234")

    //login("dpk14", "1234")
    //sleep(100)
    //getEntry(1)
    //buildEntryWithDate(1, "yeet", "OH YEET THAT DADDY", testTools.buildTestMap(), JSONBuilder.buildDate("2020", "01", "05", "00", "00", "00.000"))
    //logout("dpk14", "1234")
    removeEntry(1, 1);
}

run()

