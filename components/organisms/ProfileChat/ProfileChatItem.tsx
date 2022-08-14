import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, graphql } from "react-relay/hooks";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import Icons from "@constants/Icons";
import Ripple from "react-native-material-ripple";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { navigate } from "@navigation/navigator";
import { ProfileChatItem_chat$key } from "@generated/ProfileChatItem_chat.graphql";

const profileChatQuery = graphql`
  fragment ProfileChatItem_chat on Chat {
    id
    title
  }
`;

export default function ProfileChatItem({
  chatFragment,
  onRemove,
}: {
  chatFragment: ProfileChatItem_chat$key;
  onRemove: (id: string) => void;
}) {
  const data: any = useFragment(profileChatQuery, chatFragment);
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.title}>{data.title}</Text>
      </View>

      <Ripple
        style={styles.link}
        onPress={() => onRemove(data.id)}
        rippleColor={Colors.black}
      >
        <Icon name={Icons.remove} size={24} color={Colors.gray} />
      </Ripple>

      <Ripple
        style={styles.link}
        onPress={() => navigate("Chat", { id: data.id })}
        rippleColor={Colors.black}
      >
        <Icon name={Icons.next} size={24} color={Colors.blue} />
      </Ripple>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grayLight,
  },
  info: {
    flex: 1,
  },
  title: {
    ...Fonts.lg,
  },
  link: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
