
import React, {Component} from "react";
import {ENTRY_BOX_VERT_MARGIN, HEADER_STYLES} from "../../../../utils/baseStyles";
import StyledBase from "../../StyledBase";
import {StyledInputBox} from "../../../../EntryBox/TextInputBox/StyledInputBox";
import {getScreenHeight, getScreenWidth, HEADER_HEIGHT} from "../../../../utils/scaling";
import FontUtils from "../../../../utils/FontUtils";
import LoadingScreen from "../../../LoadingScreen";

const TOP_MARGIN = 10;

export default class NotificationsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {active : false, loading : false, fontLoading : true}
    }

    async componentWillMount(){
        await FontUtils.loadFonts()
        this.setState({fontLoading : false})
    }

    render() {
        if (this.state.fontLoading) return <LoadingScreen/>
        let {active} = this.state
        return(
            <StyledBase>
                <StyledInputBox
                    attrName=''
                    title= {active ? 'Check out your feed: ' : 'You have no notifications'}
                    value={''}
                    updateMasterState={this._updateMasterState}
                    scale = {.8}
                    style={{width : getScreenWidth() - 30,
                            height : getScreenHeight() - (ENTRY_BOX_VERT_MARGIN*2)-HEADER_HEIGHT-TOP_MARGIN,
                            marginTop : HEADER_HEIGHT + TOP_MARGIN}}
                    active={active}
                    editable={false}
                />
            </StyledBase>
        )
    }
}
