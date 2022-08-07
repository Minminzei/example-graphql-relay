import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, graphql } from "react-relay/hooks";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import Spacer from "@components/atoms/Spacer";
import { User_chats$key } from "@generated/User_chats.graphql";
import { User_list$key } from "@generated/User_list.graphql";
import Profile from "@components/organisms/User/UserProfile";
import Chat from "@components/organisms/User/UserChat";

const userDataQuery = graphql`
  fragment User_list on User {
    ...UserProfile_user
  }
`;

const userChatsQuery = graphql`
  fragment User_chats on Query @argumentDefinitions(user_id: { type: "ID!" }) {
    chats(user_id: $user_id) {
      id
      ...UserChat_data
    }
  }
`;

export default function User({
  chatFragment,
  userFragment,
}: {
  chatFragment: User_chats$key;
  userFragment: User_list$key;
}) {
  const user = useFragment<User_list$key>(userDataQuery, userFragment);
  const { chats } = useFragment<User_chats$key>(userChatsQuery, chatFragment);

  return (
    <ScrollView style={styles.container}>
      <Profile userFragment={user} />

      <Spacer height={24} />

      <View style={styles.chat}>
        <Text style={styles.title}>Chat</Text>
      </View>
      {chats.length > 0 ? (
        chats.map((chat) => <Chat chatFragment={chat} key={chat.id} />)
      ) : (
        <Text>チャットはありません</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chat: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grayLight,
  },
  title: {
    ...Fonts.lg,
    fontWeight: "bold",
    textAlign: "center",
  },
});
