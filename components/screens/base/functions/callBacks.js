import {Journal} from "../../../structs/Journal";
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

export function _onLogin(navigation) {
    return (journal) =>{
        navigation.navigate(ScreenNames.WRITE_SCREEN, {journal : journal})
    }
}

export function _onCreate(setEntryID){
    return (entry) =>{
        setEntryID(entry.id)
    }
}

