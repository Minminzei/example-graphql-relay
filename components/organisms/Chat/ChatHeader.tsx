import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, graphql } from "react-relay/hooks";
import Icons from "@constants/Icons";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { goBack } from "@navigation/navigator";
import { ChatHeader_owner$key } from "@generated/ChatHeader_owner.graphql";

const chatOwnerQuery = graphql`
  fragment ChatHeader_owner on Chat {
    title
  }
`;

export default function ChatHeader({
  chatOwnerFragment,
}: {
  chatOwnerFragment: ChatHeader_owner$key;
}) {
  const data = useFragment<ChatHeader_owner$key>(
    chatOwnerQuery,
    chatOwnerFragment
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.back}>
        <Icon name={Icons.back} size={20} />
      </TouchableOpacity>

      <View style={styles.title}>
        <Text style={styles.text}>{data.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: Colors.grayLight,
    borderStyle: "solid",
  },
  back: {
    width: 48,
  },
  title: {
    flex: 1,
  },
  text: {
    ...Fonts.lg,
  },
});
