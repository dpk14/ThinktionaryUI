
import React, {Component} from "react";
import {View, Text, Alert, Image} from 'react-native'
import {StyleSheet} from "react-native";
import {string} from 'prop-types'
import {AsyncStorage} from "react-native";
import {loginAndInitialize} from "../../functions/callBacks";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../../../utils/FontUtils";
import CustomButton from "../../../../Buttons/CustomButton";
import StyledBase from "../../StyledBase";
import {StyledInputBox} from "../../../../EntryBox/TextInputBox/StyledTextInput/StyledInputBox";
import {getScreenWidth, HEADER_HEIGHT} from "../../../../utils/scaling";
import screenNames from "../../../../../navigation/ScreenNames";
import DeleteAccount from "../../../../../requestHandler/Requests/JournalCommands/DeleteAccount";
import {PWD, USER_KEY} from "../../../../../assets/config";
import Logout from "../../../../../requestHandler/Requests/AccountRequests/Logout";
import SendConfKey from "../../../../../requestHandler/Requests/AccountRequests/SendConfKey";
import LoadingScreen from "../../../LoadingScreen";
const VERT_MARGIN = 20

export default class AccountScreen extends Component {

    static propTypes = {
        header : string.isRequired,
        text : string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            fontLoading : true,
            loading : false,
            email :'',
            journal : undefined
        }
    }

    async componentWillMount(){
        await FontUtils.loadFonts()
        this.setState({fontLoading : false})
    }

    initialize(journal) {
        return {
            journal : journal,
            loading : false,
            email : journal.email
        }
    }

    async componentDidMount() {
        this._focusUnsubscribe = this.props.navigation.addListener('focus', () => {
            loginAndInitialize((journal) => this.setState(this.initialize(journal)))
        })
    }

    componentWillUnmount() {
        this._focusUnsubscribe()
    }

    validateInfo(email){
        let messages = []
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) messages.push ("Invalid email address");
        if (messages.length == 0) return true
        else {
            let message = ""
            messages.forEach((msg) => message+=msg + "\n")
            alert(message)
            return false
        }
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    async navigateAndDisable(toScreen, params) {
        this.setState({loading: true})
        this.props.navigation.navigate(toScreen, params)
    }

    render() {
        let {email, loading, fontLoading, journal} = this.state
        if (fontLoading) return <LoadingScreen/>
        let {header, text} = this.props
        return(
            <StyledBase>
                <View
                    style={{flex : 1, marginTop : HEADER_HEIGHT + VERT_MARGIN, marginBottom : VERT_MARGIN, marginHorizontal : VERT_MARGIN, alignItems: "center"}}
                >
                    <Text style={style.headerFont}>
                        Account Actions
                    </Text>
                    <View style = {style.buttonOuterLayout}
                    >
                        <StyledInputBox
                            attrName='email'
                            title='Email'
                            value={email}
                            updateMasterState={this._updateMasterState}
                            marginVertical={15}
                            style = {{width : 270, marginTop : 30}}
                            scale = {.8}
                        />
                        <CustomButton
                            text="Change Email"
                            disabled = {loading || !journal || (journal && email === journal.email)}
                            onPress={() => {
                                if (this.validateInfo(email)) {
                                    this.setState({loading : true})
                                    new SendConfKey(journal.username, email, false).fetchAndExecute(
                                        async () => {
                                            this.navigateAndDisable(screenNames.VERIFY_ACCT_SCREEN,
                                                {
                                                    username: journal.username,
                                                    password: await AsyncStorage.getItem(PWD),
                                                    email : email,
                                                    newAccount : false
                                                }
                                            )
                                        },
                                        ()=> this.setState({loading : false}))
                                }
                            }}
                            style= {{width : 270, marginTop : 10}}
                            scale={.8}
                        />
                        <CustomButton
                            text="Delete Account"
                            disabled = {this.state.loading}
                            onPress={async () => {
                                Alert.alert("Delete Account?",
                                    "This action will delete all of your information. Are you sure you want to proceed?",
                                    [
                                        {
                                            text: "Delete",
                                            onPress: async () => {
                                                this.setState({loading : true})
                                                new Logout(await AsyncStorage.getItem(USER_KEY), await AsyncStorage.getItem(PWD))
                                                    .fetchAndExecute(
                                                        () => {
                                                            this.props.navigation.navigate(screenNames.HOME_SCREEN);
                                                            new DeleteAccount(journal.userID).fetchAndExecute()
                                                        },
                                                        () => this.setState({loading: false}))
                                                }
                                        },
                                        {
                                            text: "Cancel"
                                        }
                                    ]
                                )
                                }
                            }
                            style= {{width : 270, marginTop : 40}}
                            scale = {.8}
                        />
                        <Image
                            style ={{aspectRatio : 1499/1151, marginTop : 30, width : getScreenWidth()*.4, height : undefined}}
                            resizeMode={'contain'}
                            source={require("../../../../../assets/images/thinkart2.png")}
                        />
                    </View>
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
    buttonOuterLayout: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom : 500
    },
    textFont : {
        fontSize: 20,
        color : '#FFFFFF',
        fontFamily : HP_SIMPLIFIED
    }
})
