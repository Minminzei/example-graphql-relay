import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, graphql } from "react-relay/hooks";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import Icons from "@constants/Icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ripple from "react-native-material-ripple";
import { navigate } from "@navigation/navigator";
import { UserChat_data$key } from "@generated/UserChat_data.graphql";

const userChatsQuery = graphql`
  fragment UserChat_data on Chat {
    id
    title
  }
`;

export default function UserChat({
  chatFragment,
}: {
  chatFragment: UserChat_data$key;
}) {
  const data = useFragment<UserChat_data$key>(userChatsQuery, chatFragment);

  return (
    <Ripple
      style={styles.container}
      onPress={() => navigate("Chat", { id: data.id })}
      rippleColor={Colors.black}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{data.title}</Text>
      </View>

      <View style={styles.link}>
        <Icon name={Icons.next} size={24} color={Colors.blue} />
      </View>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  container: {
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
