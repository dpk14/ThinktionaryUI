import React, { Component } from 'react';
import AccountScreenCore from "./AccountScreenCore";
import Login from "../../requestHandler/Requests/AccountRequests/Login";
import {Field, FieldMap} from "../structs/field";
import AccountScreen from "./AccountScreen";


export default class LoginScreenEfficient extends AccountScreen {

    constructor() {

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

        super(fieldsMap, buttonName, buttonFunc, callBack);
    }

}
