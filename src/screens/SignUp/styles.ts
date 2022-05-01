import { colors } from "@utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  OTPInputBox: {
    color: colors.lightGreen,
    fontFamily: "DeliusUnicase_400Regular",
    fontSize: 20,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: colors.purple,
    borderBottomWidth: 1,
    borderColor: colors.lightGreen,
  },
});
