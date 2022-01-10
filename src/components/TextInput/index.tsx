import React, { ReactElement, forwardRef } from "react";
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
} from "react-native";
import { styles } from "./styles";

const TextInput = forwardRef<NativeTextInput, NativeTextInputProps>(
  ({ style, ...props }, ref): ReactElement => {
    return (
      <NativeTextInput
        ref={ref}
        placeholderTextColor="#5D5379"
        style={[styles.input, style]}
        {...props}
      ></NativeTextInput>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
