import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Game, Home } from "@screens";

export type StackNavigatorParams = {
  Home: undefined;
  Game: { gameId: string };
};

const Stack = createStackNavigator<StackNavigatorParams>();

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
