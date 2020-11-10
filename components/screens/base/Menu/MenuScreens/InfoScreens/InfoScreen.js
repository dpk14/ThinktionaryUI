
import React, {Component} from "react";
import {ENTRY_BOX_VERT_MARGIN, HEADER_STYLES} from "../../../../../utils/baseStyles";
import StyledBase from "../../../StyledBase";
import {StyledInputBox} from "../../../../../EntryBox/TextInputBox/StyledInputBox";
import {getScreenHeight, getScreenWidth, HEADER_HEIGHT} from "../../../../../utils/scaling";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../../../../utils/FontUtils";
import {View, Text} from 'react-native'
import {StyleSheet} from "react-native";
import {string} from 'prop-types'
import LoadingScreen from "../../../../LoadingScreen";

const VERT_MARGIN = 20

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
        if (this.state.fontLoading) return <LoadingScreen/>
        let {header, text} = this.props
        return(
            <StyledBase>
                <View
                    style={{flex : 1, marginTop : HEADER_HEIGHT + VERT_MARGIN, marginBottom : VERT_MARGIN, marginHorizontal : VERT_MARGIN, alignItems: "center"}}
                >
                    <Text style={style.headerFont}>
                        {header}
                    </Text>
                    <Text></Text>
                    {text}
                </View>
            </StyledBase>
        )
    }
}


const style = StyleSheet.create({
    headerFont : {
        fontSize : 35,
        textAlign: 'center',
        opacity : .9,
        color: "#FFFFFF",
        fontWeight : "bold",
        alignItems : "center",
        justifyContent : "center",
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: {height: 4},
        shadowRadius: 4,
        shadowOpacity: .3
    },
    textFont : {
        fontSize: 20,
        color : '#FFFFFF',
        fontFamily : HP_SIMPLIFIED
    }
})
