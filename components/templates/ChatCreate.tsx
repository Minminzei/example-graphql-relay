import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { View } from "@components/atoms/Themed";
import { useMutation, useFragment, graphql } from "react-relay/hooks";
import Colors from "@constants/Colors";
import KeyboardAvoidingView from "@components/atoms/KeyboardAvoidingView";
import TextInput from "@components/atoms/TextInput";
import Spacer from "@components/atoms/Spacer";
import Button from "@components/atoms/Button";
import { ChatCreateMutation } from "@generated/ChatCreateMutation.graphql";
import { ChatCreate_viewer$key } from "@generated/ChatCreate_viewer.graphql";

const viewerQuery = graphql`
  fragment ChatCreate_viewer on User {
    id
  }
`;

const chatCreateMutation = graphql`
  mutation ChatCreateMutation($input: CreateChatInput!) {
    createChat(input: $input) {
      __typename
      ... on Chat {
        id
        title
        user {
          name
          image
        }
      }
      ... on ChatCreatedError {
        message
      }
    }
  }
`;

export default function ChatCreate({
  viewerFragment,
  move,
}: {
  viewerFragment: ChatCreate_viewer$key;
  move: (chatId: string) => void;
}) {
  const [commit] = useMutation<ChatCreateMutation>(chatCreateMutation);
  const { id: viewerId } = useFragment<ChatCreate_viewer$key>(
    viewerQuery,
    viewerFragment
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  async function create(): Promise<void> {
    if (!title) {
      return;
    }
    setLoading(true);
    await new Promise<void>((resolve) => {
      commit({
        variables: {
          input: {
            user_id: viewerId,
            title,
          },
        },
        onCompleted({ createChat }) {
          if (createChat.__typename === "ChatCreatedError") {
            Alert.alert(createChat.message);
            setLoading(false);
          } else if (createChat.__typename === "Chat") {
            move(createChat.id);
          }
          resolve();
        },
      });
    });
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <TextInput
            initialValue={title}
            onChange={(value: string) => setTitle(value)}
            placeholder="タイトルを入力"
            label="チャットタイトル"
          />
          <Spacer height={24} />
          <View style={styles.button}>
            <Button
              title="チャットを作成する"
              onPress={create}
              backgroundColor={Colors.primary}
              textStyle={styles.buttonText}
              disabled={!title}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
  },
});
