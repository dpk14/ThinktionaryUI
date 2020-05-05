import {Journal} from "../../../structs/Journal";
import ScreenNames from "../../../../navigation/ScreenNames";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";
import {AsyncStorage} from "react-native"
import {JOURNAL_KEY, PWD, USER_KEY} from "../../../../assets/config";

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
    return async (journal) => {
        try {
            await AsyncStorage.setItem(USER_KEY, journal.username)
            await AsyncStorage.setItem(PWD, journal.password)
        }
        catch(e){
            alert("Async error: could not log username and password")
            console.error(e)
        }
        navigation.reset({
            index: 0,
            routes: [{ name: ScreenNames.APP_NAVIGATION } ]
        })
        navigation.navigate(ScreenNames.APP_NAVIGATION)
    }
}

export async function loginAndInitialize(callBack){
    try {
        let username = await AsyncStorage.getItem(USER_KEY)
        let pwd = await AsyncStorage.getItem(PWD)
        if(username == null || pwd == null) alert("error loading async user info")
        new Login(username, pwd).
        fetchAndExecute((journal) => callBack(journal))
    }
    catch(e){
        alert("Could not retrieve user data")
        console.warn(e)
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
    let {username, password} = props.journal
    new Login(username, password).
    fetchAndExecute(
        [(journal) => props.navigation.setParams({
            journal : journal
        }), initializer]
    )
}
