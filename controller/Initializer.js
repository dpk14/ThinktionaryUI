import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'

import { goToAuth, goHome } from './navigation'

import { USER_KEY } from './config'
import {HP_SIMPLIFIED_BOLD} from "../components/utils/FontUtils";


let screenOptions={
    headerTitle : "Thinktionary",
        headerBackTitle: false,
        headerTransparent: true,
        gestureResponseDistance : {horizontal : 600 },
    headerTitleStyle: {
        color : '#FFFFFF',
            fontFamily: HP_SIMPLIFIED_BOLD,
            shadowOffset: { height: 4},
        shadowRadius: 20,
            shadowOpacity: .5
    },
}

export default class Initialising extends React.Component {

    async componentDidMount() {
        let {navigation} = this.props
        try {
            const user = await AsyncStorage.getItem(USER_KEY)
            if (user) {
                navigation.navigate(screenNames.APP_NAVIGATION)
            } else {
                navigation.navigate(screenNames.AUTH_NAVIGATION)
            }
        } catch (err) {
            goToAuth()
        }
    }

    goHome(){
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Loading</Text>
            </View>
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
