import React, {Component} from "react";

export default class Wrapper extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return this.props.component
    }

}
