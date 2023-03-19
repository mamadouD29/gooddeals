import React from "react";
import {TextInput, StyleSheet} from "react-native";
import PropTypes from "prop-types";

export default function SearchBar({onChangeText}) {

    return (
      <TextInput onChangeText={onChangeText} 
      placeholder={"Search Deals..."}
      style= {styles.barContainer}
      multiline
    />  
    );
}


const styles = StyleSheet.create({
    barContainer: {
        borderWidth:     1,
        borderColor:     "#d7d7d9",
        borderRadius:    20,
        padding:         10,
        margin:          5,
        paddingLeft:     20,
        backgroundColor: "#fcfcfc",
        fontFamily:      "ibmono-regular",
    },
});


SearchBar.propTypes = {
    onChangeText: PropTypes.func.isRequired,
};