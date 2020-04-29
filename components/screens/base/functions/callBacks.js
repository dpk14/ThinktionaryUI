import {Journal} from "../../../structs/Journal";
import ScreenNames from "../../../../navigation/ScreenNames";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";
import {AsyncStorage} from "react-native";
import {JOURNAL_KEY, USER_KEY} from "../../../../assets/config";
import {NavigationActions} from "react-navigation";
import JSONParser from "../../../../requestHandler/Utils/JSONParser";

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
    return (journal) => {
        navigation.reset({
            index: 0,
            routes: [{ name: ScreenNames.WRITE_SCREEN, params : {journal : journal}} ]
        })
        navigation.navigate(ScreenNames.WRITE_SCREEN, {journal : journal})
        //navigation.navigate(ScreenNames.APP_NAVIGATION, {screen : ScreenNames.WRITE_SCREEN, params: {journal : journal}})
        //AsyncStorage.setItem(USER_KEY, journal.username)
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

