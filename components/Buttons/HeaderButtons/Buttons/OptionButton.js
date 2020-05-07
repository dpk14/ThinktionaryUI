import {object, string} from "prop-types"
import React, {Component} from "react"
import {Image, TouchableOpacity, View} from "react-native";
import {STYLE_ELEMENT_ID} from "react-native-web/dist/exports/StyleSheet/constants";

const SIDE_MARGIN = 20

export default class OptionButton extends Component {

    static propTypes = {
        navigation : object.isRequired,
        position : string,
    }

    static defaultProps = {
        position : 'left',
    }

    constructor(props) {
        super(props);
    }

    render() {
        let {navigation, position} = this.props
        let style = {
                width : 20,
                height : 20,
                marginLeft : SIDE_MARGIN,
                shadowRadius: 5,
                shadowOpacity: .2
        }
        if (position == 'right') {
            style.marginLeft = 0
            style.marginRight = SIDE_MARGIN
        }
        return(
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}
                              style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
                <Image
                    style={style}
                    source={require("../../../../assets/images/options.png")}/>
            </TouchableOpacity>
        )

    }

}
