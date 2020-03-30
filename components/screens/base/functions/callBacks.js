import {Journal} from "../../../structs/journal";
import ScreenNames from "../../../../navigation/ScreenNames";

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

export function _onLogin(response, params){
    let journal = new Journal(response["myEntries"], response["myEntryMap"], response["myTopics"], response["myUserID"])
    params.navigation.navigate(ScreenNames.WRITE_SCREEN, {journal : journal})
}

export function _onCreate(response, params){
    params.callBack(response);
}

