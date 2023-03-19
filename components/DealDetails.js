import {ScrollView, View, ActivityIndicator} from "react-native";
import {FetchDealDetails} from "../hooks/useFetch";
import {FullCard} from "../shared/Cards";
import PropTypes from "prop-types";
import React,{ useState, useEffect } from "react";
import { globalStyles } from "../styles/global";
import * as Linking from "expo-linking";
import FlatButton from "../shared/Button";

export default function DealDetails ({route}){
    const {key}= route.params;
    const [item, setItem] = useState();
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(()=>{
        FetchDealDetails(key)
            .then(data => setItem(data));
    },[key]);
    
    if(item == null) {
    return <ActivityIndicator size={"large"} />;
    }

    // link to buy deak
    const handleLinking = () => {
        Linking.openURL(item.url);
    };

   
  
    return(
        <ScrollView style={globalStyles.container}>
            <FullCard item={item} imageIndex= {imageIndex} setImageIndex={setImageIndex} />
            <View style={globalStyles.buyButton}>
                <FlatButton title="Buy deal" onPress={handleLinking} />
            </View>
        </ScrollView>
    );
}


DealDetails.propTypes = {
    route: PropTypes.object,

   
};