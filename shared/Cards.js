import React, {View, Text, Image, PanResponder, Animated, Dimensions} from "react-native";
import PropTypes from "prop-types";
import {cardStyles} from "../styles/global";
import {priceDisplay} from "./utils";
import { useRef} from "react";






export function DealCard({item}) {

    return (
        <View style = {cardStyles.card}>
            <Image style={cardStyles.cardImage} source={{uri: item.media[0]}} />

            <View style={cardStyles.cardBody}>
                <Text style={cardStyles.cardTitle}>{item.title}</Text>
                
                <View style={cardStyles.cardbodyLeft}>
                    <Text style={cardStyles.cardText}>{item.cause.name}</Text>
                    <Text style={cardStyles.cardText}>{priceDisplay(item.price)}</Text>
                </View> 

            </View>
        </View>    
    );
}


export function FullCard ({item, imageIndex, setImageIndex }){    

    const imgXpos = useRef(new Animated.Value(0)).current;
    const width = Dimensions.get("window").width;

    const pan = PanResponder.create({
        onStartShouldSetPanResponder: ()=> true,
        onPanResponderMove:           (evt, gs)=>{
 
            imgXpos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs)=> {
            // animated 
            if (gs.dx < -1 * width* .4){
                Animated.timing(imgXpos, {toValue: -1 * width, useNativeDriver: true, duration: 100}).start((finished)=>{
                    if(finished){
                        if (!item.media[imageIndex - 1]){
                            Animated.spring(imgXpos, {toValue: 0, useNativeDriver: true, duration: 500}).start();
                            return ;
                        }
                        setImageIndex(prev => prev - 1);
                        imgXpos.setValue(0);
                    }
                });
            } else if (gs.dx > (width) *.4){
                Animated.timing(imgXpos, {toValue: width, useNativeDriver: true, duration: 100}).start(({finished})=>{
                    if(finished){
                        if (!item.media[imageIndex+ 1]){
                            Animated.spring(imgXpos, {toValue: 0, useNativeDriver: true, duration: 500}).start();
                            return ;
                        }
                        setImageIndex((imageIndex) => {return imageIndex + 1;});
                        imgXpos.setValue(0);
                    }
                });
            } else {
                Animated.spring(imgXpos, {toValue: 0, useNativeDriver: true, duration: 500}).start();
            }
        },
    });
    

    return (
        <View style={cardStyles.card}>
            <Animated.Image style={[{transform: [{translateX: imgXpos}]} ,cardStyles.cardImage]} source={{uri: item.media[imageIndex]}} {...pan.panHandlers}/>

            <View style={cardStyles.cardBody}>

                <Text style={cardStyles.cardTitle}>{item.title}</Text>
                <View style= {cardStyles.cardBodyContent}>


                    <View style={cardStyles.cardBodyLeft}>
                        <Text style={cardStyles.cardText}>{item.cause.name}</Text>
                        <Text style={cardStyles.cardText}>{priceDisplay (item.price)}</Text>
                    </View> 
                    {
                        item.user && 
                        <View style={cardStyles.cardBodyRight}>
                                    <Image source={{uri: item.user.avatar}} style={cardStyles.cardAvatar}/>
                                    <Text style={cardStyles.cardText}>{item.user.name}</Text>
                        </View>
                    }
                </View>

                <View style={cardStyles.cardBodyDescr}>
                        <Text style={cardStyles.cardText}>{item.description}</Text>
                </View>

            </View>
        </View>
    );
}




DealCard.propTypes = {
    item: PropTypes.object
};


FullCard.propTypes = {
    item:          PropTypes.object.isRequired,
    imageIndex:    PropTypes.number.isRequired,
    setImageIndex: PropTypes.func.isRequired,
    panHandler:    PropTypes.object,

};