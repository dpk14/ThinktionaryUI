import React from 'react'
import ScreenNames from '../navigation/ScreenNames'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import {USER_KEY} from "../assets/config";
import LoadingScreen from "../components/screens/LoadingScreen";

export default class Initializer extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        try {
            const user = await AsyncStorage.getItem(USER_KEY)
            if (user) {
                this.goHome()
            } else {
                this.goToAuth()
            }
        } catch (err) {
            this.goToAuth()
        }
    }

    goHome(){
        //this.props.navigation.navigate(ScreenNames.HOME_SCREEN)
        this.props.navigation.navigate(ScreenNames.APP_NAVIGATION)
    }

    goToAuth(){
        this.props.navigation.navigate(ScreenNames.HOME_SCREEN)
    }

    render() {
        return (
            <LoadingScreen/>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
