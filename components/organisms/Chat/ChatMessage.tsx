import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { View, Text } from "@components/atoms/Themed";
import {
  useFragment,
  useMutation,
  graphql,
  ConnectionHandler,
} from "react-relay/hooks";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import { ChatMessage_post$key } from "@generated/ChatMessage_post.graphql";
import { ChatMessage_viewer$key } from "@generated/ChatMessage_viewer.graphql";
import { ChatMessage_chat$key } from "@generated/ChatMessage_chat.graphql";
import { ChatMessageRemoveMutation } from "@generated/ChatMessageRemoveMutation.graphql";
import Avatar from "@components/atoms/Avatar";
import Spacer from "@components/atoms/Spacer";
import Loading from "@components/atoms/Loading";
import message, { MessageData } from "@recoil/message";

const chatMessageViewerQuery = graphql`
  fragment ChatMessage_viewer on User {
    id
  }
`;

const chatMessageChatQuery = graphql`
  fragment ChatMessage_chat on Chat {
    id
  }
`;

const chatMessagePostQuery = graphql`
  fragment ChatMessage_post on Post {
    id
    content
    deletedAt
    user {
      id
      name
      image
    }
  }
`;

const chatMessageMutation = graphql`
  mutation ChatMessageRemoveMutation(
    $input: RemovePostInput!
    $connections: [ID!]!
  ) {
    removePost(input: $input) {
      __typename
      ... on RemovePostId {
        removePostId @deleteEdge(connections: $connections)
      }
      ... on PostRemovedError {
        message
      }
    }
  }
`;

export default function ChatMessage({
  postFragment,
  chatFragment,
  viewerFragment,
}: {
  postFragment: ChatMessage_post$key;
  chatFragment: ChatMessage_chat$key;
  viewerFragment: ChatMessage_viewer$key;
}) {
  const data = useFragment<ChatMessage_post$key>(
    chatMessagePostQuery,
    postFragment
  );
  const { id: viewerId } = useFragment<ChatMessage_viewer$key>(
    chatMessageViewerQuery,
    viewerFragment
  );
  const { id: chatId } = useFragment<ChatMessage_chat$key>(
    chatMessageChatQuery,
    chatFragment
  );
  const [action, setAction] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { set: setMessage } = message();

  const [commit] = useMutation<ChatMessageRemoveMutation>(chatMessageMutation);
  async function remove(): Promise<void> {
    if (viewerId !== data.user.id) {
      return;
    }
    const connectionId = ConnectionHandler.getConnectionID(
      chatId,
      "Chat_posts"
    );

    setLoading(true);
    setAction(false);
    await new Promise<void>((resolve) => {
      commit({
        variables: {
          input: {
            id: data.id,
            user_id: data.user.id,
          },
          connections: [connectionId],
        },
        onCompleted({ removePost }) {
          if (removePost.__typename === "PostRemovedError") {
            setMessage(
              new MessageData({
                message: removePost.message,
                error: true,
              })
            );
          }
          resolve();
        },
      });
    });

    setLoading(false);
  }

  if (viewerId === data.user.id) {
    return (
      <View style={styles.container}>
        <View style={styles.right}>
          {data.deletedAt ? (
            <Text style={styles.deleted}>削除されました</Text>
          ) : (
            <TouchableWithoutFeedback onLongPress={() => setAction(true)}>
              <View style={[styles.message, styles.blue]}>
                <Text style={styles.text}>{data.content}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        {action && (
          <>
            <Spacer height={4} />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={remove}>
                <Text style={styles.buttonText}>削除する</Text>
              </TouchableOpacity>

              <Spacer width={16} />

              <TouchableOpacity
                style={styles.button}
                onPress={() => setAction(false)}
              >
                <Text style={styles.buttonText}>キャンセル</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {loading && <Loading mask />}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Avatar uri={data.user.image} size={34} />
        </View>

        <Spacer width={8} />

        {data.deletedAt ? (
          <Text style={styles.deleted}>削除されました</Text>
        ) : (
          <View style={styles.message}>
            <Text style={styles.text}>{data.content}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  left: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  message: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    borderColor: Colors.grayLight,
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  blue: {
    backgroundColor: Colors.blueLight,
  },
  avatar: {
    paddingTop: 4,
  },
  text: {
    ...Fonts.sm,
  },
  deleted: {
    ...Fonts.sm,
    color: Colors.gray,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.blue,
    ...Fonts.xs,
  },
});
