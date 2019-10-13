import React from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    Text,
    TouchableHighlight
} from "react-native";
import * as colors from "../../styles/constants";

const styles = StyleSheet.create({
    homeButton: {
        width: "50%",
        aspectRatio: 1,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: colors.backgroundDark
    },
    buttonImage: { width: "100%", height: "100%" },
    homeButtonText: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#FA774EAA",
        width: "100%",
        padding: 2,
        color: "#FFF",
        fontSize: 20,
        textAlign: "center"
    }
});

type PropsType = {
    label: string,
    onPress: any => void,
    backgroundImage: any,
    id?: string
};

export const HomeButton = ({ label, backgroundImage, onPress, id }: PropsType) => (
    <TouchableHighlight
        id={ id }
        style={ styles.homeButton }
        onPress={ onPress }
    >
        <View style={ { height: "100%", width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: "#000" } }>
            <ImageBackground
                style={ styles.buttonImage }
                source={ backgroundImage }
            >
                <Text style={ styles.homeButtonText }>{label}</Text>
            </ImageBackground>
        </View>
    </TouchableHighlight>
);