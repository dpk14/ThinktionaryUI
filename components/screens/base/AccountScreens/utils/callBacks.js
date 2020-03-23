import {Journal} from "../../../../structs/journal";
import ScreenNames from "../../../../../navigation/ScreenNames";

export function _onLogin(navigation){
    return (response, exceptionThrown) =>{
        if(exceptionThrown) {
            alert(response);
        }
        else{
            let journal = new Journal(response["myEntries"], response["myEntryMap"], response["myTopics"], response["myUserID"])
            navigation.navigate(ScreenNames.WRITE_SCREEN)
        }
    }
}
