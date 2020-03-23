import React, { Component } from 'react';
import {AppLoading} from 'expo';
import AccountScreenCore from "./AccountScreenCore";

export default class AccountScreen extends Component {

    constructor(header, fieldMap, buttonName, buttonRequest, callBack) {
        super([]);

        this.state = {
            header : header,
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
                    header = {this.state.header}
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
