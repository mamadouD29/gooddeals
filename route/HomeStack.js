import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../components/Home";
import DealDetails from "../components/DealDetails";

const Stack = createNativeStackNavigator();

const optionsStyle = (title)=> {
     const option = {
        title:       `${title}`,
        headerStyle: {
            
        },
        headerTitleStyle: {
            fontFamily: ""
        }
    }; 

    return option;
};


export default function HomeStack () {

    return <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={optionsStyle("Deals")}/>
                <Stack.Screen name="DealDetails" component={DealDetails} options={optionsStyle("Deal Details")}/>
            </Stack.Navigator>;    

}