import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import HomeStack from "./route/HomeStack";
import { useFonts } from "expo-font";


export default function App() {
  let [fontsLoaded] = useFonts({
    "ibmono-regular": require("./assets/fonts/IBMPlexMono-Regular.ttf"),
    "ibmono-bold": require("./assets/fonts/IBMPlexMono-Bold.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer >
      <HomeStack />
    </NavigationContainer>
  );
}
