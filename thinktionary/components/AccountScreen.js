import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "./EntryBox";
import CustomButton from "./CustomButton";
import {login} from "../requestHandler/main"
import {func, object, string} from "prop-types";
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class AccountScreen extends Component {

    static propTypes = {
        fields: object.isRequired,
        buttonFunc : func.isRequired,
        buttonName : string.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
        };

    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            let arr = [];
            for(let attrName in this.props.fields){
                let title = this.props[attrName].title;
                let value = this.props[attrName].value;
                const entry = <EntryBox
                    attrName = {attrName}
                    title = {title}
                    value = {value}
                    updateMasterState = {this._updateMasterState}
                />;
                arr.push(entry);
            }
            const Entries = arr.map((entry) =>
                <li>{entry}</li>
            );

            return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                        start={[0, 1]} style={styles.linearGradient}>
                            <Text style={styles.title}>Thinktionary</Text>
                            <Entries/>
                            <CustomButton
                                text={this.props.buttonName}
                                onPress={() => {
                                    alert(this.props.buttonFunc)
                                }}
                            />
                        </LinearGradient>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    linearGradient :{
        flex : 2,
        height : "100%",
        width : "100%",
        alignItems : 'center'
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 150,
        marginVertical: 30,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    },

});
