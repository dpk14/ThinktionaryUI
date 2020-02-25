function buildTestTopics(){
    let topics = []
    let topic1 = {}
    topic1["myColor"] = "yeet"
    topic1["myTopic"] = "hoe"
    let topic2 = {}
    topic2["myColor"] = "yeet1"
    topic2["myTopic"] = "hoe2"
    topics.push(topic1)
    topics.push(topic2)
    return topics
}

module.exports = {buildTestTopics}
