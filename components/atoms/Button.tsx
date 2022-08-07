import React from "react";
import { TextStyle, Text, View, StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Loading from "@components/atoms/Loading";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";

const IconWrapper = 1.7;
type Props = {
  title: string;
  onPress: () => void;
  textStyle?: TextStyle;
  icon?: React.ComponentProps<typeof Icon>["name"];
  iconSize?: number;
  iconColor?: string;
  width?: number | string;
  borderRadius?: number;
  height?: number | string;
  backgroundColor?: string;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  icon,
  iconSize = 30,
  loading,
  textStyle,
  iconColor = Colors.black,
  width = 285,
  height = 48,
  backgroundColor = Colors.white,
  disabled,
  borderRadius = 4,
}: Props): JSX.Element {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
      ]}
    >
      <Ripple
        onPress={onPress}
        rippleColor={Colors.black}
        style={{
          width,
          height,
        }}
        disabled={!!disabled || !!loading}
      >
        <View style={styles.wrapper}>
          {icon && (
            <View
              style={[
                styles.icon,
                {
                  width: iconSize * IconWrapper,
                },
              ]}
            >
              <Icon name={icon} size={iconSize} color={iconColor} />
            </View>
          )}
          {disabled ? (
            <View style={[styles.button, styles.disabled]}>
              <Text style={[styles.text, textStyle, styles.disabledText]}>
                {title}
              </Text>
            </View>
          ) : (
            <View style={[styles.button]}>
              <Text style={[styles.text, textStyle]}>{title}</Text>
            </View>
          )}

          {loading && <Loading mask size="small" />}
        </View>
      </Ripple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grayLight,
    position: "relative",
    overflow: "hidden",
  },
  wrapper: {
    flex: 1,
  },
  button: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  disabled: {
    backgroundColor: Colors.grayLight,
  },
  icon: {
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...Fonts.sm,
  },
  disabledText: {},
});
