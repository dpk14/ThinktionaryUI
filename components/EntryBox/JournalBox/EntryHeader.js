import React, { Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
import {PURPLE} from "../../utils/baseStyles";
import {string, func, object, number, bool, PropTypes} from 'prop-types';
import CustomButton from "../../CustomButton";
import ScreenNames from "../../../navigation/ScreenNames"
import {_scale} from "../../utils/scaling";

export default class EntryHeader extends Component{

    static propTypes = {
        title : string.isRequired,
        created : string.isRequired,
        modified : string.isRequired,
        navigation : object.isRequired,
        entry : object.isRequired,
        journal : object.isRequired,
        width : number,
        height : number,
        scale : number,
    }

    static defaultProps = {
        width : 150,
        height : 30,
        scale : 1,
    }

    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading: false})
    }

    _outerDimensions = () => {
        let {width, height, scale} = this.props
        return {
            width : _scale(width, scale),
            height : _scale(height, scale)
        }
    }

    _onPress = () => {
        let {navigation, journal, entry} = this.props
        navigation.navigate(ScreenNames.WRITE_SCREEN, {journal : journal, entry : entry})
    }

    render() {
        let {scale, title, created, modified} = this.props
        return (<View style = {[entryHeaderStyle.outerFrame, this._outerDimensions()]}>
                    <View style = {entryHeaderStyle.leftFrame}>
                        <Text style = {entryHeaderStyle.titleText}>
                            {title}
                        </Text>
                        <Text style = {entryHeaderStyle.dateText}>
                            {"Created on " + created}
                        </Text>
                        <Text style = {entryHeaderStyle.dateText}>
                            {"Last modified on " + modified}
                        </Text>
                    </View>
                    <View style = {entryHeaderStyle.rightFrame}>
                        <CustomButton
                            text="Edit"
                            scale={_scale(.5, scale)}
                            alignItems="flex-start"
                            onPress={this._onPress}
                        />
                    </View>
                </View>
        )
    }

}

const entryHeaderStyle = StyleSheet.create({
    outerFrame: {
        flex : 1,
        flexDirection : 'row',
        backgroundColor: PURPLE
    },
    leftFrame: {
        flex : 1,
        width : '80%',
        justifyContent: 'space-between'
    },
    rightFrame: {
        flex : 1,
        width : '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText:{
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontSize: 15,
        color: 'white',
    },
    dateText:{
        fontFamily: HP_SIMPLIFIED,
        fontSize: 12,
        color: 'white',
    },
})
