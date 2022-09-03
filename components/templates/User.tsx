import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, usePaginationFragment, graphql } from "react-relay/hooks";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import Spacer from "@components/atoms/Spacer";
import { User_chats$key } from "@generated/User_chats.graphql";
import { User_data$key } from "@generated/User_data.graphql";
import Profile from "@components/organisms/User/UserProfile";
import Chat from "@components/organisms/User/UserChat";

const userDataQuery = graphql`
  fragment User_data on User {
    ...UserProfile_user
  }
`;

const userChatsQuery = graphql`
  fragment User_chats on Query
  @refetchable(queryName: "User_chats_pagination")
  @argumentDefinitions(
    after: { type: "String" }
    first: { type: "Int!" }
    user_id: { type: "ID!" }
  ) {
    chats(first: $first, after: $after, user_id: $user_id)
      @connection(key: "Chats__chats") {
      edges {
        node {
          id
          ...UserChat_data
        }
      }
    }
  }
`;

export default function User({
  chatFragment,
  userFragment,
}: {
  chatFragment: User_chats$key;
  userFragment: User_data$key;
}) {
  const user = useFragment<User_data$key>(userDataQuery, userFragment);
  const { data } = usePaginationFragment(userChatsQuery, chatFragment);

  data.chats.edges?.map((row) => row);

  return (
    <ScrollView style={styles.container}>
      <Profile userFragment={user} />

      <Spacer height={24} />

      <View style={styles.chat}>
        <Text style={styles.title}>Chat</Text>
      </View>
      {data.chats.edges && data.chats.edges.length > 0 ? (
        data.chats.edges.map(
          (row) => row && <Chat chatFragment={row.node} key={row.node.id} />
        )
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
