import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, useMutation, graphql } from "react-relay/hooks";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import { ChatMessage_post$key } from "@generated/ChatMessage_post.graphql";
import { ChatMessage_viewer$key } from "@generated/ChatMessage_viewer.graphql";
import { ChatMessageRemoveMutation } from "@generated/ChatMessageRemoveMutation.graphql";
import Avatar from "@components/atoms/Avatar";
import Spacer from "@components/atoms/Spacer";
import Loading from "@components/atoms/Loading";

const chatMessageViewerQuery = graphql`
  fragment ChatMessage_viewer on User {
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
  mutation ChatMessageRemoveMutation($input: RemovePostInput!) {
    removePost(input: $input) {
      __typename
      ... on Post {
        id
        deletedAt
      }
      ... on PostRemovedError {
        message
      }
    }
  }
`;

export default function ChatMessage({
  postFragment,
  viewerFragment,
}: {
  postFragment: ChatMessage_post$key;
  viewerFragment: ChatMessage_viewer$key;
}) {
  const [action, setAction] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const data = useFragment<ChatMessage_post$key>(
    chatMessagePostQuery,
    postFragment
  );
  const { id: viewerId } = useFragment<ChatMessage_viewer$key>(
    chatMessageViewerQuery,
    viewerFragment
  );
  const [commit] = useMutation<ChatMessageRemoveMutation>(chatMessageMutation);
  async function remove(): Promise<void> {
    setAction(false);
    if (viewerId === data.user.id) {
      return;
    }
    setLoading(true);
    await new Promise<void>((resolve) => {
      commit({
        variables: {
          input: {
            id: data.id,
            user_id: data.user.id,
          },
        },
        onCompleted({ removePost }) {
          if (removePost.__typename === "PostRemovedError") {
            Alert.alert(removePost.message);
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
            <TouchableWithoutFeedback onLongPress={() => setAction(false)}>
              <View style={[styles.message, styles.blue]}>
                <Text style={styles.text}>{data.content}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        {action && (
          <View style={styles.actions}>
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
          </View>
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
    backgroundColor: Colors.blue,
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
  actions: {
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: Colors.primary,
  },
  button: {
    height: 26,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.gray,
    ...Fonts.xs,
    lineHeight: 26,
  },
});
