import React, { useState } from "react";
import * as _ from "lodash";
import {
  View,
  Animated,
  ViewStyle,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Colors from "@constants/Colors";

type Props = {
  onPress: () => void;
  rippleColor?: string;
  rippleDuration?: number;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
};

const MaxOpacity = 0.4;
const InitialScale = 0;

export default function Ripple({
  onPress,
  rippleColor = Colors.black,
  rippleDuration = 600,
  children,
  style,
  disabled = false,
}: Props) {
  const [size, setSize] = useState<number>(0);
  const [lastPress, setLastPress] = useState<number>(0);
  const [scale] = useState<Animated.Value>(new Animated.Value(InitialScale));
  const [opacity] = useState<Animated.Value>(new Animated.Value(MaxOpacity));

  function handlePress() {
    const delta = new Date().getTime() - lastPress;
    if (delta > (rippleDuration as Number)) {
      setLastPress(new Date().getTime());
      const animate = Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: (rippleDuration as number) * (1 / 3),
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: (rippleDuration as number) * (2 / 3),
          useNativeDriver: false,
        }),
      ]);
      animate.start(() => {
        scale.setValue(InitialScale);
        opacity.setValue(MaxOpacity);
        animate.stop();
        onPress();
      });
    }
  }

  if (disabled) {
    return <View style={style}>{children}</View>;
  }
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        onLayout={({ nativeEvent }) => {
          const size = _.max([
            nativeEvent.layout.width,
            nativeEvent.layout.height,
          ]);
          setSize(size || 0);
        }}
        style={[style, styles.contaner]}
      >
        {children}
        <Animated.View
          style={[
            styles.ripple,
            {
              width: size,
              height: size,
              transform: [{ scale }],
              opacity,
              backgroundColor: rippleColor,
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contaner: {
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  ripple: {
    position: "absolute",
    zIndex: 9999999,
    top: 0,
    left: 0,
  },
});
