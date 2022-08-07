import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "@components/atoms/Themed";
import { useFragment, graphql } from "react-relay/hooks";
import { Chat_detail$key } from "@generated/Chat_detail.graphql";
import { Chat_viewer$key } from "@generated/Chat_viewer.graphql";
import Header from "@components/organisms/Chat/ChatHeader";
import Message from "@components/organisms/Chat/ChatMessage";
import Post from "@components/organisms/Chat/ChatPost";
import Spacer from "@components/atoms/Spacer";

const chatQuery = graphql`
  fragment Chat_detail on Chat {
    id
    ...ChatHeader_owner
    ...ChatPost_chat
    posts {
      id
      deletedAt
      user {
        id
      }
      ...ChatMessage_post
    }
  }
`;

const chatViewerQuery = graphql`
  fragment Chat_viewer on User {
    ...ChatMessage_viewer
    ...ChatPost_viewer
  }
`;

export default function Chat({
  chatFragment,
  viewerFragment,
}: {
  chatFragment: Chat_detail$key;
  viewerFragment: Chat_viewer$key;
}) {
  const data = useFragment<Chat_detail$key>(chatQuery, chatFragment);
  const viewer = useFragment<Chat_viewer$key>(chatViewerQuery, viewerFragment);

  return (
    <View style={styles.container}>
      <Header chatOwnerFragment={data} />

      <FlatList
        data={data.posts}
        renderItem={({ item }) => (
          <>
            <Spacer height={16} />
            <Message postFragment={item} viewerFragment={viewer} />
            <Spacer height={16} />
          </>
        )}
        contentContainerStyle={styles.posts}
        inverted
        keyExtractor={(item) => item.id}
      />
      <Post chatFragment={data} viewerFragmen={viewer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posts: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
});
