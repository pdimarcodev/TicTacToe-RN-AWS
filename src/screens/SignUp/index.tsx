import { Button, GradientBackground, TextInput } from "@components";
import React, { ReactElement, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput as NativeTextInput,
  View,
} from "react-native";
import { Auth } from "aws-amplify";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/Navigator";
import { useHeaderHeight } from "@react-navigation/elements";
import OTPInput from "@twotalltotems/react-native-otp-input";

type SignUpProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "SignUp">;
};

export default function SignUp({ navigation }: SignUpProps): ReactElement {
  const headerHeight = useHeaderHeight();
  const passwordRef = useRef<NativeTextInput | null>(null);
  const emailRef = useRef<NativeTextInput | null>(null);
  const nameRef = useRef<NativeTextInput | null>(null);

  const [form, setForm] = useState({
    username: "test",
    email: "pablo.d.dimarco@gmail.com",
    name: "Test Name",
    password: "12345678",
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"signUp" | "otp">("signUp");

  const setFormInput = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const signUp = async () => {
    setLoading(true);
    const { username, password, email, name } = form;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name,
        },
      });
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
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {step === "otp" ? (
            <OTPInput
              pinCount={6}
              placeholderCharacter="0"
              placeholderTextColor="#5d5379"
              codeInputFieldStyle={styles.OTPInputBox}
            />
          ) : (
            <>
              <TextInput
                value={form.username}
                onChangeText={(value) => setFormInput("username", value)}
                placeholder="Username"
                returnKeyType="next"
                style={{ marginBottom: 20 }}
                onSubmitEditing={() => {
                  nameRef.current?.focus();
                }}
              />
              <TextInput
                ref={nameRef}
                value={form.name}
                onChangeText={(value) => setFormInput("name", value)}
                placeholder="Name"
                returnKeyType="next"
                style={{ marginBottom: 20 }}
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
              />
              <TextInput
                keyboardType="email-address"
                ref={emailRef}
                value={form.email}
                onChangeText={(value) => setFormInput("email", value)}
                placeholder="Email"
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
              <Button loading={loading} title="Sign-Up" onPress={signUp} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
