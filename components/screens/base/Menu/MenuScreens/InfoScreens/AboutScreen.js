import React, {Component} from "react";
import InfoScreen from "./InfoScreen";

export default class AboutScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let newProps = {...this.props, ...{header : "About", text : ""}}
        return(
            <InfoScreen {...newProps}/>
        )
    }
}
