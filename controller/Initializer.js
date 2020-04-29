import React from 'react'
import ScreenNames from '../navigation/ScreenNames'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'

import FontUtils, {HP_SIMPLIFIED_BOLD} from "../components/utils/FontUtils";
import {USER_KEY} from "../assets/config";

export default class Initializer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
    }

    async componentDidMount() {
        await FontUtils.loadFonts()
        this.setState({loading : false})
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
        this.props.navigation.navigate(ScreenNames.APP_NAVIGATION)
    }

    goToAuth(){
        this.props.navigation.navigate(ScreenNames.AUTH_NAVIGATION)
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
