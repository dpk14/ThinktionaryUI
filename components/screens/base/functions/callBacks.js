import {Journal} from "../../../structs/journal";
import ScreenNames from "../../../../navigation/ScreenNames";

export function parseOrAlert(parser, navigation) {
    return (response, exceptionThrown) =>{
        if(exceptionThrown) {
            alert(response);
        }
        else{
                parser(navigation, response)
            }
    }
}

export function _onLogin(navigation, response){
            let journal = new Journal(response["myEntries"], response["myEntryMap"], response["myTopics"], response["myUserID"])
            navigation.navigate(ScreenNames.WRITE_SCREEN, {journal : journal})
}
