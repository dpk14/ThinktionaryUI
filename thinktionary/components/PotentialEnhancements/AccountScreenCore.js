import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "../EntryBox";
import CustomButton from "../CustomButton";
import {func, object, string} from "prop-types";
import {Field, FieldMap} from "../structs/field";
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";

export default class AccountScreenCore extends Component {

    static propTypes = {
        fields: object.isRequired,
        buttonRequest : object.isRequired,
        updateMasterComponent : func.isRequired,
        buttonName : string.isRequired,
        callBack : func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
        };

    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName] : value });
        let arr = [];
        for (let [attrName, field] of this.props.fields.entries()){
            arr.push(new Field(attrName, field.title, field.value))
        }
        let fields = new FieldMap(arr);
        fields.getEntry(attrName).value = value;
        this.props.updateMasterComponent(fields);
    }

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            let arr = []
            for(let [attrName, field] of this.props.fields.entries()){
                arr.push({
                    attrName : attrName,
                    title : field.title,
                    value : field.value,
                })
            }
            const Entries = arr.map(field => (
                <EntryBox
                attrName = {field.attrName}
                title = {field.title}
                value = {field.value}
                updateMasterState = {this._updateMasterState}
            />)
            );

            return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                        start={[0, 1]} style={styles.linearGradient}>
                            <Text style={styles.title}>Thinktionary</Text>
                            {Entries}
                            <CustomButton
                                text={this.props.buttonName}
                                onPress={() => {
                                    this.props.buttonRequest.fetchAndExecute(this.props.callBack)
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
