import { StackNavigatorParams } from "../../config/Navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, Button, ScrollView, View } from "react-native";
import styles from "./styles";
import { GradientBackground } from "@components";

interface HomeProps {
  navigation: StackNavigationProp<StackNavigatorParams, "Home">;
}

export default function Home({ navigation }: HomeProps) {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Home</Text>
        <Button
          title="Game"
          onPress={() => navigation.navigate("Game", { gameId: "ddd" })}
        />
      </ScrollView>
    </GradientBackground>
  );
}
