import React, { Component } from 'react';
import Login from "../../../requestHandler/Requests/AccountRequests/Login";
import {Field, FieldMap} from "../../structs/field";
import AccountScreen from "./super/AccountScreen";


export default class LoginScreen extends AccountScreen {

    constructor() {

        let header = "Thinktionary"
        let fieldsMap = new FieldMap([new Field('username', 'Username', ''),
                new Field('password', 'Password', '')]);

        let buttonName = 'Login';
        let buttonFunc =  new Login(fieldsMap.getEntry('username').value, fieldsMap.getEntry('password').value);
        let callBack = (response, exceptionThrown) => {
            if (exceptionThrown) {
                alert(response);
            } else {

            }
        }

        super(header, fieldsMap, buttonName, buttonFunc, callBack);
    }

}
