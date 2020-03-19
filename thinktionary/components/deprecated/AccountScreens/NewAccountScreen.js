import React, { Component } from 'react';
import makeAccount from "../../../requestHandler/Requests/AccountRequests/makeAccount";
import {Field, FieldMap} from "../../structs/field";
import AccountScreen from "./super/AccountScreen";


export default class NewAccountScreen extends AccountScreen {

    constructor() {

        let header = "Thinktionary"
        let fieldsMap = new FieldMap([new Field('username', 'Username', ''),
            new Field('password', 'Password', '')]);

        let buttonName = 'Create Account';
        let buttonFunc =  new makeAccount((fieldsMap) => fieldsMap.getEntry('username').value, (fieldsMap) => fieldsMap.getEntry('password').value);
        let callBack = (response, exceptionThrown) => {
            if (exceptionThrown) {
                alert(response);
            } else {

            }
        }

        super(header, fieldsMap, buttonName, buttonFunc, callBack);
    }

}
