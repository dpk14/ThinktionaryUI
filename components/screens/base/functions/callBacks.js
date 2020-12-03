import ScreenNames from "../../../../navigation/ScreenNames";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";
import {AsyncStorage} from "react-native"
import {JOURNAL_KEY, PWD, SAVING, USER_KEY} from "../../../../assets/config";
import BuildEntry from "../../../../requestHandler/Requests/JournalCommands/BuildEntry";
import ModifyEntry from "../../../../requestHandler/Requests/JournalCommands/ModifyEntry";

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

export function _onLogin(navigation, username, password) {
    return async (journal) => {
        try {
            await AsyncStorage.setItem(USER_KEY, username)
            await AsyncStorage.setItem(PWD, password)
        }
        catch (e) {
            alert ("Async error: could not log username and password")
            console.error(e)
        }
        navigation.reset({
            index: 0,
            routes: [{ name: ScreenNames.APP_NAVIGATION } ]
        })
        navigation.navigate(ScreenNames.APP_NAVIGATION)
    }
}

export function _onLogout(navigation){
    return async ()=>{
        navigation.navigate(ScreenNames.HOME_SCREEN)
        try {
            await AsyncStorage.removeItem(USER_KEY)
            await AsyncStorage.removeItem(PWD)
        }
        catch(e){
            alert("Async error: could not remove username and password")
            console.error(e)
        }
    }
}

export async function loginAndInitialize(callBack){
    try {
        let username = await AsyncStorage.getItem(USER_KEY)
        let pwd = await AsyncStorage.getItem(PWD)
        if (username == null || pwd == null) alert("error loading async user info")
        new Login(username, pwd).
        fetchAndExecute((journal) => callBack(journal))
    }
    catch(e) {
        alert("Could not retrieve user data")
        console.warn(e)
    }
}

export function _onSubmit(navigation) {
    return (journal) => {
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

export let createOrSave = (state, setEntryID, onSave=()=>{}) => {
    const {title, text, topics} = state
    state.entryID == undefined ?
        new BuildEntry(state.journal.userID, title=='' ? "Untitled" : title, text, topics, undefined).
        fetchAndExecute([_onCreate(setEntryID), onSave]) :
        save(state, onSave)
}

export function save(state, onSave=()=>{}) {
    AsyncStorage.setItem(SAVING, "true").then(() => {
    const {title, text, date, topics} = state
    new ModifyEntry(state.journal.userID, state.entryID, title=='' ? "Untitled" : title, text, topics).
    fetchAndExecute(onSave())})
}

export async function declareSaving(saving) {
    await AsyncStorage.setItem(SAVING, saving.toString())
}

export async function saving() {
    let saving = await AsyncStorage.getItem(SAVING).toString()
    return !saving ? false : saving === "true"
}
