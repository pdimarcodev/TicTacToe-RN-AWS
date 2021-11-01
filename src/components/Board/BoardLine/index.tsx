import { BoardResult } from "@utils";
import React, { ReactElement, useEffect, useMemo, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "./styles";

type BoardLineProps = {
  size: number;
  gameResult: BoardResult;
};

const BoardLine = ({ size, gameResult }: BoardLineProps): ReactElement => {
  const diagonalHeight = useMemo(
    () => Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2)),
    [size]
  );

  const animationRef = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationRef.current, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <>
      {gameResult && gameResult.column && gameResult.direction === "V" && (
        <Animated.View
          style={[
            styles.line,
            styles.vLine,
            {
              left: `${33.3333 * gameResult.column - 16.6666}%`,
              height: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        ></Animated.View>
      )}
      {gameResult && gameResult.row && gameResult.direction === "H" && (
        <Animated.View
          style={[
            styles.line,
            styles.hLine,
            {
              top: `${33.3333 * gameResult.row - 16.6666}%`,
              width: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        ></Animated.View>
      )}
      {gameResult && gameResult.diagonal && gameResult.direction === "D" && (
        <Animated.View
          style={[
            styles.line,
            styles.dLine,
            {
              height: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, diagonalHeight],
              }),
              transform: [
                {
                  translateY: animationRef.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [size / 2, -(diagonalHeight - size) / 2],
                  }),
                },
                {
                  rotateZ: gameResult.diagonal === "MAIN" ? "-45deg" : "45deg",
                },
              ],
            },
          ]}
        ></Animated.View>
      )}
    </>
  );
};

export default BoardLine;
