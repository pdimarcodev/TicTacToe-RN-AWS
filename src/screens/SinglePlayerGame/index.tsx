import React, { ReactElement, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { Board, GradientBackground } from "@components";
import styles from "./styles";
import {
  BoardState,
  getBestMove,
  isEmpty,
  isTerminal,
  Cell,
  useSounds,
} from "@utils";

export default function SinglePlayerGame(): ReactElement {
  const [state, setState] = useState<BoardState>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [turn, setTurn] = useState<"HUMAN" | "BOT">(
    Math.random() < 0.5 ? "HUMAN" : "BOT"
  );
  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
  const playSound = useSounds();
  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: "x" | "o"): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = symbol;
    setState(stateCopy);
    setTurn("BOT");
    symbol === "x" ? playSound("pop1") : playSound("pop2");
  };

  const handleOnCellPressed = (cell: number): void => {
    if (turn !== "HUMAN") return;
    insertCell(cell, isHumanMaximizing ? "x" : "o");
  };

  const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
    if (winnerSymbol === "x") {
      return isHumanMaximizing ? "HUMAN" : "BOT";
    }
    if (winnerSymbol === "o") {
      return isHumanMaximizing ? "BOT" : "HUMAN";
    }
    return "DRAW";
  };

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);
      if (winner === "HUMAN") {
        playSound("win");
        alert("You won!");
      }
      if (winner === "BOT") {
        playSound("loss");
        alert("You lost!");
      }
      if (winner === "DRAW") {
        playSound("draw");
        alert("It's a draw!");
      }
    } else if (turn === "BOT") {
      if (isEmpty(state)) {
        const centerAndCorners = [0, 2, 6, 8, 4];
        const firstMove =
          centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
        insertCell(firstMove, "x");
        setIsHumanMaximizing(false);
        setTurn("HUMAN");
      } else {
        const best = getBestMove(state, !isHumanMaximizing, 0, -1);
        insertCell(best, isHumanMaximizing ? "o" : "x");
        setTurn("HUMAN");
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"}
          onCellPressed={(index) => handleOnCellPressed(index)}
          state={state}
          size={300}
          gameResult={gameResult}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
