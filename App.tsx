import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

const theme = {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      accent: "yellow",
   },
};

export default function App() {
   return (
      <PaperProvider theme={theme}>
         <StatusBar hidden={true} />
         <NavigationContainer>
            <Routes />
         </NavigationContainer>
      </PaperProvider>
   );
}
