import React, { ReactElement, useEffect, useState } from "react";
import { Button, Dimensions, SafeAreaView, Text, View } from "react-native";
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
import { useSettings, difficulties } from "@contexts/settings-context";

const SCREEN_WIDTH = Dimensions.get("screen").width;

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
  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });
  const playSound = useSounds();
  const { settings } = useSettings();
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

  const newGame = () => {
    setState([null, null, null, null, null, null, null, null, null]);
    setTurn(Math.random() < 0.5 ? "HUMAN" : "BOT");
  };

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);
      if (winner === "HUMAN") {
        playSound("win");
        setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
      }
      if (winner === "BOT") {
        playSound("loss");
        setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
      }
      if (winner === "DRAW") {
        playSound("draw");
        setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
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
        const best = getBestMove(
          state,
          !isHumanMaximizing,
          0,
          parseInt(settings ? settings.difficulty : "-1")
        );
        insertCell(best, isHumanMaximizing ? "o" : "x");
        setTurn("HUMAN");
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.difficulty}>
          <Text>
            Difficulty:{" "}
            {settings ? difficulties[settings.difficulty] : "Impossible"}
          </Text>
          <View style={styles.results}>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Win</Text>
              <Text style={styles.resultsCount}>{gamesCount.wins}</Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Draws</Text>
              <Text style={styles.resultsCount}>{gamesCount.draws}</Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Losses</Text>
              <Text style={styles.resultsCount}>{gamesCount.losses}</Text>
            </View>
          </View>
        </View>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"}
          onCellPressed={(index) => handleOnCellPressed(index)}
          state={state}
          size={SCREEN_WIDTH - 60}
          gameResult={gameResult}
        />
        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {getWinner(gameResult.winner) === "HUMAN" && "You Won"}
              {getWinner(gameResult.winner) === "BOT" && "You Lost"}
              {getWinner(gameResult.winner) === "DRAW" && "It's a Draw"}
            </Text>
            <Button onPress={newGame} title="Play Again" />
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}
