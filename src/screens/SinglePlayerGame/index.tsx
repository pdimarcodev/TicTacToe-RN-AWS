import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native";
import { Board, GradientBackground } from "@components";
import styles from "./styles";
import { BoardState, isTerminal, printFormattedBoard } from "@utils";

export default function SinglePlayerGame(): ReactElement {
  const b: BoardState = ["x", "o", "x", "x", "o", null, "x", "o", null];
  printFormattedBoard(b);
  console.log(isTerminal(b));

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          onCellPressed={(index) => {
            alert(index);
          }}
          state={b}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
