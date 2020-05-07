import {object, string} from "prop-types"
import React, {Component} from "react"
import {Image, TouchableOpacity, View} from "react-native";
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
                marginLeft : 10,
                shadowRadius: 5,
                shadowOpacity: .2
        }
        if (position == 'right') {
            style.marginLeft = 0
            style.marginRight = 10
        }
        return(
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}
                              style={{flex : 1}}>
                <Image
                    style={style}
                    source={require("../../../../assets/images/options.png")}/>
            </TouchableOpacity>
        )

    }

}
