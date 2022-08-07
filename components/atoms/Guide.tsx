import React from "react";
import { StyleSheet } from "react-native";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { View, Text } from "@components/atoms/Themed";

type Props = {
  theme?: "normal" | "alert";
  title: string;
};

export default function Guide({ title, theme = "normal" }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.message,
          {
            backgroundColor:
              theme === "normal" ? Colors.blueLight : Colors.redLight,
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  message: {
    padding: 16,
    borderRadius: 4,
  },
  title: {
    ...Fonts.sm,
  },
});
