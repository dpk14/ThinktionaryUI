import XMLHttpRequest from "react-native"
let JSONBuilder = require("./Utils/JSONBuilder")
let testTools = require("./Utils/testTools")
const BASE_URL = 'https://thinktionary-backend.herokuapp.com'
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

export async function login(user, pwd) {
    let url = BASE_URL + "/users/login?user=" + user + "&pwd=" + pwd
    return request(url, GET, null, true);

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
    return request(url, GET, null, true)
}

function requestXML(url, type, json, hasReturn){
    var request = new XMLHttpRequest()
    // get a callback when the server responds
    request.onreadystatechange = e => {
        if (request.readyState !== 4) {
            return 'could not connect';
        }

        if (request.status === 200) {
            return request;
            console.log('success', request.responseText);
        } else {
            console.warn('error');
        }
    };
    // open the request with the verb and the url
    request.open(type, url)
    if(hasReturn) request.setRequestHeader('Content-Type', 'application/json')
    // send the request
    if(json!=null) request.send(JSON.stringify(json))
    else request.send()
}

async function request(url, type, json, hasReturn){
    let init = { method: type};
    if (hasReturn) {
        init.headers = {
            'Content-Type': 'application/json',
        }
    }
    if(json != null) {
        init.body = JSON.stringify(json);
    }
    var method = function() {
        return fetch(url, init)
            .then(response => {checkStatus(response)})
            .then(checkedResponse => {
                checkedResponse.json()
            })
            .catch(e => {throw e})
    }
    var ans = await method();
    console.log(ans);
    return ans;
}
function checkStatus(response){
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.status = response.status
        error.response = response.json();
        throw error;
    }
};

function execute(){
    try {
        let response = this.request(this.url, this.type, this.json, this.hasReturn);
        return this.translate(response);
    }
    catch(error){
        return this.translateError(error);
    }
}

function translate(response){
    return response
}

function translateError(error){
    if(error.status == 404){
        throw error
    }
    return error.statusText
}


//helpers:

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

