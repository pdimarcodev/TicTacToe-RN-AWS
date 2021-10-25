import React, { ReactElement, ReactNode } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

interface TextProps extends NativeTextProps {
  children: ReactNode;
  weight: "400" | "700";
}

const defaultProps = {
  weight: "700",
};

export default function Text({
  children,
  style,
  weight,
  ...props
}: TextProps): ReactElement {
  let fontFamily;

  if (weight === "400") {
    fontFamily = "DeliusUnicase_400Regular";
  }
  if (weight === "700") {
    fontFamily = "DeliusUnicase_700Bold";
  }

  return (
    <NativeText {...props} style={[{ fontFamily }, style]}>
      {children}
    </NativeText>
  );
}

Text.defaultProps = defaultProps;
