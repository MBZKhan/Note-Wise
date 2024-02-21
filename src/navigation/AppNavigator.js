import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import IntroScreen from "../screens/IntroScreen";
import NoteDetailsScreen from "../screens/NoteDetailsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen
                name="IntroScreen"
                component={IntroScreen}
                options={{ headerShown: false }}
            /> */}
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NoteDetailsScreen"
                component={NoteDetailsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default AppNavigator;
