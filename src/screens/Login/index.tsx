import { Button, GradientBackground, TextInput } from "@components";
import React, { ReactElement, useRef, useState } from "react";
import { Alert, ScrollView, TextInput as NativeTextInput } from "react-native";
import { Auth } from "aws-amplify";
import { styles } from "./styles";

export default function Login(): ReactElement {
  const passwordRef = useRef<NativeTextInput | null>(null);
  const [form, setForm] = useState({
    username: "test",
    password: "12345678",
  });

  const [loading, setLoading] = useState(false);

  const setFormInput = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const login = async () => {
    setLoading(true);
    const { username, password } = form;
    try {
      const res = await Auth.signIn(username, password);
      console.log(res);
    } catch (error) {
      Alert.alert("Error!", error.message || "An error occurred!");
    }
    setLoading(false);
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          value={form.username}
          onChangeText={(value) => setFormInput("username", value)}
          placeholder="Username"
          returnKeyType="next"
          style={{ marginBottom: 20 }}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
        <TextInput
          value={form.password}
          onChangeText={(value) => setFormInput("password", value)}
          ref={passwordRef}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry
          style={{ marginBottom: 30 }}
        />
        <Button loading={loading} title="Login" onPress={login} />
      </ScrollView>
    </GradientBackground>
  );
}
