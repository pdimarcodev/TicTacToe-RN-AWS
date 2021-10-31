import { BoardResult } from "@utils";
import React, { ReactElement, useMemo } from "react";
import { View } from "react-native";
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

  return (
    <>
      {gameResult && gameResult.column && gameResult.direction === "V" && (
        <View
          style={[
            styles.line,
            styles.vLine,
            {
              left: `${33.3333 * gameResult.column - 16.6666}%`,
            },
          ]}
        ></View>
      )}
      {gameResult && gameResult.row && gameResult.direction === "H" && (
        <View
          style={[
            styles.line,
            styles.hLine,
            {
              top: `${33.3333 * gameResult.row - 16.6666}%`,
            },
          ]}
        ></View>
      )}
      {gameResult && gameResult.diagonal && gameResult.direction === "D" && (
        <View
          style={[
            styles.line,
            styles.dLine,
            {
              height: diagonalHeight,
              transform: [
                {
                  translateY: -(diagonalHeight - size) / 2,
                },
                {
                  rotateZ: gameResult.diagonal === "MAIN" ? "-45deg" : "45deg",
                },
              ],
            },
          ]}
        ></View>
      )}
    </>
  );
};

export default BoardLine;
