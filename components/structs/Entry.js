export class Entry{
    constructor(title, text, topics, entryID, created, modified) {
        this.text = text
        this.title = title
        this.topics = topics
        this.entryID = entryID
        this.created = created
        this.modified = modified
    }
}
