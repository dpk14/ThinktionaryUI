import React, {Component} from "react";
import InfoScreen from "./InfoScreen";
import {HP_SIMPLIFIED_BOLD} from "../../../../../utils/FontUtils";
import {StyleSheet, View, Text} from 'react-native';

export default class HelpScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let text = <View>
                        <Text style={faqStyles.headerText}>How do I save my work?</Text>
                        <Text style={faqStyles.answerText}>{"\n"}You don't! As soon as you start writing an entry, it'll be added to the front of your journal.{"\n"}</Text>

                        <Text style={faqStyles.headerText}>I moved from writing to reading and then back, and my work disappeared!</Text>
                        <Text style={faqStyles.answerText}>{"\n"}As it should!
                            Whenever you move away from the writing screen, your work is saved at the front of your journal, and the writing screen is reset so you can make a new
                            entry. If you want to keep working on that entry, just pull it up in the journal and hit the pencil button.</Text>

                        <Text style={faqStyles.headerText}>How do I remove a tag from an entry I'm writing?</Text>
                        <Text style={faqStyles.answerText}>{"\n"}Go to the "What tags do you want to use?" section on the write screen,
                            then tap the unwanted tag once and it will disappear.{"\n"}</Text>

                        <Text style={faqStyles.headerText}>I just looked up a tag and no entries are showing up! What should I do?</Text>
                        <Text style={faqStyles.answerText}>{"\n"}First of all, don't panic! Make sure that tag is the only one you've selected, and make sure you've cleared the searchbar.
                            If this doesn't work, navigate away from the journal screen and back, then try again.{"\n"}</Text>

                        <Text style={faqStyles.headerText}>I have a question that isn't answered in this FAQ. Where should I go for help?</Text>
                        <Text style={faqStyles.answerText}>{"\n"}If you have any additional questions, reach out to thinktionary.app@gmail.com and we'll get back to you as soon as possible.{"\n"}</Text>
                    </View>
        let newProps = {...this.props, ...{header : "Frequently Asked Questions", text : text}}
        return(
            <InfoScreen {...newProps}/>
        )
    }
}

const faqStyles = StyleSheet.create({
    headerText : {
        fontSize : 20,
        opacity : .9,
        color: "#FFFFFF",
        fontWeight : "bold",
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: {height: 4},
        shadowRadius: 4,
        shadowOpacity: .3
    },
    answerText : {
        fontSize : 15,
        opacity : .65,
        color: "#FFFFFF",
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: {height: 4},
        shadowRadius: 4,
        shadowOpacity: .3
    }

});
