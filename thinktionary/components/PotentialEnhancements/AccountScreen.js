import React, { Component } from 'react';
import {AppLoading} from 'expo';
import AccountScreenCore from "./AccountScreenCore";

export default class LoginScreenEfficient extends Component {

    constructor(fieldMap, buttonName, buttonRequest, callBack) {
        super([]);

        this.state = {
            fields : fieldMap,
            buttonName : buttonName,
            buttonRequest : buttonRequest,
            callBack : callBack,
        };
    }

    _updateMasterComponent = (fields) => {
        this.setState({fields : fields})
    }

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            return (
                <AccountScreenCore
                    fields = {this.state.fields}
                    buttonName=  {this.state.buttonName}
                    buttonRequest = {this.state.buttonRequest}
                    updateMasterComponent = {this._updateMasterComponent}
                    callBack={this.state.callBack}
                />
            );
        }
    }
}
