import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView, View, Image, Alert } from "react-native";
import { StackNavigatorParams } from "../../config/Navigator";
import { GradientBackground, Button, Text } from "@components";
import styles from "./styles";
import { useAuth } from "@contexts/auth-context";
import Auth from "@aws-amplify/auth";

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps) {
  const { user } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
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
          <Button
            loading={signingOut}
            onPress={async () => {
              if (user) {
                setSigningOut(true);
                try {
                  await Auth.signOut();
                } catch (error) {
                  Alert.alert("Error!", "Error signing out!");
                }
                setSigningOut(false);
              } else {
                navigation.navigate("Login");
              }
            }}
            style={styles.button}
            title={user ? "Logout" : "Login"}
          />
          <Button
            onPress={() => navigation.navigate("Settings")}
            style={styles.button}
            title="Settings"
          />
          {user && (
            <Text weight="400" style={styles.loggedInText}>
              Logged in as <Text weight="700">{user.username}</Text>
            </Text>
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
