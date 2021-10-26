import React, { ReactElement } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../Text";
import { BoardState } from "@utils";

interface BoardProps {
  state: BoardState;
  size: number;
  onCellPressed: (index: number) => void;
}

export default function Board({
  state,
  size,
  onCellPressed,
}: BoardProps): ReactElement {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "green",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {state.map((cell, index) => {
        return (
          <TouchableOpacity
            onPress={() => onCellPressed && onCellPressed(index)}
            key={index}
            style={{
              width: "33.33333%",
              height: "33.33333%",
              backgroundColor: "#fff",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: size / 8 }}>{cell}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
