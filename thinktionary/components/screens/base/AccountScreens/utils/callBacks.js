import {Journal} from "../../../../structs/journal";
import ScreenNames from "../../../../../navigation/ScreenNames";

export function _onLogin(props){
    return (response, exceptionThrown) =>{
        if(exceptionThrown) {
            alert(response);
        }
        else{
            let journal = new Journal(response["myEntries"], response["myEntryMap"], response["myTopics"], response["myUserID"])
            this.props.navigation.navigate(ScreenNames.WRITE_SCREEN)
        }
    }
}
