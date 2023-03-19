import React from "react";
import {TextInput, View, Text} from "react-native";
import {globalSearch} from "../styles/global";
import PropTypes from "prop-types";


export function SearchDeals({onChangeText}) {
    return (
        <View>
            
        <TextInput style={globalSearch.searchContainer} onChangeText = {onChangeText} placeholder={"Search Deals ..."}/> 
        {/* <Text>{term}</Text> */}
        </View>
        
    );
}




export function priceDisplay(priceInCents) {
    return `$${priceInCents / 100}`;
}


SearchDeals.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    // term: PropTypes.string.isRequired
};