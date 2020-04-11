import React, { Component } from 'react';
import {StyleSheet, Text} from "react-native";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
import {PURPLE} from "../../utils/baseStyles";
import {View} from "react-native-web";
import {string, func, object, number, bool, PropTypes} from 'prop-types';

class EntryHeader extends Component{

    static propTypes = {
        title : string.isRequired,
        date : string.isRequired,
        width : number,
        height : number,
        scale : number,
    }

    static defaultProps = {
        width : 150,
        height : 50,
        scale : 1,
    }

    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading: false})
    }

    render() {
        let {title, date} = this.props
        return (<View style = {entryHeaderStyle.outerFrame}>
                    <View style = {entryHeaderStyle.leftFrame}>
                        <Text style = {entryHeaderStyle.titleText}>
                            {title}
                        </Text>
                        <Text style = {entryHeaderStyle.dateText}>
                            {date}
                        </Text>
                    </View>
                    <View style = {entryHeaderStyle.rightFrame}>

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
        fontColor: 'white',
    },
    dateText:{
        fontFamily: HP_SIMPLIFIED,
        fontSize: 12,
        fontColor: 'white',
    },
})
