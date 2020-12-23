import React, { Component } from 'react';
import {Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, KeyboardAvoidingView, View} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {ORANGE, PURPLE} from "../../utils/baseStyles";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import RichToolbar from "react-native-pell-rich-editor/src/RichToolbar";
import {childrenWithProps} from "../../utils/general";
import {useKeyboard} from "react-native-keyboard-height";

import {Animated} from 'react-native';

export default class StyledBase extends Component{

    constructor(props) {
        super(props);
        this.paddingInput = new Animated.Value(0);
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.timing(this.paddingInput, {
            duration: event.duration,
            toValue: event.endCoordinates.height,
        }).start();
    };

    keyboardWillHide = (event) => {
        Animated.timing(this.paddingInput, {
            duration: event.duration,
            toValue: 0,
        }).start();
    };

    render() {
        let RTBar = () => {
            if (!this.props.richTextEditor) {
                return <View></View>
            } else {
                return (
                    <Animated.View style={{ marginBottom: this.paddingInput }}>
                    <RichToolbar
                        getEditor={() => this.props.richTextEditor}
                        //unselectedButtonStyle={{backgroundColor: 'white'}}
                        disabledButtonStyle={{backgroundColor: 'white'}}
                        iconTint={{backgroundColor: 'white'}}
                    />
                    </Animated.View>)
                }
            }
        const childrenWithLayout = //this.props.alwaysActive ? this.props.children :
            childrenWithProps(this.props.children, {
                updateRichTextEditor: this.updateRichTextEditor,
            });
        return (
            <KeyboardAvoidingView
                style = {{flex:1}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{flexGrow : 1}}
                keyboardShouldPersistTaps = {'handled'}
            >
                <KeyboardAwareScrollView
                    style = {{flex:1}}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle = {{flexGrow : 1}}
                    keyboardShouldPersistTaps = {'handled'}
                >
                <TouchableWithoutFeedback style = {{flex : 1}}
                                          onPress={Keyboard.dismiss} accessible={false}>
                    <LinearGradient colors={[PURPLE, ORANGE]} end={[1, 0]}
                                    start={[0, 1]} style={styles.linearGradient}>

                        <View style = {styles.container}>
                            {childrenWithLayout}
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
                <RTBar/>
            </KeyboardAvoidingView>
        );
    }
}

export const styles = StyleSheet.create({
    linearGradient :{
        flex : 1,
        flexDirection: 'column',
        marginTop : -200,
        marginBottom : -200,
        alignItems : 'center',
    },
    container: {
        flex: 1,
        marginVertical : 200,
        alignItems : 'center',
        justifyContent : 'center'
    },
});
