
import React, {Component} from "react";
import AppLoading from "expo/build/launch/AppLoadingNativeWrapper";
import {ENTRY_BOX_VERT_MARGIN, HEADER_STYLES} from "../../../../../utils/baseStyles";
import StyledBase from "../../../StyledBase";
import {StyledInputBox} from "../../../../../EntryBox/TextInputBox/StyledInputBox";
import {getScreenHeight, getScreenWidth, HEADER_HEIGHT} from "../../../../../utils/scaling";
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../../../../../utils/FontUtils";
import {View, Text} from 'react-native'
import {StyleSheet} from "react-native";
import {string} from 'prop-types'

const VERT_MARGIN = 30

export default class InfoScreen extends Component {

    static propTypes = {
        header : string.isRequired,
        text : string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {fontLoading : true}
    }

    async componentWillMount(){
        await FontUtils.loadFonts()
        this.setState({fontLoading : false})
    }

    render() {
        if (this.state.fontLoading) return <AppLoading/>
        let {header, text} = this.props
        return(
            <StyledBase>
                <View
                    style={{flex : 1, marginTop : HEADER_HEIGHT + VERT_MARGIN, marginBottom : VERT_MARGIN, marginHorizontal : VERT_MARGIN}}
                >
                    <Text style={style.headerFont}>
                        {header}
                    </Text>
                    <Text style={style.textFont}>
                        {text}
                    </Text>
                </View>
            </StyledBase>
        )
    }
}


const style = StyleSheet.create({
    headerFont : {
        fontSize: 30,
        color : '#FFFFFF',
        fontFamily : HP_SIMPLIFIED_BOLD
    },
    textFont : {
        fontSize: 20,
        color : '#FFFFFF',
        fontFamily : HP_SIMPLIFIED_BOLD
    }
})
