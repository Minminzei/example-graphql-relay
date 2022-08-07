import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
type IconType =
  | "home"
  | "prfofile"
  | "back"
  | "next"
  | "add"
  | "remove"
  | "close";

const Icons: {
  [key in IconType]: React.ComponentProps<typeof Icon>["name"];
} = {
  home: "home",
  prfofile: "account-circle",
  back: "arrow-left",
  next: "arrow-right",
  add: "plus",
  remove: "trash-can-outline",
  close: "close",
};

export default Icons;
