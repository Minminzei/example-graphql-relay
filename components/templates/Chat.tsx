import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "@components/atoms/Themed";
import { useFragment, usePaginationFragment, graphql } from "react-relay/hooks";
import { Chat_detail$key } from "@generated/Chat_detail.graphql";
import { Chat_pagination$key } from "@generated/Chat_pagination.graphql";
import { Chat_viewer$key } from "@generated/Chat_viewer.graphql";
import Header from "@components/organisms/Chat/ChatHeader";
import Message from "@components/organisms/Chat/ChatMessage";
import Post from "@components/organisms/Chat/ChatPost";
import Spacer from "@components/atoms/Spacer";
import Loading from "@components/atoms/Loading";
import { PagingPosts } from "@constants/App";

const chatQuery = graphql`
  fragment Chat_detail on Chat {
    id
    ...ChatMessage_chat
    ...ChatHeader_owner
    ...ChatPost_chat
  }
`;

const chatMessagePostQuery = graphql`
  fragment Chat_pagination on Chat
  @refetchable(queryName: "Chat_pagination_query")
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" }) {
    posts(first: $first, after: $after) @connection(key: "Chat_posts") {
      edges {
        cursor
        node {
          id
          ...ChatMessage_post
        }
      }
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
  postsFragment,
  viewerFragment,
}: {
  chatFragment: Chat_detail$key;
  postsFragment: Chat_pagination$key;
  viewerFragment: Chat_viewer$key;
}) {
  const { data, hasNext, loadNext } = usePaginationFragment(
    chatMessagePostQuery,
    postsFragment
  );
  const chat = useFragment(chatQuery, chatFragment);
  const viewer = useFragment<Chat_viewer$key>(chatViewerQuery, viewerFragment);
  const [paging, setPaging] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Header chatOwnerFragment={chat} />
      {paging && (
        <View style={styles.paging}>
          <Loading />
        </View>
      )}
      <FlatList
        data={data.posts?.edges}
        renderItem={({ item }) =>
          item && (
            <>
              <Spacer height={16} />
              <Message
                postFragment={item.node}
                viewerFragment={viewer}
                chatFragment={chat}
              />
              <Spacer height={16} />
            </>
          )
        }
        inverted
        contentContainerStyle={styles.posts}
        keyExtractor={(item) => item?.node.id || ""}
        onEndReached={() => {
          if (hasNext && !paging) {
            setPaging(true);
            loadNext(PagingPosts, {
              onComplete: () => {
                setPaging(false);
              },
            });
          }
        }}
      />
      <Post chatFragment={chat} viewerFragmen={viewer} />
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
  paging: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // zIndex: 1,
    // width: "100%",
    paddingVertical: 12,
  },
});
