import React, {Component} from "react";
import InfoScreen from "./InfoScreen";
import {StyleSheet, Text, View} from "react-native";
import {HP_SIMPLIFIED_BOLD} from "../../../../../utils/FontUtils";

export default class AboutScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let text = <View>
            <Text style ={aboutStyles.normText}>Welcome to Thinktionary, the dictionary for your thoughts!{"\n"}</Text>
            <Text style ={aboutStyles.normText}>Traditional journaling mediums –from paper to note apps– may provide an efficient means for storing
                your thoughts, but not one for recalling them.{"\n"}</Text>
            <Text style ={aboutStyles.normText}>Once you write something, you have to sift through folders, or remember when you wrote it—or some words it
                might have contained— in order to find it again. Sometimes, you don’t even remember you wrote something,
                leaving it effectively lost unless you read through everything you’ve written.{"\n"}</Text>
            <Text style ={aboutStyles.normText}>But when you make an entry in your Thinktionary, just add some quick tags to summarize it.
                Then, you can look up those tags again, revisiting the experience of a combination of emotions, places,
                people, or ideas through time, observing how your approaches or attitudes toward it have evolved.{"\n"}</Text>
                <Text style ={aboutStyles.normText}>With Thinktionary, you can create a free, chronological database for your:{"\n"}</Text>
                <Text style={aboutStyles.boldText}>Emotions:</Text>
            <Text style ={aboutStyles.normText}>Instead of thinking in circles and dealing with the same problems again and again,
                you can recall how you dealt with an emotion over time, rediscovering and building off past insights.
                You can create an evolving mental rule book of tactics for dealing with a combination of emotions, or a place or person.{"\n"} </Text>
            <Text style={aboutStyles.boldText}>Memories:</Text>
            <Text style ={aboutStyles.normText}>You can tag an entry with people, places, and things, then recall your emotional journey with them, at that
                place, during that time.{"\n"}</Text>
            <Text style={aboutStyles.boldText}>Notes:</Text>
            <Text style ={aboutStyles.normText}>You can record chunks of information, from lecture or meeting notes to
                shopping lists, then easily rediscover them.{"\n"}</Text>
            <Text style={aboutStyles.boldText}>Ideas:</Text>
            <Text style ={aboutStyles.normText}>Sometimes, you’ll think of random, useful bits of information throughout the day. Writing and tagging
                those thoughts in Thinktionary can help link your scattered, related thoughts through time.</Text>
            </View>
            let newProps = {...this.props, ...{header: "About", text: text}}
        return (
            <InfoScreen {...newProps}/>
        )
    }
}

const aboutStyles = StyleSheet.create({
    boldText : {
        fontSize : 16,
        opacity : .9,
        color: "#FFFFFF",
        fontWeight : "bold",
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: {height: 4},
        shadowRadius: 4,
        shadowOpacity: .3
    },
    normText : {
        fontSize : 16,
        opacity : .65,
        color: "#FFFFFF",
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: {height: 4},
        shadowRadius: 4,
        shadowOpacity: .3
    }
})

