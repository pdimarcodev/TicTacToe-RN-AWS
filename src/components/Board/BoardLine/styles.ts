import { colors } from "@utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  line: {
    position: "absolute",
    backgroundColor: colors.lightPurple,
  },
  vLine: {
    width: 4,
  },
  hLine: {
    height: 4,
  },
  dLine: {
    width: 4,
    top: 0,
    left: "50%",
  },
});
