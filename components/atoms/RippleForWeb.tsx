import React from "react";
import Ripples from "react-ripples";
import * as _ from "lodash";
import { View, TouchableWithoutFeedback, ViewStyle } from "react-native";

type Props = {
  onPress: () => void;
  rippleColor: string;
  rippleDuration?: number;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
};

export default function Ripple({
  onPress,
  rippleColor,
  rippleDuration = 600,
  children,
  style,
  disabled = false,
}: Props) {
  if (disabled) {
    return <View style={style}>{children}</View>;
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Ripples during={rippleDuration} color={rippleColor}>
        <View style={style}>{children}</View>
      </Ripples>
    </TouchableWithoutFeedback>
  );
}
