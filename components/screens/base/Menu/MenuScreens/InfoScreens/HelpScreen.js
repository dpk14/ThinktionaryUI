import React, {Component} from "react";
import InfoScreen from "./InfoScreen";

export default class HelpScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let newProps = {...this.props, ...{header : "Help", text : ""}}
        return(
            <InfoScreen {...newProps}/>
        )
    }
}
