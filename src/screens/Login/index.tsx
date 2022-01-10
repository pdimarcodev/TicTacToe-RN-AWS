import { GradientBackground, TextInput } from "@components";
import React, { ReactElement, useRef } from "react";
import { ScrollView, TextInput as NativeTextInput } from "react-native";
import { styles } from "./styles";

export default function Login(): ReactElement {
  const passwordRef = useRef<NativeTextInput | null>(null);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Username"
          returnKeyType="next"
          style={{ marginBottom: 20 }}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry
        />
      </ScrollView>
    </GradientBackground>
  );
}
