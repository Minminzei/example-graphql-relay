import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { View } from "@components/atoms/Themed";
import { useFragment, useMutation, graphql } from "react-relay/hooks";
import Colors from "@constants/Colors";
import Spacer from "@components/atoms/Spacer";
import TextInput from "@components/atoms/TextInput";
import Button from "@components/atoms/Button";
import { ChatPostMutation } from "@generated/ChatPostMutation.graphql";
import { ChatPost_chat$key } from "@generated/ChatPost_chat.graphql";
import { ChatPost_viewer$key } from "@generated/ChatPost_viewer.graphql";

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
  mutation ChatPostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      __typename
      ... on Post {
        id
        content
        deletedAt
        user {
          name
          image
        }
      }
      ... on PostCreatedError {
        message
      }
    }
  }
`;

export default function ChatPost({
  viewerFragmen,
  chatFragment,
}: {
  viewerFragmen: ChatPost_viewer$key;
  chatFragment: ChatPost_chat$key;
}) {
  const { id: viewerId } = useFragment(chatPostViewerQuery, viewerFragmen);
  const { id: chatId } = useFragment(chatPostChatQuery, chatFragment);

  const [commit] = useMutation<ChatPostMutation>(chatPostMutation);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  async function save(): Promise<void> {
    if (!message) {
      return;
    }
    setLoading(true);
    await new Promise<void>((resolve) => {
      commit({
        variables: {
          input: {
            chat_id: chatId,
            user_id: viewerId,
            title: message,
          },
        },
        onCompleted({ createPost }) {
          if (createPost.__typename === "PostCreatedError") {
            Alert.alert(createPost.message);
          }
          resolve();
        },
      });
    });
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <TextInput
          initialValue={message}
          onChange={(value: string) => setMessage(value)}
          placeholder="メッセージを書く"
          multiline
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
