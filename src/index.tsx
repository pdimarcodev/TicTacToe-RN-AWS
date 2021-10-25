import React from "react";
import { StyleSheet, View } from "react-native";
import AppLoading from "expo-app-loading";

import { AppBootstrap, Text } from "@components";

export default function App() {
  return (
    <AppBootstrap>
      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>Hello World</Text>
      </View>
    </AppBootstrap>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
