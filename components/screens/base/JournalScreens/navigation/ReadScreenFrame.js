import React, {Component} from "react";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreen from "../ReadScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES, PURPLE} from "../../../../utils/baseStyles";
import {WriteBackButton} from "../../../../Buttons/HeaderButtons/Buttons/WriteBackButton";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import LinearGradient from "expo-linear-gradient/build/LinearGradient";
import {_scale, HEADER_HEIGHT} from "../../../../utils/scaling";
import {View} from "react-native";
import EntryHeader from "../../../../EntryBox/JournalBox/EntryHeader";
import {lessThan} from "react-native-reanimated";
import EntryBox from "../../../../EntryBox/EntryBox";

export default class ReadScreenFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Stack = createStackNavigator()

        return (<Stack.Navigator screenOptions={({navigation, route}) => {
                                            let entryHeader = !route || !route.params ? undefined : route.params.entryHeader
                                            let loading = !entryHeader || !entryHeader.currentEntry
                                            let emptyEntry = entryHeader && !entryHeader.currentEntry
                                            let EntryHeaderOrNull = (loading || emptyEntry) ?
                                                <View/>
                                                :
                                                <EntryHeader
                                                    title = {entryHeader.currentEntry.title}
                                                    created = {entryHeader.currentEntry.created}
                                                    modified = {entryHeader.currentEntry.modified}
                                                    navigation = {navigation}
                                                    entry = {entryHeader.currentEntry}
                                                    journal = {entryHeader.journal}
                                                    width = '100%'
                                                    scale = {_scale(entryHeader.scale, entryHeader.journalScale)}
                                                    onEntryRemoval = {entryHeader.onEntryRemoval}
                                                />

                                                return ({...HEADER_STYLES,
                                                ...{headerLeft : () => loading ? <View/> : <WriteBackButton navigation={navigation}/>,
                                                    headerRight : () => loading ? <View/> :<OptionButton position={'right'}
                                                                                      navigation={navigation}
                                                                        />,
                                                    headerBackground: () => {return loading ? <View/> : <LinearGradient colors={['rgba(127, 63, 191, 1)', 'rgba(127, 63, 191, .6)']} end={[0, 1, 1]}
                                                                                                      start={[1, 0, 0]} style={{height : HEADER_HEIGHT + EntryHeader.calculateEntryHeaderHeight()}}>
                                                        <View style = {{height:HEADER_HEIGHT}}/>

                                                            {EntryHeaderOrNull}
                                                     </LinearGradient>
                                                        },
                                                    //headerBackground : ()=> {return <LinearGradient colors={['rgba(127, 63, 191, 1)', 'rgba(127, 63, 191, 0)']} end={[0, 1, 1]}
                                                    //                                                start={[1, 0, 0]} style={{height : HEADER_HEIGHT}}/>},
                                                    headerTransparent : true,}})}}>
            <Stack.Screen
                name={ScreenNames.READ_SCREEN}
                component={ReadScreen}
            />
        </Stack.Navigator>)
    }
}
