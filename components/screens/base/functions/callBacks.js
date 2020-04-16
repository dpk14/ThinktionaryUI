import {Journal} from "../../../structs/Journal";
import ScreenNames from "../../../../navigation/ScreenNames";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";

export function parseOrAlert(parser=undefined, params) {
    return (response, exceptionThrown) =>{
        if(exceptionThrown) {
            alert(response);
        }
        else if(parser!=undefined){
                parser(response, params)
            }
    }
}

export function _onLogin(navigation) {
    return (journal) =>{
        navigation.navigate(ScreenNames.WRITE_SCREEN, {journal : journal})
    }
}

export function _onSubmit(navigation) {
    return (journal) =>{
        navigation.navigate(ScreenNames.READ_SCREEN, {journal : journal})
    }
}

export function _onCreate(setEntryID){
    return (entry) =>{
        setEntryID(entry.entryID)
    }
}

export function reloadJournalAndInitialize(props, initializer){
    let {username, password} = props.route.params.journal
    new Login(username, password).
    fetchAndExecute(
        [(journal) => props.navigation.setParams({
            journal : journal
        }), initializer]
    )
}

