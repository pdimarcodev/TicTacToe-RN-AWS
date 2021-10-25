import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native";
import { Board, GradientBackground } from "@components";
import styles from "./styles";

export default function SinglePlayerGame(): ReactElement {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          onCellPressed={(index) => {
            alert(index);
          }}
          state={["x", "o", "x", "x", "o", "x", "x", "o", "x"]}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
