import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Colors from "@constants/Colors";

type Props = {
  uri?: string | null;
  size?: number;
};

export default function Avatar({ uri, size = 32 }: Props) {
  if (!uri) {
    return (
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          styles.empty,
        ]}
      />
    );
  }
  return (
    <Image
      source={{ uri }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      key={uri}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    backgroundColor: Colors.grayLight,
  },
});
