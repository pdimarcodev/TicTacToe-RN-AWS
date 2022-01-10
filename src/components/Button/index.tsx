import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "../Text";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export default function Button({
  loading,
  title,
  style,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={loading}
      {...props}
      style={[styles.button, style]}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
