import { Platform } from "react-native";

const fontFamily = Platform.select({
  ios: {
    fontFamily: "Hiragino Sans",
  },
  android: {
    fontFamily: "sans-serif",
  },
  web: {
    fontFamily: "Helvetica Neue",
  },
});

export default {
  xxs: {
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    ...fontFamily,
  },
  xs: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    ...fontFamily,
  },
  sm: {
    fontSize: 15,
    lineHeight: 25,
    letterSpacing: 1,
    ...fontFamily,
  },
  md: {
    fontSize: 17,
    lineHeight: 28,
    letterSpacing: 1,
    ...fontFamily,
  },
  lg: {
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 1,
    ...fontFamily,
  },
  xl: {
    fontSize: 22,
    lineHeight: 35,
    letterSpacing: 2,
    ...fontFamily,
  },
};
