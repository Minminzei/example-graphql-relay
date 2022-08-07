import React from "react";
import { Text, View } from "@components/atoms/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import Icons from "@constants/Icons";
import { goBack } from "@navigation/navigator";

type Props = {
  title?: String;
  onBack?: () => void;
};

export default function Header({ title, onBack }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          if (onBack) {
            onBack();
          } else {
            goBack();
          }
        }}
      >
        <Icon name={Icons.back} size={24} />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    width: "100%",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grayLight,
  },
  back: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...Fonts.sm,
  },
});
