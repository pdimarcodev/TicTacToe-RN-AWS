import React, { ReactNode, ReactElement } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

interface GradientBackgroundProps {
  children: ReactNode;
}

export default function GradientBackground({
  children,
}: GradientBackgroundProps): ReactElement {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        colors={["#120318", "#221a36"]}
      />
      {children}
    </View>
  );
}
