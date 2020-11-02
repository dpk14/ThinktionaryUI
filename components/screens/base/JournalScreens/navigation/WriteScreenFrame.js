import React, {Component} from "react";
import WriteScreen, {newStyles} from "../WriteScreen";
import ScreenNames from "../../../../../navigation/ScreenNames";
import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES, ORANGE, PURPLE} from "../../../../utils/baseStyles";
import {ReadFwdButton} from "../../../../Buttons/HeaderButtons/Buttons/ReadFwdButton";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import {styles} from "../../StyledBase";
import LinearGradient from "expo-linear-gradient/build/LinearGradient";
import {HEADER_HEIGHT} from "../../../../utils/scaling";

export default class WriteScreenFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Stack = createStackNavigator()
        return (<Stack.Navigator screenOptions={({navigation, route})=>{ return({...HEADER_STYLES,
            ...{
                headerTitle : (typeof(route.params)==='undefined' ?
                                    "Thinktionary" :
                                    route.params.saving ?
                                    "Saving..." :
                                    "Thinktionary "),
                headerRight : () => <ReadFwdButton navigation={navigation}/>,
                headerLeft : () => <OptionButton position={'left'}
                                                  navigation={navigation}
                />,
                headerBackground : ()=> {return <LinearGradient colors={['rgba(127, 63, 191, 1)', 'rgba(127, 63, 191, 0)']} end={[0, 1, 1]}
                                                         start={[1, 0, 0]} style={{height : HEADER_HEIGHT}}/>},
                headerTransparent : true,
        }})}}>
            <Stack.Screen
                name={ScreenNames.WRITE_SCREEN}
                component={WriteScreen}
            />
        </Stack.Navigator>)
    }
}
