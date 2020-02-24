function buildTestMap(){
    let map = []
    let topic1 = {}
    topic1["myColor"] = "yeet"
    topic1["myTopic"] = "hoe"
    let topic2 = {}
    topic2["myColor"] = "yeet1"
    topic2["myTopic"] = "hoe2"
    map.push(topic1)
    map.push(topic2)
    return map
}

module.exports = {buildTestMap}
