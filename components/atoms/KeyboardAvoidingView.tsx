import React from "react";
import {
  KeyboardAvoidingView as RnKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
  StatusBar,
  ViewStyle,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function KeyboardAvoidingView({
  style,
  children,
}: Props): JSX.Element {
  function keyboradProps(): KeyboardAvoidingViewProps {
    switch (Platform.OS) {
      case "ios":
        return {
          style: styles.containar,
          behavior: "padding",
          keyboardVerticalOffset: isIphoneX() ? 40 : 20,
        };
      case "android":
        return {
          style: styles.containar,
          behavior: "height",
          keyboardVerticalOffset: StatusBar.currentHeight,
        };
      default:
        return {
          style: styles.containar,
        };
    }
  }
  return (
    <RnKeyboardAvoidingView {...keyboradProps()}>
      {children}
    </RnKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
  },
  screen: {
    height: "100%",
    width: "100%",
  },
});
