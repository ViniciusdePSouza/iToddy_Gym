import { StatusBar, Text, View } from "react-native";

import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import React from "react";
import { Loading } from "./src/Components/Loading";

import { THEME } from "./src/theme";

export default function App() {
  const fontsLoaded = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>

        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {!fontsLoaded ? <Text>Hello World!</Text> : <Loading/>}
    </NativeBaseProvider>
  );
}
