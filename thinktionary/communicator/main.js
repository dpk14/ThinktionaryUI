import XMLHttpRequest from "react-native"
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

//Account commands

function makeAccount(user, pwd){
    let url = BASE_URL+"/users/?user=" + user + "&pwd=" + pwd
    let response = request(url, PUT, null, false)
    console.log(response);
    return response;
}

export function login(user, pwd){
    let url = BASE_URL+"/users/login?user=" + user + "&pwd=" + pwd
    let response = request(url, GET, null, true)
    console.log(response);
    return response;
}

function logout(user, pwd){
    let url = BASE_URL+"/users/logout?user=" + user + "&pwd=" + pwd
    request(url, GET, null, true)
}

//Journal actions

function buildEntry(userID, title, text, topics, created=null) {
    let entry = {}
    if(created == null){
        entry = JSONBuilder.buildEntryWithCreated(title, text, topics)
    }
    else{
        entry = JSONBuilder.buildEntryWithCreated(title, text, topics, created)
    }
    let url = BASE_URL+"/users/" + userID + "/entries"
    request(url, POST, entry, true)
}

/*
function buildEntry(userID, title, text, topics) {
    let entry = JSONBuilder.buildEntryWithCreated(title, text, topics)
    buildEntryHelper(userID, entry)
}
*/

function modifyEntry(userID, entryID, title, text, topics, created) {
    let entry = {}
    if(created == null){
        entry = JSONBuilder.buildEntryWithCreated(title, text, topics)
    }
    else{
        entry = JSONBuilder.buildEntryWithCreated(title, text, topics, created)
    }
    let url = BASE_URL+"/users/" + userID + "/entries/" + entryID
    request(url, PUT, entry, true)
}

function removeEntry(userId, entryID){
    let url = BASE_URL+ "/users/" + userId + "/entries/" + entryID + "/remove"
    request(url, DELETE, null, false)
}

function removeTopic(userId, topicName){
    let url = BASE_URL+ "/users/" + userId + "/topics/remove/?name=" + topicName
    request(url, DELETE, null, false)
}


//Journal queries:

function getByTopic(userID, topics){
    let url = BASE_URL+"/users/" + userID + "/entries/get"
    request(url, POST, topics, true)
}

function getRandom(userID, topics){
    let url = BASE_URL+ "/users/" + userID + "/entries/getRand"
    request(url, POST, topics, true)
}

//test commands:

function getEntry(userId){
    let url = BASE_URL+ "/users/" + userId + "/entries/getEntry"
    request(url, GET, null, true)
}

//helpers:

function buildEntryHelper(userID, entry) {
    let url = BASE_URL+"/users/" + userID + "/entries"
    request(url, POST, entry, true)
}

function requestXML(url, type, json, hasReturn){
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


function request(url, type, json, hasReturn) {
    return fetch(url, {
        method: type,
        headers: hasReturn ? {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        } : null,
        body: json==null ? null : JSON.stringify(json),
    }).then(function(response) {
        if (!response.ok) {
            return "ouch!";
        }
        return response;
    }).then(function(response) {
        console.log("ok");
    }).catch(function(error) {
        console.log("daddy");
        return "daddy";
    });;
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

    login("dpk14", "1234")
    //sleep(100)
    //getEntry(1)
    //buildEntry(1, "yeet", "OH YEET THAT DADDY", testTools.buildTestTopics(), JSONBuilder.buildDate("2020", "01", "05", "00", "00", "00.000"))
    //modifyEntry(1, 2, "yeet", "OH YEET THAT MAMI", testTools.buildTestTopics(), JSONBuilder.buildDate("2020", "01", "05", "00", "00", "00.000"))
    //logout("dpk14", "1234")
    //removeEntry(1, 1);
    //getByTopic(1, testTools.buildTestTopics())
    //getRandom(1, testTools.buildTestTopics())
    removeTopic(1, "hoe");
}

export default {makeAccount, login, logout, removeTopic, removeEntry, getRandom, getByTopic, getEntry, buildEntry, modifyEntry}

