import React, { useEffect, useState } from "react";
import { Text, View } from "@components/atoms/Themed";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";

const initialBottom = -200;

type Props = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: Props): JSX.Element {
  const [animateBottom] = useState<Animated.Value>(
    new Animated.Value(initialBottom)
  );
  useEffect(() => {
    const animate = Animated.timing(animateBottom, {
      toValue: 100,
      duration: 150,
      useNativeDriver: false,
    });
    animate.start(() => animate.stop());
    setTimeout(() => close(), 4000);

    return () => {
      animate.stop();
    };
  }, []);

  function close(): void {
    const animate = Animated.timing(animateBottom, {
      toValue: initialBottom,
      duration: 100,
      useNativeDriver: false,
    });
    animate.start(() => {
      onClose();
    });
  }

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          bottom: animateBottom,
        },
      ]}
    >
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.content} onPressIn={onClose}>
          <Text style={styles.text}>{message}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animated: {
    position: "absolute",
    left: 0,
    width: "100%",
    zIndex: 999,
  },
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.transparent,
  },
  content: {
    width: "100%",
    height: 55,
    borderRadius: 8,
    position: "relative",
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...Fonts.sm,
    color: Colors.white,
    lineHeight: 44,
  },
});
