import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { View } from "@components/atoms/Themed";
import {
  useFragment,
  useMutation,
  graphql,
  ConnectionHandler,
} from "react-relay/hooks";
import Colors from "@constants/Colors";
import Spacer from "@components/atoms/Spacer";
import TextInput, { TextInputRef } from "@components/atoms/TextInput";
import Button from "@components/atoms/Button";
import { ChatPostMutation } from "@generated/ChatPostMutation.graphql";
import { ChatPost_chat$key } from "@generated/ChatPost_chat.graphql";
import { ChatPost_viewer$key } from "@generated/ChatPost_viewer.graphql";
import message, { MessageData } from "@recoil/message";

const chatPostViewerQuery = graphql`
  fragment ChatPost_viewer on User {
    id
  }
`;

const chatPostChatQuery = graphql`
  fragment ChatPost_chat on Chat {
    id
  }
`;

const chatPostMutation = graphql`
  mutation ChatPostMutation($input: CreatePostInput!, $connections: [ID!]!) {
    createPost(input: $input) {
      __typename
      ... on PostEdges {
        postEdges @prependEdge(connections: $connections) {
          cursor
          node {
            id
            content
            user {
              name
              image
            }
          }
        }
      }
      ... on CreatePostError {
        message
      }
    }
  }
`;

export default function ChatPost({
  viewerFragmen,
  chatFragment,
  onPost,
}: {
  viewerFragmen: ChatPost_viewer$key;
  chatFragment: ChatPost_chat$key;
  onPost: () => void;
}) {
  const textRef = useRef<TextInputRef>();
  const { id: viewerId } = useFragment(chatPostViewerQuery, viewerFragmen);
  const { id: chatId } = useFragment(chatPostChatQuery, chatFragment);

  const [commit] = useMutation<ChatPostMutation>(chatPostMutation);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const { set: setMessage } = message();

  async function save(): Promise<void> {
    if (!message) {
      return;
    }
    setLoading(true);
    const connectionId = ConnectionHandler.getConnectionID(
      chatId,
      "Chat_posts"
    );

    await new Promise<void>((resolve) => {
      commit({
        variables: {
          input: {
            chat_id: chatId,
            user_id: viewerId,
            content,
          },
          connections: [connectionId],
        },
        onCompleted({ createPost }) {
          if (createPost.__typename === "CreatePostError") {
            setMessage(
              new MessageData({
                message: createPost.message,
                error: true,
              })
            );
          }
          resolve();
        },
      });
    });
    textRef.current?.clear();
    setContent("");
    setLoading(false);
    onPost();
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <TextInput
          initialValue={content}
          onChange={(value: string) => setContent(value)}
          placeholder="メッセージを書く"
          multiline
          innerRef={textRef}
        />
      </View>

      <Spacer width={8} />

      <Button
        onPress={save}
        title="送信"
        width={80}
        height={48}
        backgroundColor={Colors.primary}
        textStyle={{
          color: Colors.white,
        }}
        disabled={!message}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    borderTopWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grayLight,
  },
  field: {
    flex: 1,
  },
});
