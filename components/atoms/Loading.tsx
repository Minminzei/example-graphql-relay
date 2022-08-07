import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "@constants/Colors";

type Props = {
  size?: "small" | "large";
  color?: string;
  mask?: boolean;
  maskColor?: string;
};

export default function Loading({
  size = "large",
  color = Colors.blue,
  mask = false,
  maskColor = Colors.overlayWhite,
}: Props): JSX.Element {
  return (
    <View
      style={
        mask
          ? [
              styles.mask,
              {
                backgroundColor: maskColor,
              },
            ]
          : styles.loading
      }
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
