import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView, View, Image } from "react-native";
import { StackNavigatorParams } from "../../config/Navigator";
import { GradientBackground, Button } from "@components";
import styles from "./styles";

interface HomeProps {
  navigation: StackNavigationProp<StackNavigatorParams, "Home">;
}

export default function Home({ navigation }: HomeProps) {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={require("@assets/logo.png")} />
        <View style={styles.buttons}>
          <Button
            onPress={() => navigation.navigate("SinglePlayerGame")}
            style={styles.button}
            title="Single Player"
          />
          <Button style={styles.button} title="Multiplayer" />
          <Button style={styles.button} title="Login" />
          <Button
            onPress={() => navigation.navigate("Settings")}
            style={styles.button}
            title="Settings"
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
