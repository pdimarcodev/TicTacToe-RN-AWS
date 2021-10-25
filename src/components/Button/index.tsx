import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Text from "../Text";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title, style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
