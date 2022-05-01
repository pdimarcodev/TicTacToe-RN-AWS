import { Button, GradientBackground, TextInput } from "@components";
import React, { ReactElement, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput as NativeTextInput,
} from "react-native";
import { Auth } from "aws-amplify";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/Navigator";
import { TouchableOpacity } from "react-native-gesture-handler";

type LoginProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Login">;
};

export default function Login({ navigation }: LoginProps): ReactElement {
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
      await Auth.signIn(username, password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Error!",
        error instanceof Error ? error.message : "An error occurred!"
      );
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
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.registerLink}>Don&apos;t have an account?</Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
}
