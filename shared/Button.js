import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";
import PropTypes from "prop-types";


export default function FlatButton({title, onPress}){
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style ={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
    
}

const styles = StyleSheet.create({
    button: {
        borderRadius:      10,
        paddingVertical:   15,
        paddingHorizontal: 10,
        backgroundColor:   "#d9595d"
    },
    buttonText: {
        color:         "white",
        fontWeight:    "bold",
        textTransform: "uppercase",
        fontSize:      15,
        textAlign:     "center"
    }
});


FlatButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    title:   PropTypes.string.isRequired,
};