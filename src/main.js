var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
let BASE_URL_STUDENTS = 'http://localhost:8090/students'
let BASE_URL_GREETINGS = 'http://localhost:8090/greeting'

function read(id) {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('GET', BASE_URL_STUDENTS + '/' + id)
    // send the request
    xhr.send()
}

function create(id) {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()
    const json = { "id": id}
    console.log(id)
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('POST', BASE_URL_STUDENTS + "/")
    // send the request
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(json))
}

function update(pastId, newId) {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()
    const json = { "id": newId}

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('PUT', BASE_URL_STUDENTS + '/' + pastId)
    // send the request
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(json))
}

function remove(id) {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('DELETE', BASE_URL_STUDENTS + '/' + id)
    // send the request
    xhr.send()
}

function greet(user) {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    let url = BASE_URL_GREETINGS + '?name=' + user
    console.log(url)
    xhr.open('GET', url)
    // send the request
    xhr.send()
}

function greet2(user) {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    console.log(BASE_URL_STUDENTS + '?name=' + user)
    xhr.open('GET', BASE_URL_STUDENTS + '?name=' + user)
    // send the request
    xhr.send()
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

//greet("user")
//greet2("user")
create(1)
create(2)
create(3)
create(4)

//read(2)

update(1, 3)
read(1)
