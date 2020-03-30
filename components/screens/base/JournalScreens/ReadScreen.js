import Screen from "../Screen";

export default class ReadScreen extends Screen {

    constructor(props) {
        super(props);
        this.state.journal = props.route.params.journal
        this.state.title = ''
        this.state.text = ''
        this.state.date = ''
        this.state.topics = ''
        this.state.topicBank = ''
    }
}
