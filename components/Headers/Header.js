import React, { Component } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {HEADER_HEIGHT} from "../utils/scaling";
import BackButtonImg from "../Buttons/HeaderButtons/Images/BackButtonImg";
import {HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";

export class Header extends Component{

    static propTypes = {
        leftButton : object,
        rightButton : object,
    }

    static defaultProps = {
        leftButton : () => {},
        rightButton : () => {}
    }

    constructor(props) {
        super(props);
    }

    render() {
        let {leftButton, rightButton} = this.props
        return (<View style = {{height : HEADER_HEIGHT, flexDirection : 'row', flex : 1, justifyContent : 'space-between'}}>
            <View style = {{flex : 1, flexDirection : 'row'}}>
                  {leftButton}
            </View>
            <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'center'}}>
                <Text style = {{
                        color: '#FFFFFF',
                        fontFamily: HP_SIMPLIFIED_BOLD,
                        shadowOffset: {height: 4},
                        shadowRadius: 20,
                        fontWeight: 'bold',
                        shadowOpacity: .5}}>
                    {"Thinktionary"}
                </Text>
            </View>
            <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'flex-end'}}>
                  {rightButton}
            </View>
        </View>)
    }


}
