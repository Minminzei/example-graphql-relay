import React from "react";
import { View } from "react-native";

const Spacer = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <View
      style={{
        width: width ?? 1,
        height: height ?? 1,
      }}
    />
  );
};
export default Spacer;
