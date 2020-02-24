//import * as JSONBuilder from 'src/JSONBuilder.js'
let JSONBuilder = require('./JSONBuilder')
let testTools = require('./testTools')
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
let BASE_URL = 'http://localhost:8090'
const DELETE = "DELETE"
const GET = "GET"
const PUT = "PUT"
const POST = "POST"

function getEntry(userId){
    var url = BASE_URL+ "/users/" + userId + "/entries/getEntry"
    request(url, GET, null, true)
}

function createEntryWithDate(userID, title, text, topics, created) {
    var entry = JSONBuilder.buildEntryWithCreated(title, text, topics, created)
    console.log(entry)
    createEntryHelper(entry, userID)
}

function createEntry(userID, title, text, topics) {
    var entry = JSONBuilder.buildEntry(title, text, topics)
    createEntryHelper(entry, userID)
}

function createEntryHelper(entry, userID){
    var url = BASE_URL+ "/users/" + userID + "/entries"
    request(url, POST, entry, true)
}

function makeAccount(user, pwd){
    var url = BASE_URL+"/users/?user=" + user + "&pwd=" + pwd
    request(url, PUT, null, false)
}

function login(user, pwd){
    var url = BASE_URL+"/users/login?user=" + user + "&pwd=" + pwd
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
//sleep(1000)
//login("dpk14", "1234")
    //getEntry(1)
 createEntryWithDate(1, "yeet", "oh yeet that shit", testTools.buildTestMap(), JSONBuilder.buildDate("2020", "05", "05", "01", "00", "00.000"))

}

run()
